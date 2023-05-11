import type { Meta, StoryObj } from "@storybook/react"
import { Breadcrumbs } from "../../components/molecules"

const meta: Meta<typeof Breadcrumbs> = {
  title: "Components/Breadcrumbs ",
  component: Breadcrumbs,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof Breadcrumbs>

export const Default: Story = {
  args: {
    links: ["Data", "Create"],
  },
}