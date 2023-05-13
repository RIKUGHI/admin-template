import type { Meta, StoryObj } from "@storybook/react"
import { FormSearch } from "../../components/molecules"

const meta: Meta<typeof FormSearch> = {
  title: "Components/FormSearch",
  component: FormSearch,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof FormSearch>

export const Default: Story = {
  args: {},
}
