import type { Meta, StoryObj } from "@storybook/react"
import Icon from "./figma"

const meta: Meta<typeof Icon> = {
  title: "Icons/Figma",
  component: Icon,
  args: { width: 24, height: 24 },
}

export default meta
type Story = StoryObj<typeof Icon>

export const Default: Story = {}
