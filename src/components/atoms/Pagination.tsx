import clsx from "clsx"
import { useState } from "react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"

interface LinkProps {
  no: number
  currentPage?: number
  totalPages?: number
  prev?: boolean
  next?: boolean
  onClick?: () => void
}

const Link = ({
  no,
  currentPage,
  totalPages,
  prev,
  next,
  onClick,
}: LinkProps) => {
  return (
    <button
      className={clsx(
        "font- relative inline-flex items-center border px-4 py-2",
        {
          "border-gray-300 bg-white text-gray-500 hover:bg-gray-50":
            currentPage != no,
          "z-10 border-green-600 bg-green-50 text-green-600": currentPage == no,
          "rounded-l-md": (currentPage == 1 && no == 1) || prev,
          "rounded-r-md":
            (currentPage == totalPages && no == totalPages) || next,
        }
      )}
      onClick={onClick}
    >
      {prev && <FaChevronLeft className="text-xs" />}
      {!prev && !next && no}
      {next && <FaChevronRight className="text-xs" />}
    </button>
  )
}

const Separator = () => {
  return (
    <span className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 font-medium text-gray-500">
      ...
    </span>
  )
}

interface PaginationProps {
  limit: number
  firstIndex: number
  totalData: number
  currentPage: number
  totalPages: number
}

const Pagination = ({
  limit,
  firstIndex,
  totalData,
  currentPage: oriCurrentPage,
  totalPages,
}: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(oriCurrentPage)

  return (
    <div className="flex items-center justify-between rounded-md bg-white p-5 text-sm shadow-md">
      <p className="text-gray-700">
        Showing
        <span className="font-medium"> 1 </span>
        to
        <span className="font-medium"> 10 </span>
        of
        <span className="font-medium"> 97 </span>
        results
      </p>
      <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
        {currentPage > 1 && (
          <Link
            no={currentPage - 1}
            prev
            onClick={() => setCurrentPage((prev) => prev - 1)}
          />
        )}
        {totalPages > 6 && currentPage >= 4 && (
          <>
            <Link no={1} onClick={() => setCurrentPage(1)} />
            {currentPage > 4 && <Separator />}
          </>
        )}

        {(() => {
          let links = []
          let firstPage = 1
          let iterate = totalPages

          if (totalPages > 5) {
            if (currentPage >= 3 && currentPage < totalPages - 2) {
              firstPage = currentPage - 2
              iterate = currentPage + 2
            } else if (currentPage >= totalPages - 2) {
              firstPage = totalPages - 4
              iterate = totalPages
            } else {
              iterate = 5
            }
          }

          for (let i = firstPage; i <= iterate; i++) {
            links[i] = (
              <Link
                key={i}
                no={i}
                currentPage={currentPage}
                totalPages={totalPages}
                onClick={() => setCurrentPage(i)}
              />
            )
          }

          return links.map((link) => link)
        })()}

        {totalPages > 6 && currentPage <= totalPages - 3 && (
          <>
            {currentPage < totalPages - 3 && <Separator />}
            <Link no={totalPages} onClick={() => setCurrentPage(totalPages)} />
          </>
        )}
        {currentPage < totalPages && (
          <Link
            no={totalPages}
            next
            onClick={() => setCurrentPage((prev) => prev + 1)}
          />
        )}
      </nav>
    </div>
  )
}

export default Pagination
