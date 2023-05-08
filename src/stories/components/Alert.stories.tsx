import type { Meta, StoryObj } from "@storybook/react"
import { Alert } from "../../components/molecules"
import { FaPlus } from "react-icons/fa"

const meta: Meta<typeof Alert> = {
  title: "Components/Alert",
  component: Alert,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof Alert>

export const Default: Story = {
  args: {},
  render: () => (
    <div className="space-y-2">
      {["success", "danger", "warning", "info"].map((variant, i) => (
        <Alert key={i} variant={variant}>
          <p className="text-sm">Some info</p>
        </Alert>
      ))}
    </div>
  ),
}

export const WithList: Story = {
  args: {},
  render: () => (
    <div className="space-y-2">
      {["success", "danger", "warning", "info"].map((variant, i) => (
        <Alert key={i} variant={variant}>
          <Alert.List
            lists={[
              "At least 10 characters (and up to 100 characters)",
              "At least one lowercase character",
              "Inclusion of at least one special character, e.g., ! @ # ?",
            ]}
          />
        </Alert>
      ))}
    </div>
  ),
}
