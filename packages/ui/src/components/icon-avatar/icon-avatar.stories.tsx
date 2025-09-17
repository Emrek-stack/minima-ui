import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { IconAvatar } from "."
import { User, Beaker, CheckCircle } from "@minimaui/icons"

const meta: Meta<typeof IconAvatar> = {
  title: "Components/IconAvatar",
  component: IconAvatar,
  args: {
    size: "small",
  },
  argTypes: {
    size: {
      control: { type: "radio" },
      options: ["small", "large", "xlarge"],
    },
  },
}

export default meta
type Story = StoryObj<typeof IconAvatar>

export const Small: Story = {
  args: { size: "small" },
  render: (args) => (
    <IconAvatar {...args}>
      <User width={16} height={16} />
    </IconAvatar>
  ),
}

export const Large: Story = {
  args: { size: "large" },
  render: (args) => (
    <IconAvatar {...args}>
      <Beaker width={20} height={20} />
    </IconAvatar>
  ),
}

export const XLarge: Story = {
  args: { size: "xlarge" },
  render: (args) => (
    <IconAvatar {...args}>
      <CheckCircle width={24} height={24} />
    </IconAvatar>
  ),
}

