import type { Meta, StoryObj } from "@storybook/react"
import Icon from "./loader"

const meta: Meta<typeof Icon> = {
  title: "Icons/Loader",
  component: Icon,
  args: { width: 24, height: 24, color: "currentColor" },
}

export default meta
type Story = StoryObj<typeof Icon>

export const Default: Story = {}
