import clsx from "clsx"
import { IoChevronDown } from "react-icons/io5"
import { useState, useRef, useEffect } from "react"

interface Option {
  readonly value: string
  readonly label: string
  readonly isDisabled?: boolean
}

const data: Option[] = [
  { value: "ocean", label: "Ocean" },
  { value: "blue", label: "Blue" },
  { value: "purple", label: "Purple", isDisabled: true },
  {
    value: "red",
    label: "Red",
  },
  { value: "orange", label: "Orange" },
  {
    value: "yellow",
    label: "Yellow",
  },
  { value: "green", label: "Green" },
  { value: "forest", label: "Forest" },
  { value: "slate", label: "Slate" },
  { value: "silver", label: "Silver" },
]

let currentFocus = 0

const Select2 = () => {
  const displayBoxRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const optionContainerRef = useRef<HTMLDivElement>(null)

  const [active, setActive] = useState(false)
  const [selected, setSelected] = useState<number | null>(null)

  useEffect(() => {
    console.log("rendered select")
    if (active) {
      addSemiActive()
      handleScrolling()
    }
  }, [active])

  function handleToggleActive() {
    setActive(!active)
    inputRef.current?.focus()

    // reset currentFocus
    currentFocus = typeof selected == "number" ? selected : 0

    window.onclick = !active ? handleOutside : null
    window.onkeydown = !active ? handleKeyboard : null
  }

  function handleOutside(e: globalThis.MouseEvent) {
    if (displayBoxRef.current && optionContainerRef.current) {
      const refDimensions = displayBoxRef.current.getBoundingClientRect()
      const contentRefDimensions =
        optionContainerRef.current.getBoundingClientRect()

      if (
        e.clientX < refDimensions.left ||
        e.clientX > refDimensions.right ||
        e.clientY < refDimensions.top ||
        e.clientY > contentRefDimensions.bottom
      ) {
        setActive(false)
        window.onclick = null
        window.onkeydown = null
      }
    }
  }

  function handleSelected(index: number) {
    setSelected(index)
    setActive(false)
  }

  function handleKeyboard(e: globalThis.KeyboardEvent) {
    if (!optionContainerRef.current) return

    if (e.key == "ArrowDown") currentFocus++
    if (e.key == "ArrowUp") currentFocus--

    addSemiActive()
    handleScrolling()

    if (e.key == "Enter" && !data[currentFocus].isDisabled)
      optionContainerRef.current.querySelectorAll("li")[currentFocus].click()
  }

  function handleMouseOver(i: number) {
    // TODO should fix "add semi active" glitched based on stopped cursor while typing
    if (!data[i].isDisabled) {
      currentFocus = i
      addSemiActive()
    }
  }

  function addSemiActive() {
    if (!optionContainerRef.current) return

    const li = optionContainerRef.current.querySelectorAll("li")

    li.forEach((l) => l.classList.remove("bg-green-100"))
    if (currentFocus >= li.length) currentFocus = 0
    if (currentFocus < 0) currentFocus = li.length - 1
    li[currentFocus].classList.add("bg-green-100")
  }

  function handleScrolling() {
    if (!optionContainerRef.current) return

    const li = optionContainerRef.current.querySelectorAll("li")

    // these conditions can be disabled and still work perfectly
    if (currentFocus == 0) optionContainerRef.current.scrollTop = 0
    if (currentFocus == li.length - 1)
      optionContainerRef.current.scrollTop =
        optionContainerRef.current.scrollHeight

    const optionContainerDimensions =
      optionContainerRef.current.getBoundingClientRect()
    const currentFocusDimensions = li[currentFocus].getBoundingClientRect()

    // do a scroll to the li hiding above the optionContainerDimensions - ArrowUp
    if (currentFocusDimensions.top <= optionContainerDimensions.top) {
      optionContainerRef.current.scrollBy(
        0,
        currentFocusDimensions.top - optionContainerDimensions.top - 5
      )
    }

    // do a scroll to the li hiding under the optionContainerDimensions ArrowDown
    if (currentFocusDimensions.bottom >= optionContainerDimensions.bottom) {
      optionContainerRef.current.scrollBy(
        0,
        currentFocusDimensions.bottom - optionContainerDimensions.bottom + 5
      )
    }
  }

  return (
    <div className="relative mb-10">
      <div
        ref={displayBoxRef}
        className={clsx(
          "flex h-9 items-center justify-between rounded-md border bg-gray-50 p-2 ring-1 transition",
          active
            ? "border-green-500 ring-green-500"
            : "border-gray-300 ring-transparent"
        )}
        onClick={handleToggleActive}
      >
        <span
          className={clsx(
            "pointer-events-none line-clamp-1 text-sm",
            selected == null && "text-gray-500"
          )}
        >
          {typeof selected == "number" ? data[selected].label : "Select..."}
        </span>
        <input ref={inputRef} type="text" className="sr-only h-9" />
        <button className="pointer-events-none outline-none">
          <IoChevronDown className="text-lg" />
        </button>
      </div>
      {active && (
        <div
          ref={optionContainerRef}
          className="scrollbar absolute inset-x-0 top-11 z-10 max-h-[300px] overflow-y-auto rounded-md border border-gray-300 bg-white py-1"
        >
          <ul>
            {data.map((data, i) => (
              <li
                key={i}
                className={clsx(
                  "flex items-center p-2",
                  i == selected && "bg-green-600"
                )}
                onClick={!data.isDisabled ? () => handleSelected(i) : undefined}
                onMouseOver={() => handleMouseOver(i)}
              >
                <span
                  className={clsx(
                    "pointer-events-none text-sm",
                    i == selected && "text-white",
                    data.isDisabled && "text-gray-300"
                  )}
                >
                  {data.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Select2
