import type { Meta, StoryObj } from "@storybook/react"
import { Input } from "../../components/atoms"

const meta: Meta<typeof Input> = {
  title: "Components/Atoms/Input",
  component: Input,
  tags: ["autodocs"],
  args: {
    style: "base",
  },
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {}
