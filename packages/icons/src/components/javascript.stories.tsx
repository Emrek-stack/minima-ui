import type { Meta, StoryObj } from "@storybook/react"
import Icon from "./javascript"

const meta: Meta<typeof Icon> = {
  title: "Icons/Javascript",
  component: Icon,
  args: { width: 24, height: 24 },
}

export default meta
type Story = StoryObj<typeof Icon>

export const Default: Story = {}
