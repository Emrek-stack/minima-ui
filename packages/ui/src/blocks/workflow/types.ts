export type Point = { x: number; y: number }

import type { ReactNode } from "react"

export type WorkflowNodeData = {
  label: string
  icon?: ReactNode
  inputType?: string
  outputType?: string
}

export type WorkflowNode = {
  id: string
  position: Point
  width?: number
  height?: number
  data: WorkflowNodeData
  selected?: boolean
  type?: "default" | "group"
  groupId?: string
}

export type WorkflowEdge = {
  id: string
  source: string
  target: string
  selected?: boolean
  label?: string
  type?: "bezier" | "orthogonal" | "step"
}

export type Viewport = {
  x: number
  y: number
  zoom: number
}

export type WorkflowProps = {
  nodes: WorkflowNode[]
  edges: WorkflowEdge[]
  className?: string
  readOnly?: boolean
  onNodesChange?: (nodes: WorkflowNode[]) => void
  onEdgesChange?: (edges: WorkflowEdge[]) => void
  onConnect?: (sourceId: string, targetId: string) => void
}
