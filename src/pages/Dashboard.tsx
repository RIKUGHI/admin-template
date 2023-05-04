import {
  FaFilter,
  FaPen,
  FaPlus,
  FaTrashAlt,
  FaTrashRestore,
} from "react-icons/fa"
import { Header, ManagementLayout } from "../components/organisms"
import { FormSearch } from "../components/molecules"
import { Button, Table } from "../components/atoms"
import Test from "../components/atoms/Test"

const Dashboard = () => {
  return (
    <ManagementLayout>
      {/* <Header /> */}
      <div className="rounded-md bg-white p-5 shadow-md">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-lg font-bold">Daftar</h3>
          <div className="flex space-x-2">
            <Button icon={FaTrashAlt} style="outlined" color="red" disabled />
            <Button icon={FaFilter} style="outlined" name="Filter" />
            <FormSearch />
            <Button icon={FaPlus} name="Tambah" />
          </div>
        </div>
        <Table>
          <Table.Thead>
            <Table.Row>
              <Table.Head>Product name</Table.Head>
              <Table.Head>Color</Table.Head>
              <Table.Head>Category</Table.Head>
              <Table.Head>Accesories</Table.Head>
              <Table.Head>Available</Table.Head>
              <Table.Head>Price</Table.Head>
              <Table.Head>Weight</Table.Head>
              <Table.Head>Action</Table.Head>
            </Table.Row>
          </Table.Thead>
          <Table.Tbody>
            <Table.Row styled>
              <Table.Cell>Apple MacBook Pro 17"</Table.Cell>
              <Table.Cell>SILVER</Table.Cell>
              <Table.Cell>Laptop</Table.Cell>
              <Table.Cell>Yes</Table.Cell>
              <Table.Cell>Yes</Table.Cell>
              <Table.Cell>$2999</Table.Cell>
              <Table.Cell>3.0 lb.</Table.Cell>
            </Table.Row>
          </Table.Tbody>
        </Table>
        <Test />
        <div className="bb mt-5 h-[500px]"></div>
      </div>
    </ManagementLayout>
  )
}

export default Dashboard
