import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { Popover } from "."
import { Button } from "../button"
import { IconButton } from "../icon-button"
import { EllipsisVertical } from "@minimaui/icons"

const meta: Meta<typeof Popover> = {
  title: "Components/Popover",
  component: Popover,
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof Popover>

export const Basic: Story = {
  render: () => (
    <Popover>
      <Popover.Trigger asChild>
        <Button>Open Popover</Button>
      </Popover.Trigger>
      <Popover.Content className="min-w-[240px]">
        <div className="p-2">
          <div className="txt-compact-small-plus text-ui-fg-base">Popover title</div>
          <div className="txt-small text-ui-fg-subtle">Some helpful description goes here.</div>
        </div>
        <Popover.Seperator />
        <div className="p-1 space-y-1">
          <Button variant="transparent" className="w-full justify-start">Action one</Button>
          <Button variant="transparent" className="w-full justify-start">Action two</Button>
          <Button variant="transparent" className="w-full justify-start">Action three</Button>
        </div>
      </Popover.Content>
    </Popover>
  ),
}

export const WithIconTrigger: Story = {
  render: () => (
    <Popover>
      <Popover.Trigger asChild>
        <IconButton variant="transparent">
          <EllipsisVertical />
        </IconButton>
      </Popover.Trigger>
      <Popover.Content align="start">
        <div className="p-1 space-y-1">
          <Button variant="transparent" className="w-full justify-start">Edit</Button>
          <Button variant="transparent" className="w-full justify-start">Duplicate</Button>
          <Popover.Seperator />
          <Button variant="transparent" className="w-full justify-start">Delete</Button>
        </div>
      </Popover.Content>
    </Popover>
  ),
}

export const Sides: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6">
      {(["top","right","bottom","left"] as const).map((side) => (
        <Popover key={side}>
          <Popover.Trigger asChild>
            <Button>{side}</Button>
          </Popover.Trigger>
          <Popover.Content side={side}>
            <div className="p-2">Side: {side}</div>
          </Popover.Content>
        </Popover>
      ))}
    </div>
  ),
}

