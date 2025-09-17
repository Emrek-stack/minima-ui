import type { Meta, StoryObj } from "@storybook/react"
import Icon from "./x-mark-mini"

const meta: Meta<typeof Icon> = {
  title: "Icons/XMarkMini",
  component: Icon,
  args: { width: 24, height: 24, color: "currentColor" },
}

export default meta
type Story = StoryObj<typeof Icon>

export const Default: Story = {}
