import clsx from "clsx"
import { FC, PropsWithChildren, useEffect, useRef, useState } from "react"

const Scrollable: FC<PropsWithChildren> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [hasScrollbar, setHasScrollbar] = useState(false)

  useEffect(() => {
    setHasScrollbar(
      (ref.current && ref.current.scrollHeight > ref.current.clientHeight) ||
        false
    )
  }, [])

  return (
    <div
      ref={ref}
      className={clsx(
        "scrollbar scrollbar-interactive flex flex-col overflow-y-auto py-2 pl-3",
        hasScrollbar ? "pr-1" : "pr-3"
      )}
    >
      {children}
    </div>
  )
}

export default Scrollable
