import { useState } from "react"
import { PaginationLink } from "../atoms"

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
          <PaginationLink
            no={currentPage - 1}
            prev
            onClick={() => setCurrentPage((prev) => prev - 1)}
          />
        )}
        {totalPages > 6 && currentPage >= 4 && (
          <>
            <PaginationLink no={1} onClick={() => setCurrentPage(1)} />
            {currentPage > 4 && <PaginationLink no={0} separtorOnly />}
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
              <PaginationLink
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
            {currentPage < totalPages - 3 && (
              <PaginationLink no={0} separtorOnly />
            )}
            <PaginationLink
              no={totalPages}
              onClick={() => setCurrentPage(totalPages)}
            />
          </>
        )}
        {currentPage < totalPages && (
          <PaginationLink
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
