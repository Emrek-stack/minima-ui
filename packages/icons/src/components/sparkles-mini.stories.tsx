import type { Meta, StoryObj } from "@storybook/react"
import Icon from "./sparkles-mini"

const meta: Meta<typeof Icon> = {
  title: "Icons/SparklesMini",
  component: Icon,
  args: { width: 24, height: 24, color: "currentColor" },
}

export default meta
type Story = StoryObj<typeof Icon>

export const Default: Story = {}
