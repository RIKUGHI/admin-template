import { FC, PropsWithChildren, useRef, useEffect } from "react"

const ManagementLayout: FC<PropsWithChildren> = ({ children }) => {
  const mainRef = useRef<HTMLElement>(null)

  const onScroll = () => {
    if (mainRef.current) {
      const table =
        mainRef.current.querySelector<HTMLTableSectionElement>(
          "table[data-sticky]"
        )
      const thead = table?.querySelector("thead")

      if (table && thead) {
        const actualTableHeight = table.clientHeight - thead.clientHeight
        const offsetTop = table.offsetTop
        const scrollTop = Math.floor(mainRef.current.scrollTop)
        const yTranslation = scrollTop - offsetTop

        if (scrollTop > offsetTop) {
          thead?.style.setProperty(
            "transform",
            `translateY(${
              yTranslation < actualTableHeight
                ? yTranslation
                : actualTableHeight - 1
            }px)`
          )
        } else thead?.style.removeProperty("transform")
      }
    }
  }

  return (
    <main
      ref={mainRef}
      className="scrollbar bb ml-[50px] space-y-5 overflow-y-auto p-5"
      onScroll={onScroll}
    >
      {children}
    </main>
  )
}

export default ManagementLayout
