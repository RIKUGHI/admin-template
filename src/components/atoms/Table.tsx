import clsx from "clsx"
import { FC, PropsWithChildren } from "react"

interface CommonProps {
  className?: string
}
interface RowProps {
  styled?: boolean
}

const Thead: FC<PropsWithChildren> = ({ children }) => (
  <thead className="bg-gray-50 text-xs uppercase shadow-md">{children}</thead>
)
const Tbody: FC<PropsWithChildren> = ({ children }) => <tbody>{children}</tbody>
const Row: FC<PropsWithChildren<RowProps>> = ({ children, styled }) => (
  <tr className={clsx(styled && "border-b bg-white hover:bg-gray-50")}>
    {children}
  </tr>
)
const Head: FC<PropsWithChildren<CommonProps>> = ({ children, className }) => (
  <th className={clsx(className ?? "px-6 py-3")}>{children}</th>
)
const Cell: FC<PropsWithChildren<CommonProps>> = ({ children, className }) => (
  <td className={clsx(className ?? "px-6 py-4")}>{children}</td>
)

interface TableProps {
  sticky?: boolean
}

interface SubComponents {
  Thead: FC<PropsWithChildren>
  Tbody: FC<PropsWithChildren>
  Row: FC<PropsWithChildren<RowProps>>
  Head: FC<PropsWithChildren<CommonProps>>
  Cell: FC<PropsWithChildren<CommonProps>>
}

const Table: FC<PropsWithChildren<TableProps>> & SubComponents = ({
  children,
  sticky,
}) => {
  return (
    <div className="scrollbar overflow-x-auto">
      {sticky ? (
        <table className="w-full text-left text-sm" data-sticky>
          {children}
        </table>
      ) : (
        <table className="w-full text-left text-sm">{children}</table>
      )}
    </div>
  )
}

Table.Thead = Thead
Table.Tbody = Tbody
Table.Row = Row
Table.Head = Head
Table.Cell = Cell

export default Table
