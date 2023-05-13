import { FaFilter, FaPen, FaPlus, FaSearch, FaTrashAlt } from "react-icons/fa"
import {
  Button,
  Checkbox,
  Input,
  Select,
  Table,
  TextArea,
} from "../components/atoms"
import { SearchBox, Pagination } from "../components/molecules"
import { ManagementLayout } from "../components/organisms"

export default function Data() {
  return (
    <ManagementLayout>
      <div className="space-y-5 rounded-md bg-white p-5 shadow-md">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold">Daftar</h3>
          <div className="flex space-x-2">
            <Button icon={FaTrashAlt} style="outlined" color="red" disabled />
            <Button
              icon={FaFilter}
              style="outlined"
              color="primary"
              name="Filter"
            />
            <SearchBox />
            <Button
              icon={FaPlus}
              style="solid"
              color="primary"
              name="Tambah"
              as="a"
              href="data/create"
            />
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
              <Table.Head>Product namea</Table.Head>
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
            {Array.from({ length: 1 }).map((_, i) => (
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
      />
    </ManagementLayout>
  )
}
