import { BreadcrumbLink, BreadcrumbLinkProps } from "../atoms"
import { Fragment, FC, PropsWithChildren } from "react"

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
