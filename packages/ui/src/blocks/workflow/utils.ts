import type { Point } from "./types"

export const distance = (a: Point, b: Point) =>
  Math.hypot(a.x - b.x, a.y - b.y)

export const midPoint = (a: Point, b: Point): Point => ({
  x: (a.x + b.x) / 2,
  y: (a.y + b.y) / 2,
})

export const cubicPath = (a: Point, b: Point) => {
  const dx = Math.abs(b.x - a.x)
  const c1: Point = { x: a.x + dx * 0.5, y: a.y }
  const c2: Point = { x: b.x - dx * 0.5, y: b.y }
  return `M ${a.x},${a.y} C ${c1.x},${c1.y} ${c2.x},${c2.y} ${b.x},${b.y}`
}

export const orthogonalPath = (a: Point, b: Point) => {
  const midX = (a.x + b.x) / 2
  return `M ${a.x},${a.y} L ${midX},${a.y} L ${midX},${b.y} L ${b.x},${b.y}`
}

export const stepPath = (a: Point, b: Point) => {
  const offset = Math.max(20, Math.abs(b.x - a.x) * 0.25)
  const midX = a.x < b.x ? a.x + offset : a.x - offset
  return `M ${a.x},${a.y} L ${midX},${a.y} L ${midX},${b.y} L ${b.x},${b.y}`
}
