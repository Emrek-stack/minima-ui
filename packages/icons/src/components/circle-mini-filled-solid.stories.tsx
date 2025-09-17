import type { Meta, StoryObj } from "@storybook/react"
import Icon from "./circle-mini-filled-solid"

const meta: Meta<typeof Icon> = {
  title: "Icons/CircleMiniFilledSolid",
  component: Icon,
  args: { width: 24, height: 24, color: "currentColor" },
}

export default meta
type Story = StoryObj<typeof Icon>

export const Default: Story = {}
