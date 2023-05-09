import { FC, PropsWithChildren } from "react"
import { Navigation } from ".."

const AdminLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Navigation />
      {children}
    </>
  )
}

export default AdminLayout
