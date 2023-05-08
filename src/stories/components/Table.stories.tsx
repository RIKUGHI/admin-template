import type { Meta, StoryObj } from "@storybook/react"
import { Checkbox, Table, Button } from "../../components/atoms"
import { FaPen, FaTrashAlt } from "react-icons/fa"
import { ManagementLayout } from "../../components/organisms"

const CopyTable = ({
  sticky,
  withActions,
}: {
  sticky?: boolean
  withActions?: boolean
}) => {
  return (
    <Table sticky={sticky}>
      <Table.Thead>
        <Table.Row>
          {withActions && (
            <Table.Head className="w-4 p-4">
              <div className="flex items-center">
                <Checkbox />
              </div>
            </Table.Head>
          )}
          <Table.Head>Product name</Table.Head>
          <Table.Head>Color</Table.Head>
          <Table.Head>Category</Table.Head>
          <Table.Head>Accesories</Table.Head>
          <Table.Head>Available</Table.Head>
          <Table.Head>Price</Table.Head>
          <Table.Head>Weight</Table.Head>
          {withActions && <Table.Head>Action</Table.Head>}
        </Table.Row>
      </Table.Thead>
      <Table.Tbody>
        {Array.from({ length: 2 }).map((_, i) => (
          <Table.Row key={i} styled>
            {withActions && (
              <Table.Cell className="p-4">
                <div className="flex items-center">
                  <Checkbox />
                </div>
              </Table.Cell>
            )}
            <Table.Cell>Apple MacBook Pro 17"</Table.Cell>
            <Table.Cell>SILVER</Table.Cell>
            <Table.Cell>Laptop</Table.Cell>
            <Table.Cell>Yes</Table.Cell>
            <Table.Cell>Yes</Table.Cell>
            <Table.Cell>$2999</Table.Cell>
            <Table.Cell>3.0 lb.</Table.Cell>
            {withActions && (
              <Table.Cell>
                <div className="flex items-center space-x-1.5">
                  <Button icon={FaPen} style="outlined" color="blue" />
                  <Button icon={FaTrashAlt} style="outlined" color="red" />
                </div>
              </Table.Cell>
            )}
          </Table.Row>
        ))}
      </Table.Tbody>
    </Table>
  )
}

const meta: Meta<typeof Table> = {
  title: "Components/Table",
  component: Table,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof Table>

export const Default: Story = {
  render: () => <CopyTable />,
}

export const WithActions: Story = {
  render: () => <CopyTable withActions />,
}

export const WithStickyHeader: Story = {
  render: () => <CopyTable sticky />,
}
