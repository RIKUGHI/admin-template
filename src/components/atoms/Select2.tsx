import clsx from "clsx"
import { IoChevronDown } from "react-icons/io5"
import { useState, MouseEvent, useRef, useEffect } from "react"

interface Option {
  readonly value: string
  readonly label: string
}

const data: Option[] = [
  { value: "ocean", label: "Ocean" },
  { value: "blue", label: "Blue" },
  { value: "purple", label: "Purple" },
  { value: "red", label: "Red" },
  { value: "orange", label: "Orange" },
  { value: "yellow", label: "Yellow" },
  { value: "green", label: "Green" },
  { value: "forest", label: "Forest" },
  { value: "slate", label: "Slate" },
  { value: "silver", label: "Silver" },
]

let currentFocus = -1

const Select2 = () => {
  const ref = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const contentContainerRef = useRef<HTMLDivElement>(null)

  const [active, setActive] = useState(false)
  // const [currentFocus, setCurrentFocus] = useState(-1)
  const [selected, setSelected] = useState<number | null>(null)

  useEffect(() => {
    // console.log("rendered select")
  })

  function handleToggleActive() {
    setActive(!active)
    inputRef.current?.focus()
    window.onclick = !active ? handleOutside : null
    window.onkeydown = !active ? handleKeyboard : null
  }

  function handleOutside(e: globalThis.MouseEvent) {
    if (ref.current && contentContainerRef.current) {
      const refDimensions = ref.current.getBoundingClientRect()
      const contentRefDimensions =
        contentContainerRef.current.getBoundingClientRect()

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
  }

  function handleKeyboard(e: globalThis.KeyboardEvent) {
    if (!contentContainerRef.current) return

    const li = contentContainerRef.current.querySelectorAll("li")

    if (e.key == "ArrowDown") {
      currentFocus++
      li.forEach((l) => l.classList.remove("bg-green-100"))
      if (currentFocus >= li.length) currentFocus = 0
      li[currentFocus].classList.add("bg-green-100")
    }

    if (e.key == "ArrowUp") {
      currentFocus--
      li.forEach((l) => l.classList.remove("bg-green-100"))
      if (currentFocus < 0) currentFocus = li.length - 1
      li[currentFocus].classList.add("bg-green-100")
    }

    if (e.key == "Enter") {
    }
  }

  function handleMouseOver(i: number) {
    if (!contentContainerRef.current) return

    const li = contentContainerRef.current.querySelectorAll("li")
    currentFocus = i
    li.forEach((l) => l.classList.remove("bg-green-100"))
    li[currentFocus].classList.add("bg-green-100")
  }

  return (
    <div className="relative mb-10">
      <div
        ref={ref}
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
            "pointer-events-none text-sm",
            selected == null && "text-gray-500"
          )}
        >
          {typeof selected == "number" ? data[selected].label : "Select..."}
        </span>
        <input ref={inputRef} type="text" className="sr-only h-9" />
        <button className="pointer-events-none">
          <IoChevronDown className="text-lg" />
        </button>
      </div>
      {active && (
        <div
          ref={contentContainerRef}
          className="scrollbar absolute inset-x-0 top-11 z-10 max-h-[300px] overflow-y-auto rounded-md border border-gray-300 bg-white py-1"
        >
          <ul>
            {data.map((data, i) => (
              <li
                key={i}
                className={clsx(
                  "flex h-9 items-center p-2",
                  i == selected ? "bg-green-600" : "hover:bg-green-100"
                )}
                onClick={() => handleSelected(i)}
                onMouseOver={() => handleMouseOver(i)}
              >
                <span
                  className={clsx("text-sm", i == selected && "text-white")}
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
