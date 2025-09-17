import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import * as Icons from "."

const meta: Meta = {
  title: "Icons/All",
  parameters: {
    layout: "fullscreen",
  },
  args: {
    width: 24,
    height: 24,
    color: "currentColor",
  },
  argTypes: {
    width: { control: { type: "number", min: 8, max: 128, step: 1 } },
    height: { control: { type: "number", min: 8, max: 128, step: 1 } },
    color: { control: "color" },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Gallery: Story = {
  render: (args) => {
    const entries = Object.entries(Icons).filter(([name, Comp]) => {
      return typeof Comp === "function" || (Comp && typeof (Comp as any) === "object")
    }) as Array<[string, React.ComponentType<any>]> 

    return (
      <div style={{ padding: 16 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
            gap: 16,
          }}
        >
          {entries.map(([name, Icon]) => (
            <div key={name} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Icon {...args} />
              <div style={{ fontSize: 12 }}>{name}</div>
            </div>
          ))}
        </div>
      </div>
    )
  },
}

