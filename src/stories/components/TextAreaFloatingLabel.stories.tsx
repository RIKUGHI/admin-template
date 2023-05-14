import type { Meta, StoryObj } from "@storybook/react"
import { TextAreaFloatingLabel } from "../../components/atoms"

const meta: Meta<typeof TextAreaFloatingLabel> = {
  title: "Components/TextAreaFloatingLabel",
  component: TextAreaFloatingLabel,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof TextAreaFloatingLabel>

export const Default: Story = {
  args: {},
}
