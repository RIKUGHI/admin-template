window.addEventListener("DOMContentLoaded", (e) => {
  StickyHeaderTable()
})

/**
 * Sticky header for table
 * * set the data-sticky attribute to the table elements you want to make them sticky
 * @return {void}
 */
function StickyHeaderTable(): void {
  window.onscroll = () => {
    const tables = document.querySelectorAll<HTMLTableElement>("table[data-sticky]")
    tables.forEach((table) => {
      const thead = table.querySelector('thead')

      if (thead) {
        const actualTableHeight = table.clientHeight - thead.clientHeight
        const offsetTop = table.offsetTop
        const scrollTop = Math.floor(window.scrollY)
        const yTranslation = scrollTop - offsetTop
        if (scrollTop > offsetTop) {
          thead?.style.setProperty(
            "transform",
            `translateY(${
              yTranslation < actualTableHeight
                ? yTranslation
                : actualTableHeight
            }px)`
          )
        } else thead?.style.removeProperty("transform")
      }
    })
  }
}