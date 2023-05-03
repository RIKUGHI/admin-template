import { FC, PropsWithChildren } from "react"
import { Navigation } from ".."

const AdminLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex h-screen">
      <Navigation />
      {children}
    </div>
  )
}

export default AdminLayout
