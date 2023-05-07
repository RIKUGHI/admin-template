import {
  FaChevronCircleRight,
  FaChevronLeft,
  FaChevronRight,
  FaFilter,
  FaPen,
  FaPlus,
  FaTrashAlt,
} from "react-icons/fa"
import { Button, Checkbox, Table } from "../components/atoms"
import { FormSearch } from "../components/molecules"
import { ManagementLayout } from "../components/organisms"

const Dashboard = () => {
  return (
    <ManagementLayout>
      {/* <Header /> */}

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
            <Table.Row styled>
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
            <Table.Row styled>
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
          </Table.Tbody>
        </Table>
      </div>
      <div className="flex items-center justify-between bg-white px-2 py-3">
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Menampilkan data ke <span className="font-medium">1</span> -{" "}
              <span className="font-medium">50</span> dari{" "}
              <span className="font-medium">93</span> hasil
            </p>
          </div>
          {/* <div>
          </div> */}
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button className="relative z-10 inline-flex items-center rounded-l-md border border-blue-600 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 focus:z-20">
              1o
            </button>
            <button className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
              2o
            </button>
            <button className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
              3o
            </button>
            <button className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
              <span className="sr-only">Next</span>
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </nav>
        </div>
      </div>
      <div className="flex items-center justify-between rounded-md bg-white p-5 shadow-md">
        <div className="">
          <p className="text-sm text-gray-700">
            Showing
            <span className="font-medium"> 1 </span>
            to
            <span className="font-medium"> 10 </span>
            of
            <span className="font-medium"> 97 </span>
            results
          </p>
        </div>
        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
          <button className="relative z-10 inline-flex items-center rounded-l-md border border-blue-600 bg-white px-4 py-2 text-sm font-medium text-blue-600">
            <FaChevronLeft />
          </button>
          <button className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500">
            1
          </button>
          <button className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500">
            2
          </button>
          <button className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500">
            3
          </button>
          <button className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500">
            <FaChevronRight />
          </button>
        </nav>
      </div>
    </ManagementLayout>
  )
}

export default Dashboard
