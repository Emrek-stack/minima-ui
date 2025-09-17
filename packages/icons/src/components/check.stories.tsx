import type { Meta, StoryObj } from "@storybook/react"
import Check from "./check"

const meta: Meta<typeof Check> = {
  title: "Icons/Check",
  component: Check,
  args: {
    width: 24,
    height: 24,
    color: "currentColor",
  },
}

export default meta
type Story = StoryObj<typeof Check>

export const Default: Story = {}

