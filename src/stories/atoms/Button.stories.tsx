import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "../../components/atoms"
import { FaPlus } from "react-icons/fa"

const meta: Meta<typeof Button> = {
  title: "Components/Atoms/Button",
  component: Button,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: {
    style: "solid",
    color: "primary",
    name: "Hello world",
  },
}

export const WithIcon: Story = {
  args: {
    icon: FaPlus,
    style: "solid",
    color: "primary",
    name: "Hello world",
  },
}

export const IconOnly: Story = {
  args: {
    icon: FaPlus,
    style: "solid",
    color: "primary",
  },
}
