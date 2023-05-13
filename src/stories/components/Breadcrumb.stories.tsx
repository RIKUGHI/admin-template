import type { Meta, StoryObj } from "@storybook/react"
import { Breadcrumb } from "../../components/molecules"

const meta: Meta<typeof Breadcrumb> = {
  title: "Components/Breadcrumb ",
  component: Breadcrumb,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof Breadcrumb>

export const Default: Story = {
  render: () => {
    return (
      <Breadcrumb>
        <Breadcrumb.Item href="/data">Data</Breadcrumb.Item>
        <Breadcrumb.Item active>Create</Breadcrumb.Item>
      </Breadcrumb>
    )
  },
}
