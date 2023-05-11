import { FaChevronRight } from "react-icons/fa"
import { ManagementLayout } from "../components/organisms"
import { BreadcrumbLink } from "../components/atoms"
import { Breadcrumbs } from "../components/molecules"

export default function DataCreate() {
  return (
    <ManagementLayout>
      <Breadcrumbs links={["Data", "Create"]} />
    </ManagementLayout>
  )
}
