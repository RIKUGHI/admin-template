import { FC, PropsWithChildren } from "react"

const ManagementLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className="scrollbar flex-1 space-y-5 overflow-y-auto p-5">
      {children}
    </main>
  )
}

export default ManagementLayout
