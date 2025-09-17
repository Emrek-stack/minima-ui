"use client"
import * as React from "react"
import { clx } from "@/utils/clx"
import { isInputElement } from "@/utils/is-input-element"
import { FlowNode } from "./components/node"
import { FlowEdge } from "./components/edge"
import type { WorkflowProps, WorkflowNode, Viewport } from "./types"

export const Workflow = ({
  nodes,
  edges,
  className,
  readOnly,
  onNodesChange,
  onEdgesChange,
  onConnect,
}: WorkflowProps) => {
  const [viewport, setViewport] = React.useState<Viewport>({ x: 0, y: 0, zoom: 1 })
  const [selected, setSelected] = React.useState<Set<string>>(new Set())
  const [selectedEdges, setSelectedEdges] = React.useState<Set<string>>(new Set())
  const [ctxMenu, setCtxMenu] = React.useState<null | { x: number; y: number }>(null)
  const [connecting, setConnecting] = React.useState<null | { fromId: string; fromSide: "left" | "right" }>(null)
  const [mouseWorld, setMouseWorld] = React.useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const [marquee, setMarquee] = React.useState<null | { x: number; y: number; w: number; h: number }>(null)

  const onWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault()
      const delta = -e.deltaY * 0.001
      setViewport((v) => ({ ...v, zoom: Math.min(2, Math.max(0.25, v.zoom + delta)) }))
    }
  }

  const panning = React.useRef<{ x: number; y: number } | null>(null)
  const toWorld = (e: React.PointerEvent) => {
    const el = containerRef.current
    if (!el) return { x: 0, y: 0 }
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left - viewport.x) / viewport.zoom
    const y = (e.clientY - rect.top - viewport.y) / viewport.zoom
    return { x, y }
  }

  const onPointerDown = (e: React.PointerEvent) => {
    if ((e.target as Element).closest("[data-node]") || readOnly) return
    ;(e.target as Element).setPointerCapture?.(e.pointerId)
    if (e.shiftKey) {
      const start = toWorld(e)
      setMarquee({ x: start.x, y: start.y, w: 0, h: 0 })
      return
    }
    panning.current = { x: e.clientX, y: e.clientY }
  }
  const onPointerMove = (e: React.PointerEvent) => {
    setMouseWorld(toWorld(e))
    if (connecting) return
    if (marquee) {
      const cur = toWorld(e)
      setMarquee((m) => (m ? { x: Math.min(m.x, cur.x), y: Math.min(m.y, cur.y), w: Math.abs(cur.x - m.x), h: Math.abs(cur.y - m.y) } : null))
      return
    }
    if (!panning.current) return
    const dx = e.clientX - panning.current.x
    const dy = e.clientY - panning.current.y
    panning.current = { x: e.clientX, y: e.clientY }
    setViewport((v) => ({ ...v, x: v.x + dx, y: v.y + dy }))
  }
  const onPointerUp = () => {
    panning.current = null
    if (marquee) {
      const rect = marquee
      setMarquee(null)
      const next = new Set<string>()
      for (const n of nodes) {
        const w = n.width ?? 200
        const h = n.height ?? 40
        if (n.position.x + w >= rect.x && n.position.x <= rect.x + rect.w && n.position.y + h >= rect.y && n.position.y <= rect.y + rect.h) {
          next.add(n.id)
        }
      }
      setSelected(next)
    }
  }

  const handleDrag = (id: string, dx: number, dy: number) => {
    const inv = 1 / viewport.zoom
    const moveIds = selected.has(id) ? new Set(selected) : new Set([id])
    const moved = nodes.map((n) =>
      moveIds.has(n.id)
        ? { ...n, position: { x: n.position.x + dx * inv, y: n.position.y + dy * inv } }
        : n
    )
    onNodesChange?.(moved as WorkflowNode[])
  }

  const handleDragEnd = () => {
    const snapped = nodes.map((n) => ({
      ...n,
      position: {
        x: Math.round(n.position.x / 10) * 10,
        y: Math.round(n.position.y / 10) * 10,
      },
    }))
    onNodesChange?.(snapped as WorkflowNode[])
  }

  const startConnect = (id: string, side: "left" | "right") => {
    if (readOnly) return
    setConnecting({ fromId: id, fromSide: side })
  }
  const completeConnect = (id: string, _side: "left" | "right") => {
    if (!connecting) return
    if (id === connecting.fromId) return setConnecting(null)
    // Enforce port type compatibility and single-input per target
    const src = nodes.find((n) => n.id === connecting.fromId)
    const dst = nodes.find((n) => n.id === id)
    const srcType = src?.data.outputType
    const dstType = dst?.data.inputType
    if (srcType && dstType && srcType !== dstType) {
      // reject incompatible
      setConnecting(null)
      return
    }
    // Single-input per target: drop existing edges to target, add new one
    if (onEdgesChange) {
      const filtered = edges.filter((e) => e.target !== id)
      const newEdge = { id: `${connecting.fromId}-${id}-${Date.now()}`, source: connecting.fromId, target: id }
      onEdgesChange(filtered.concat(newEdge))
    }
    onConnect?.(connecting.fromId, id)
    setConnecting(null)
  }

  const displayNodes = nodes.map((n) => ({ ...n, selected: selected.has(n.id) || n.selected }))

  // enable delete key handling
  useDeleteSelection(
    containerRef as any,
    selected,
    setSelected,
    selectedEdges,
    setSelectedEdges,
    nodes as any,
    edges as any,
    onNodesChange as any,
    onEdgesChange as any,
  )

  return (
    <div
      ref={containerRef}
      className={clx(
        "bg-ui-bg-subtle border border-ui-border-base rounded-md overflow-hidden",
        "relative w-full h-[540px]", // default size
        className,
      )}
      onWheel={onWheel}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onContextMenu={(e) => {
        e.preventDefault()
        setCtxMenu({ x: e.clientX, y: e.clientY })
      }}
    >
      {marquee && (
        <div
          className="absolute border-2 border-ui-border-interactive/60 bg-ui-bg-component/20"
          style={{
            left: viewport.x + marquee.x * viewport.zoom,
            top: viewport.y + marquee.y * viewport.zoom,
            width: marquee.w * viewport.zoom,
            height: marquee.h * viewport.zoom,
          }}
        />
      )}
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.08) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      />
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" className="fill-ui-border-base" />
          </marker>
        </defs>
      </svg>
      <div
        className="absolute inset-0"
        style={{ transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`, transformOrigin: "0 0" }}
      >
        {/* Groups behind */}
        {displayNodes.filter((n:any)=>n.type==='group').map((n) => (
          <div key={n.id} data-node>
            <FlowNode
              node={n}
              readOnly
            />
          </div>
        ))}
        <svg className="absolute top-0 left-0 w-full h-full">
          {edges.map((e) => (
            <FlowEdge
              key={e.id}
              edge={e}
              nodes={nodes as WorkflowNode[]}
              selected={selectedEdges.has(e.id)}
              onSelect={(id) => {
                setSelected(new Set())
                setSelectedEdges((prev) => {
                  const next = new Set(prev)
                  if (next.has(id)) next.delete(id)
                  else { next.clear(); next.add(id) }
                  return next
                })
              }}
            />
          ))}
          {connecting && (() => {
            const src = nodes.find((n) => n.id === connecting.fromId)
            if (!src) return null
            const a = {
              x: connecting.fromSide === "right" ? (src.position.x + (src.width ?? 200)) : src.position.x,
              y: src.position.y + 20,
            }
            const b = mouseWorld
            const dx = Math.abs(b.x - a.x)
            const c1 = { x: a.x + (connecting.fromSide === "right" ? dx * 0.5 : -dx * 0.5), y: a.y }
            const c2 = { x: b.x + (connecting.fromSide === "right" ? -dx * 0.5 : dx * 0.5), y: b.y }
            const d = `M ${a.x},${a.y} C ${c1.x},${c1.y} ${c2.x},${c2.y} ${b.x},${b.y}`
            return <path d={d} fill="none" className="stroke-ui-border-interactive" strokeWidth={2} markerEnd="url(#arrow)" />
          })()}
        </svg>
        {displayNodes.filter((n:any)=>n.type!=='group').map((n) => (
          <div key={n.id} data-node onClick={(e) => {
            e.stopPropagation()
            setSelected((prev) => {
              const next = new Set(prev)
              if (e.shiftKey) {
                if (next.has(n.id)) next.delete(n.id); else next.add(n.id)
              } else {
                next.clear(); next.add(n.id)
              }
              return next
            })
            setSelectedEdges(new Set())
          }}>
            <FlowNode
              node={n}
              onDrag={handleDrag}
              onDragEnd={handleDragEnd}
              readOnly={readOnly}
              onConnectStart={startConnect}
              onConnectComplete={completeConnect}
            />
          </div>
        ))}
      </div>
      <div className="absolute bottom-2 right-2 bg-ui-bg-component/80 backdrop-blur-sm border border-ui-border-base rounded-md shadow-elevation-card-rest p-1 flex items-center gap-1">
        <button
          className="px-2 py-1 rounded text-ui-fg-base bg-button-neutral hover:bg-button-neutral-hover active:bg-button-neutral-pressed"
          onClick={() => setViewport((v) => ({ ...v, zoom: Math.min(2, v.zoom + 0.1) }))}
        >
          +
        </button>
        <button
          className="px-2 py-1 rounded text-ui-fg-base bg-button-neutral hover:bg-button-neutral-hover active:bg-button-neutral-pressed"
          onClick={() => setViewport((v) => ({ ...v, zoom: Math.max(0.25, v.zoom - 0.1) }))}
        >
          −
        </button>
        <button
          className="px-2 py-1 rounded text-ui-fg-base bg-button-neutral hover:bg-button-neutral-hover active:bg-button-neutral-pressed"
          onClick={() => setViewport({ x: 0, y: 0, zoom: 1 })}
        >
          100%
        </button>
        <button
          className="px-2 py-1 rounded text-ui-fg-base bg-button-neutral hover:bg-button-neutral-hover active:bg-button-neutral-pressed"
          onClick={() => fitToView(containerRef, nodes as WorkflowNode[], setViewport)}
        >
          Fit
        </button>
        <button
          className="px-2 py-1 rounded text-ui-fg-base bg-button-neutral hover:bg-button-neutral-hover active:bg-button-neutral-pressed"
          onClick={() => {
            if (!onNodesChange) return
            const el = containerRef.current
            if (!el) return
            const rect = el.getBoundingClientRect()
            const worldX = (rect.width / 2 - viewport.x) / viewport.zoom
            const worldY = (rect.height / 2 - viewport.y) / viewport.zoom
            const id = `n${Date.now()}`
            onNodesChange((nodes as WorkflowNode[]).concat({ id, position: { x: worldX, y: worldY }, data: { label: "Node" } }))
          }}
        >
          + Node
        </button>
      </div>
      {renderMiniMap(nodes as WorkflowNode[], viewport, containerRef, setViewport)}
      {ctxMenu && (
        <div
          className="absolute z-50 bg-ui-bg-component border border-ui-border-base rounded-md shadow-elevation-flyout p-1"
          style={{ left: ctxMenu.x, top: ctxMenu.y }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="block w-full text-left px-3 py-1 hover:bg-ui-bg-component-hover txt-compact-small-plus"
            onClick={() => {
              const first = nodes.find((n) => selected.has(n.id))
              if (!first || !onNodesChange) return
              const id = `n${Date.now()}`
              onNodesChange(nodes.concat({
                ...first,
                id,
                position: { x: first.position.x + 40, y: first.position.y + 40 },
                selected: false,
              }) as any)
              setCtxMenu(null)
            }}
            disabled={selected.size === 0}
          >
            Duplicate
          </button>
          <button
            className="block w-full text-left px-3 py-1 hover:bg-ui-bg-component-hover txt-compact-small-plus"
            onClick={() => {
              if (!onNodesChange || !onEdgesChange) return
              const remainingNodes = nodes.filter((n) => !selected.has(n.id))
              const remainingEdges = edges.filter((e) => !selected.has(e.source) && !selected.has(e.target))
              onNodesChange(remainingNodes as any)
              onEdgesChange(remainingEdges as any)
              setSelected(new Set())
              setCtxMenu(null)
            }}
            disabled={selected.size === 0}
          >
            Delete
          </button>
          <button
            className="block w-full text-left px-3 py-1 hover:bg-ui-bg-component-hover txt-compact-small-plus"
            onClick={() => {
              setSelected(new Set())
              setSelectedEdges(new Set())
              setCtxMenu(null)
            }}
          >
            Clear selection
          </button>
          <button
            className="block w-full text-left px-3 py-1 hover:bg-ui-bg-component-hover txt-compact-small-plus"
            onClick={() => {
              const el = containerRef.current
              if (!onNodesChange || !el) return
              const rect = el.getBoundingClientRect()
              const worldX = (rect.width / 2 - viewport.x) / viewport.zoom
              const worldY = (rect.height / 2 - viewport.y) / viewport.zoom
              const id = `n${Date.now()}`
              onNodesChange((nodes as WorkflowNode[]).concat({ id, position: { x: worldX, y: worldY }, data: { label: "Node" } }))
              setCtxMenu(null)
            }}
          >
            + Node
          </button>
        </div>
      )}
    </div>
  )
}

// Keyboard: delete selected
export function useDeleteSelection(
  ref: React.RefObject<HTMLElement>,
  selected: Set<string>,
  setSelected: React.Dispatch<React.SetStateAction<Set<string>>>,
  selectedEdges: Set<string>,
  setSelectedEdges: React.Dispatch<React.SetStateAction<Set<string>>>,
  nodes: WorkflowNode[],
  edges: { id: string; source: string; target: string }[],
  onNodesChange?: (n: WorkflowNode[]) => void,
  onEdgesChange?: (e: { id: string; source: string; target: string }[]) => void
) {
  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const onKey = (e: KeyboardEvent) => {
      if (isInputElement(e.target as Element)) return
      if (e.key === "Delete" || e.key === "Backspace") {
        if (!selected.size && !selectedEdges.size) return
        const remainingNodes = nodes.filter((n) => !selected.has(n.id))
        const remainingEdges = edges
          .filter((e2) => !selected.has(e2.source) && !selected.has(e2.target))
          .filter((e2) => !selectedEdges.has(e2.id))
        onNodesChange?.(remainingNodes)
        onEdgesChange?.(remainingEdges)
        setSelected(new Set())
        setSelectedEdges(new Set())
      }
      if ((e.key === "a" || e.key === "A") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setSelected(new Set(nodes.map((n) => n.id)))
        setSelectedEdges(new Set())
      }
      if (e.key === "Escape") {
        setSelected(new Set())
        setSelectedEdges(new Set())
      }
    }
    el.addEventListener("keydown", onKey)
    return () => el.removeEventListener("keydown", onKey)
  }, [ref, selected, selectedEdges, nodes, edges, onNodesChange, onEdgesChange, setSelected, setSelectedEdges])
}

function fitToView(
  ref: React.RefObject<HTMLElement>,
  nodes: WorkflowNode[],
  setViewport: React.Dispatch<React.SetStateAction<Viewport>>
) {
  const el = ref.current
  if (!el || nodes.length === 0) return
  const rect = el.getBoundingClientRect()
  const margin = 40
  const xs = nodes.map((n) => n.position.x)
  const ys = nodes.map((n) => n.position.y)
  const ws = nodes.map((n) => (n.width ?? 200))
  const hs = nodes.map((n) => (n.height ?? 40))
  const minX = Math.min(...xs)
  const minY = Math.min(...ys)
  const maxX = Math.max(...nodes.map((n, i) => n.position.x + ws[i]))
  const maxY = Math.max(...nodes.map((n, i) => n.position.y + hs[i]))
  const bbW = Math.max(1, maxX - minX)
  const bbH = Math.max(1, maxY - minY)
  const zoom = Math.min((rect.width - margin * 2) / bbW, (rect.height - margin * 2) / bbH)
  setViewport({
    x: margin - minX * zoom,
    y: margin - minY * zoom,
    zoom: Math.max(0.1, Math.min(2, zoom)),
  })
}

function renderMiniMap(
  nodes: WorkflowNode[],
  viewport: Viewport,
  ref: React.RefObject<HTMLElement>,
  setViewport: React.Dispatch<React.SetStateAction<Viewport>>
) {
  const el = ref.current
  if (!el || nodes.length === 0) return null
  const rect = el.getBoundingClientRect()
  const mmW = 160
  const mmH = 120
  const xs = nodes.map((n) => n.position.x)
  const ys = nodes.map((n) => n.position.y)
  const ws = nodes.map((n) => (n.width ?? 200))
  const hs = nodes.map((n) => (n.height ?? 40))
  const minX = Math.min(...xs)
  const minY = Math.min(...ys)
  const maxX = Math.max(...nodes.map((n, i) => n.position.x + ws[i]))
  const maxY = Math.max(...nodes.map((n, i) => n.position.y + hs[i]))
  const bbW = Math.max(1, maxX - minX)
  const bbH = Math.max(1, maxY - minY)
  const scale = Math.min(mmW / bbW, mmH / bbH)
  const viewWorldX = (-viewport.x) / viewport.zoom
  const viewWorldY = (-viewport.y) / viewport.zoom
  const viewWorldW = rect.width / viewport.zoom
  const viewWorldH = rect.height / viewport.zoom
  const viewX = (viewWorldX - minX) * scale
  const viewY = (viewWorldY - minY) * scale
  const viewW = viewWorldW * scale
  const viewH = viewWorldH * scale

  const onMiniClick = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    const bounds = (e.currentTarget as SVGSVGElement).getBoundingClientRect()
    const mx = e.clientX - bounds.left
    const my = e.clientY - bounds.top
    const worldX = mx / scale + minX
    const worldY = my / scale + minY
    const centerX = worldX - (rect.width / viewport.zoom) / 2
    const centerY = worldY - (rect.height / viewport.zoom) / 2
    setViewport((v) => ({ ...v, x: -centerX * v.zoom, y: -centerY * v.zoom }))
  }

  return (
    <div className="absolute bottom-2 left-2 bg-ui-bg-component/70 backdrop-blur-sm border border-ui-border-base rounded-md shadow-elevation-card-rest p-1">
      <svg width={mmW} height={mmH} onMouseDown={onMiniClick} style={{ cursor: "pointer" }}>
        <rect x={0} y={0} width={mmW} height={mmH} fill="transparent" />
        {nodes.map((n, i) => (
          <rect
            key={n.id}
            x={(n.position.x - minX) * scale}
            y={(n.position.y - minY) * scale}
            width={(n.width ?? 200) * scale}
            height={(n.height ?? 40) * scale}
            className="fill-ui-bg-component stroke-ui-border-base"
          />
        ))}
        <rect x={viewX} y={viewY} width={viewW} height={viewH} className="fill-transparent stroke-ui-border-interactive" />
      </svg>
    </div>
  )
}

// context menu handled inline above
