import type { Meta, StoryObj } from "@storybook/react"
import { Checkbox } from "../../components/atoms"
import { CheckboxWitlLabel } from "../../components/molecules"

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  args: {},
}

export const WithLabel: Story = {
  args: {},
  render: () => <CheckboxWitlLabel />,
}
