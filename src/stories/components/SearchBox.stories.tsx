import type { Meta, StoryObj } from "@storybook/react"
import { SearchBox } from "../../components/molecules"

const meta: Meta<typeof SearchBox> = {
  title: "Components/SearchBox",
  component: SearchBox,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof SearchBox>

export const Default: Story = {
  args: {},
}
