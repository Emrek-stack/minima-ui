import type { Meta, StoryObj } from "@storybook/react"
import Icon from "./webshipper"

const meta: Meta<typeof Icon> = {
  title: "Icons/Webshipper",
  component: Icon,
  args: { width: 24, height: 24 },
}

export default meta
type Story = StoryObj<typeof Icon>

export const Default: Story = {}
