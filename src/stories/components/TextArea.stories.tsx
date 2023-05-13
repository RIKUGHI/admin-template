import type { Meta, StoryObj } from "@storybook/react"
import { TextArea } from "../../components/atoms"

const meta: Meta<typeof TextArea> = {
  title: "Components/TextArea",
  component: TextArea,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof TextArea>

export const Default: Story = {
  args: {},
}

export const Error: Story = {
  args: {
    error: true,
  },
}
