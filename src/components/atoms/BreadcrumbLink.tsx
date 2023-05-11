import { FaChevronRight } from "react-icons/fa"

interface Props {
  iconOnly?: boolean
  current?: boolean
}

const BreadcrumbLink: React.FC<React.PropsWithChildren<Props>> = ({
  children,

  iconOnly,
  current,
}) => {
  return (
    <li className="inline-flex items-center">
      {iconOnly ? (
        <FaChevronRight className="text-gray-500" />
      ) : current ? (
        <span className="text-sm font-medium text-gray-500">{children}</span>
      ) : (
        <a
          href="#"
          className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-green-600"
        >
          {children}
        </a>
      )}
    </li>
  )
}

export default BreadcrumbLink
