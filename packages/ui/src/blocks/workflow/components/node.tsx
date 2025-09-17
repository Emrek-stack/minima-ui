import * as React from "react"
import { clx } from "@/utils/clx"
import type { WorkflowNode } from "../types"

type NodeProps = {
  node: WorkflowNode
  onDrag?: (id: string, dx: number, dy: number) => void
  onDragEnd?: () => void
  readOnly?: boolean
  onConnectStart?: (id: string, side: "left" | "right") => void
  onConnectComplete?: (id: string, side: "left" | "right") => void
}

export const FlowNode = ({ node, onDrag, onDragEnd, readOnly, onConnectStart, onConnectComplete }: NodeProps) => {
  const ref = React.useRef<HTMLDivElement | null>(null)
  const dragState = React.useRef<{ startX: number; startY: number } | null>(null)

  const onPointerDown = (e: React.PointerEvent) => {
    if (readOnly) return
    ;(e.target as Element).setPointerCapture?.(e.pointerId)
    dragState.current = { startX: e.clientX, startY: e.clientY }
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragState.current || !onDrag) return
    const { startX, startY } = dragState.current
    const dx = e.clientX - startX
    const dy = e.clientY - startY
    dragState.current = { startX: e.clientX, startY: e.clientY }
    onDrag(node.id, dx, dy)
  }
  const onPointerUp = () => {
    dragState.current = null
    onDragEnd?.()
  }

  if (node.type === "group") {
    return (
      <div
        className={clx(
          "bg-ui-bg-subtle border border-ui-border-base/60 shadow-elevation-card-rest",
          "rounded-md text-sm select-none",
        )}
        style={{ position: "absolute", left: node.position.x, top: node.position.y, width: node.width ?? 320, height: node.height ?? 140 }}
      >
        <div className="px-3 py-2 text-ui-fg-muted txt-compact-small-plus">{node.data.label}</div>
      </div>
    )
  }

  return (
    <div
      ref={ref}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      className={clx(
        "bg-ui-bg-component border border-ui-border-base shadow-elevation-card-rest",
        "rounded-md text-sm select-none",
        node.selected && "ring-2 ring-ui-border-interactive",
      )}
      style={{
        position: "absolute",
        left: node.position.x,
        top: node.position.y,
        width: node.width ?? 200,
      }}
    >
      <div className="flex items-center justify-between gap-2 px-3 py-2">
        {node.data.icon}
        <div className="txt-compact-small-plus text-ui-fg-base">{node.data.label}</div>
        <div className="flex-1" />
      </div>
      {/* Handles */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2">
        <button
          type="button"
          aria-label="input-handle"
          className={clx(
            "size-3 rounded-full border border-ui-border-base",
            "bg-ui-bg-component hover:bg-ui-bg-component-hover",
          )}
          onPointerDown={(e) => {
            e.stopPropagation()
            onConnectStart?.(node.id, "left")
          }}
          onPointerUp={(e) => {
            e.stopPropagation()
            onConnectComplete?.(node.id, "left")
          }}
        />
      </div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2">
        <button
          type="button"
          aria-label="output-handle"
          className={clx(
            "size-3 rounded-full border border-ui-border-base",
            "bg-ui-bg-component hover:bg-ui-bg-component-hover",
          )}
          onPointerDown={(e) => {
            e.stopPropagation()
            onConnectStart?.(node.id, "right")
          }}
          onPointerUp={(e) => {
            e.stopPropagation()
            onConnectComplete?.(node.id, "right")
          }}
        />
      </div>
    </div>
  )
}
