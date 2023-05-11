import { BreadcrumbLink } from "../atoms"
import { Fragment, FC } from "react"

interface Props {
  links: string[]
}

const Breadcrumbs: FC<Props> = ({ links }) => {
  return (
    <nav className="flex">
      <ol className="inline-flex items-center space-x-3">
        {links.map((link, i) => (
          <Fragment key={i}>
            <BreadcrumbLink current={i == links.length - 1}>
              {link}
            </BreadcrumbLink>
            {i !== links.length - 1 && <BreadcrumbLink iconOnly />}
          </Fragment>
        ))}
      </ol>
    </nav>
  )
}

export default Breadcrumbs
