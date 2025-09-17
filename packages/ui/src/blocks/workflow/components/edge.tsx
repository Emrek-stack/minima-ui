import * as React from "react"
import type { WorkflowEdge, WorkflowNode } from "../types"
import { cubicPath, orthogonalPath, stepPath, midPoint } from "../utils"

type EdgeProps = {
  edge: WorkflowEdge
  nodes: WorkflowNode[]
  selected?: boolean
  onSelect?: (id: string) => void
}

export const FlowEdge = ({ edge, nodes, selected, onSelect }: EdgeProps) => {
  const src = nodes.find((n) => n.id === edge.source)
  const dst = nodes.find((n) => n.id === edge.target)
  if (!src || !dst) return null
  const a = { x: src.position.x + (src.width ?? 200), y: src.position.y + 20 }
  const b = { x: dst.position.x, y: dst.position.y + 20 }
  const d = edge.type === "orthogonal" ? orthogonalPath(a, b) : edge.type === "step" ? stepPath(a, b) : cubicPath(a, b)
  const labelPos = midPoint(a, b)

  return (
    <g>
      {/* wide, transparent hit area for easy selection */}
      <path
        d={d}
        fill="none"
        stroke="transparent"
        strokeWidth={12}
        onClick={(e) => {
          e.stopPropagation()
          onSelect?.(edge.id)
        }}
        style={{ cursor: "pointer" }}
      />
      <path
        d={d}
        fill="none"
        stroke="currentColor"
        className={selected ? "text-ui-border-interactive" : "text-ui-border-base"}
        strokeWidth={2}
        markerEnd="url(#arrow)"
      />
      {edge.label && (
        <g transform={`translate(${labelPos.x}, ${labelPos.y})`}>
          <rect x={-24} y={-10} width={48} height={20} rx={6} className="fill-ui-bg-component stroke-ui-border-base" />
          <text textAnchor="middle" dominantBaseline="central" className="fill-current text-ui-fg-subtle" style={{ fontSize: 10 }}>
            {edge.label}
          </text>
        </g>
      )}
    </g>
  )
}
