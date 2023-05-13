import { FaChevronRight } from "react-icons/fa"

export interface BreadcrumbLinkProps {
  active?: boolean
  href?: string
  iconOnly?: boolean
}

const BreadcrumbLink: React.FC<
  React.PropsWithChildren<BreadcrumbLinkProps>
> = ({ children, active, href, iconOnly }) => {
  return (
    <>
      <li className="inline-flex items-center">
        {iconOnly ? (
          <FaChevronRight className="text-gray-500" />
        ) : active ? (
          <span className="text-sm font-medium text-gray-500">{children}</span>
        ) : (
          <a
            href={href}
            className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-green-600"
          >
            {children}
          </a>
        )}
      </li>
      {href && <BreadcrumbLink iconOnly />}
    </>
  )
}

export default BreadcrumbLink
