import clsx from "clsx"
import { FC, PropsWithChildren } from "react"

interface RowProps {
  styled?: boolean
}

const Thead: FC<PropsWithChildren> = ({ children }) => (
  <thead className="bg-gray-50 text-xs uppercase">{children}</thead>
)
const Tbody: FC<PropsWithChildren> = ({ children }) => <tbody>{children}</tbody>
const Row: FC<PropsWithChildren<RowProps>> = ({ children, styled }) => (
  <tr className={clsx(styled && "border-b bg-white hover:bg-gray-50")}>
    {children}
  </tr>
)
const Head: FC<PropsWithChildren> = ({ children }) => (
  <th className="px-6 py-3">{children}</th>
)
const Cell: FC<PropsWithChildren> = ({ children }) => (
  <td className="px-6 py-4">{children}</td>
)

interface Sub {
  Thead: FC<PropsWithChildren>
  Tbody: FC<PropsWithChildren>
  Row: FC<PropsWithChildren<RowProps>>
  Head: FC<PropsWithChildren>
  Cell: FC<PropsWithChildren>
}

const Table: FC<PropsWithChildren> & Sub = ({ children }) => {
  return (
    <div className="scrollbar overflow-x-auto">
      <table className="w-full text-left text-sm">
        {children}
        {/* <thead className="bg-gray-50 text-xs uppercase">
          <tr>
            <th className="p-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-green-600 focus:ring-2 focus:ring-green-500"
                />
              </div>
            </th>
            <th className="px-6 py-3">Product name</th>
            <th className="px-6 py-3">Color</th>
            <th className="px-6 py-3">Category</th>
            <th className="px-6 py-3">Accesories</th>
            <th className="px-6 py-3">Available</th>
            <th className="px-6 py-3">Price</th>
            <th className="px-6 py-3">Weight</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead> */}
        {/* <tbody>
          <tr className="border-b bg-white hover:bg-gray-50">
            <td className="w-4 p-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-green-600 focus:ring-2 focus:ring-green-500 "
                />
              </div>
            </td>
            <td className="px-6 py-4">Apple MacBook Pro 17"</td>
            <td className="px-6 py-4">SILVER</td>
            <td className="px-6 py-4">Laptop</td>
            <td className="px-6 py-4">Yes</td>
            <td className="px-6 py-4">Yes</td>
            <td className="px-6 py-4">$2999</td>
            <td className="px-6 py-4">3.0 lb.</td>
            <td className="flex items-center space-x-2 px-6 py-4">
              <Button icon={FaPen} style="outlined" color="blue" />
              <Button icon={FaTrashAlt} style="outlined" color="red" />
            </td>
          </tr>
        </tbody> */}
      </table>
    </div>
  )
}

Table.Thead = Thead
Table.Tbody = Tbody
Table.Row = Row
Table.Head = Head
Table.Cell = Cell

export default Table
