import type { Meta, StoryObj } from "@storybook/react"
import { Pagination } from "../../components/molecules"

const meta: Meta<typeof Pagination> = {
  title: "Components/Atoms/Pagination",
  component: Pagination,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof Pagination>

export const Default: Story = {
  args: {
    limit: 1,
    firstIndex: 0,
    totalData: 1,
    currentPage: 1,
    totalPages: 1,
  },
}

export const FivePages: Story = {
  args: {
    limit: 1,
    firstIndex: 0,
    totalData: 1,
    currentPage: 1,
    totalPages: 5,
  },
}

export const TenPages: Story = {
  args: {
    limit: 1,
    firstIndex: 0,
    totalData: 1,
    currentPage: 1,
    totalPages: 10,
  },
}
