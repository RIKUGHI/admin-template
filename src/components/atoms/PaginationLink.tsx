import clsx from "clsx"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"

interface Props {
  no: number
  currentPage?: number
  totalPages?: number
  prev?: boolean
  next?: boolean
  separtorOnly?: boolean
  onClick?: () => void
}

const PaginationLink = ({
  no,
  currentPage,
  totalPages,
  prev,
  next,
  separtorOnly,
  onClick,
}: Props) => {
  const Component = separtorOnly ? "span" : "button"

  return (
    <Component
      className={clsx(
        "relative inline-flex items-center border px-4 py-2 font-medium",
        separtorOnly ? "cursor-not-allowed" : "hover:bg-gray-50",
        {
          "border-gray-300 bg-white text-gray-500": currentPage != no, // not active links
          "z-10 border-green-600 bg-green-50 text-green-600": currentPage == no, // active link
          "rounded-l-md": (currentPage == 1 && no == 1) || prev,
          "rounded-r-md":
            (currentPage == totalPages && no == totalPages) || next,
        }
      )}
      onClick={onClick}
    >
      {separtorOnly ? (
        "..."
      ) : (
        <>
          {prev && <FaChevronLeft className="text-xs" />}
          {!prev && !next && no}
          {next && <FaChevronRight className="text-xs" />}
        </>
      )}
    </Component>
  )
}

export default PaginationLink
