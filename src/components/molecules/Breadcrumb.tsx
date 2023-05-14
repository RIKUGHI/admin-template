import { FC, PropsWithChildren } from "react"
import { BreadcrumbLink, BreadcrumbLinkProps } from "../atoms"

interface SubComponent {
  Item: FC<PropsWithChildren<BreadcrumbLinkProps>>
}
const Breadcrumb: FC<PropsWithChildren> & SubComponent = ({ children }) => {
  return (
    <nav className="flex">
      <ol className="inline-flex items-center space-x-3">{children}</ol>
    </nav>
  )
}

Breadcrumb.Item = BreadcrumbLink

export default Breadcrumb
