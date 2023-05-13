import type { Meta, StoryObj } from "@storybook/react"
import { Input } from "../../components/atoms"

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: {
    style: "base",
  },
}

export const DefaultError: Story = {
  args: {
    style: "base",
    error: true,
  },
}

export const Standart: Story = {
  args: {
    style: "standart",
  },
}

export const StandartError: Story = {
  args: {
    style: "standart",
    error: true,
  },
}
