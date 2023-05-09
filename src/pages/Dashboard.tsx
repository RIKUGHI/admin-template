import {
  FaChevronCircleRight,
  FaChevronLeft,
  FaChevronRight,
  FaFilter,
  FaInfo,
  FaPen,
  FaPlus,
  FaTimes,
  FaTrashAlt,
} from "react-icons/fa"
import { Button, Checkbox, Table } from "../components/atoms"
import { FormSearch, Pagination, Alert } from "../components/molecules"
import { ManagementLayout } from "../components/organisms"

const Dashboard = () => {
  return (
    <ManagementLayout>
      a
      {/* <Alert>
        <p className="text-sm">Data berhasil ditambahkan</p>
        <Alert.List
          lists={[
            "At least 10 characters (and up to 100 characters)",
            "At least one lowercase character",
            "Inclusion of at least one special character, e.g., ! @ # ?",
          ]}
        />
      </Alert>
      <div className="space-y-5 rounded-md bg-white p-5 shadow-md">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold">Daftar</h3>
          <div className="flex space-x-2">
            <Button icon={FaTrashAlt} style="outlined" color="red" disabled />
            <Button icon={FaFilter} style="outlined" name="Filter" />
            <FormSearch />
            <Button icon={FaPlus} name="Tambah" />
          </div>
        </div>
        <Table sticky>
          <Table.Thead>
            <Table.Row>
              <Table.Head className="w-4 p-4">
                <div className="flex items-center">
                  <Checkbox />
                </div>
              </Table.Head>
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
            {Array.from({ length: 5 }).map((_, i) => (
              <Table.Row key={i} styled>
                <Table.Cell className="p-4">
                  <div className="flex items-center">
                    <Checkbox />
                  </div>
                </Table.Cell>
                <Table.Cell>Apple MacBook Pro 17"</Table.Cell>
                <Table.Cell>SILVER</Table.Cell>
                <Table.Cell>Laptop</Table.Cell>
                <Table.Cell>Yes</Table.Cell>
                <Table.Cell>Yes</Table.Cell>
                <Table.Cell>$2999</Table.Cell>
                <Table.Cell>3.0 lb.</Table.Cell>
                <Table.Cell>
                  <div className="flex items-center space-x-1.5">
                    <Button icon={FaPen} style="outlined" color="blue" />
                    <Button icon={FaTrashAlt} style="outlined" color="red" />
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Tbody>
        </Table>
      </div>

      <Pagination
        limit={1}
        firstIndex={0}
        totalData={1}
        currentPage={5}
        totalPages={10}
      /> */}
    </ManagementLayout>
  )
}

export default Dashboard
