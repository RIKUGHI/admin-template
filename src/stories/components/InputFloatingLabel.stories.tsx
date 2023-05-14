import type { Meta, StoryObj } from "@storybook/react"
import { InputFloatingLabel } from "../../components/atoms"

const meta: Meta<typeof InputFloatingLabel> = {
  title: "Components/InputFloatingLabel",
  component: InputFloatingLabel,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof InputFloatingLabel>

export const Default: Story = {
  args: {},
}
