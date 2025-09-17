import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { Workflow } from "."
import { Beaker, Bolt, CheckCircle } from "@minimaui/icons"

const meta: Meta<typeof Workflow> = {
  title: "Blocks/Workflow/Basic",
  component: Workflow,
}

export default meta
type Story = StoryObj<typeof Workflow>

export const Basic: Story = {
  render: () => {
    const [nodes, setNodes] = React.useState([
      {
        id: "n0",
        type: "group",
        position: { x: 40, y: 80 },
        width: 360,
        height: 160,
        data: { label: "Group A" },
      },
      {
        id: "n1",
        position: { x: 80, y: 120 },
        data: { label: "Start", icon: <CheckCircle className="text-ui-fg-interactive" />, outputType: "flow" },
        groupId: "n0",
      },
      {
        id: "n2",
        position: { x: 360, y: 120 },
        data: { label: "Process", icon: <Beaker className="text-ui-fg-subtle" />, inputType: "flow", outputType: "flow" },
      },
      {
        id: "n3",
        position: { x: 640, y: 120 },
        data: { label: "Finish", icon: <Bolt className="text-ui-fg-error" />, inputType: "flow" },
      },
    ])

    const [edges, setEdges] = React.useState([
      { id: "e1-2", source: "n1", target: "n2", label: "ok", type: "orthogonal" },
      { id: "e2-3", source: "n2", target: "n3", type: "step" },
    ])

    return (
      <div className="p-4">
        <Workflow
          nodes={nodes as any}
          edges={edges as any}
          onNodesChange={setNodes as any}
          onEdgesChange={setEdges as any}
        />
      </div>
    )
  },
}
