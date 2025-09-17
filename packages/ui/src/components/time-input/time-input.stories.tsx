import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { TimeInput } from "."
import { parseTime } from "@internationalized/date"

const meta: Meta<typeof TimeInput> = {
  title: "Components/TimeInput",
  component: TimeInput,
  parameters: { layout: "centered" },
}

export default meta
type Story = StoryObj<typeof TimeInput>

export const Basic: Story = {
  args: {
    label: "Time",
    defaultValue: parseTime("13:45"),
  },
}

export const Disabled: Story = {
  args: {
    label: "Time",
    defaultValue: parseTime("08:30"),
    isDisabled: true,
  },
}

