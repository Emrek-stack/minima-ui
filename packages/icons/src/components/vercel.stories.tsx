import type { Meta, StoryObj } from "@storybook/react"
import Icon from "./vercel"

const meta: Meta<typeof Icon> = {
  title: "Icons/Vercel",
  component: Icon,
  args: { width: 24, height: 24 },
}

export default meta
type Story = StoryObj<typeof Icon>

export const Default: Story = {}
