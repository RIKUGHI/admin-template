import type { Meta, StoryObj } from "@storybook/react"
import { IconButton } from "../../components/atoms"

const meta: Meta<typeof IconButton> = {
  title: "Components/Atoms/IconButton",
  component: IconButton,
}

export default meta
type Story = StoryObj<typeof IconButton>

export const Default: Story = {}
