import { FC, PropsWithChildren } from "react"

const ManagementLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className="scrollbar ml-2 flex-1 overflow-y-auto">{children}</main>
  )
}

export default ManagementLayout
