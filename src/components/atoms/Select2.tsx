import clsx from "clsx"
import {
  ChangeEvent,
  FC,
  FormEvent,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { IoChevronDown, IoClose } from "react-icons/io5"

interface Option {
  readonly value: string
  readonly label: string
  readonly isDisabled?: boolean
}

const options: Option[] = [
  { value: "ocean", label: "1 Ocean" },
  { value: "blue", label: "2 Blue" },
  { value: "purple", label: "3 Purple", isDisabled: true },
  {
    value: "red",
    label: "4 Red",
  },
  { value: "orange", label: "5 Orange" },
  {
    value: "yellow",
    label: "6 Yellow",
  },
  { value: "green", label: "7 Green" },
  { value: "forest", label: "8 Forest" },
  { value: "slate", label: "9 Slate" },
  { value: "silver", label: "10 Silver" },
]

/**
 * Why these variable placed outside of component
 * because these will be reset when component get re-rendered
 */
let currentFocus = 0
let currentEvent: "mouse" | "keyboard" | undefined
let hasCleaned: boolean | undefined
let isSearching = false

interface SelectProps {
  clearable?: boolean
  searchable?: boolean
}

const Select2: FC<SelectProps> = ({ clearable, searchable }) => {
  const displayBoxRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const optionContainerRef = useRef<HTMLDivElement>(null)

  const [activeDisplayBox, setActiveDisplayBox] = useState(false)
  const [openOptionContainer, setOpenOptionContainer] = useState(false)
  const [selected, setSelected] = useState<number | null>(null)
  const [query, setQuery] = useState("")

  const filteredData: Option[] = useMemo(() => {
    return options.filter((option) => {
      return option.label.toLowerCase().includes(query)
    })
  }, [query])

  const currentOptions: Option[] = searchable ? filteredData : options

  useEffect(() => {
    console.log("rendered select")
    if (activeDisplayBox) {
      // Adjust the current focus
      currentFocus =
        typeof selected == "number" ? selected : hasCleaned ? currentFocus : 0
      hasCleaned = undefined

      if (currentOptions.length > 0) {
        addSemiActive()
        handleScrolling()
      }

      window.onmousedown = (e) => {
        const isClickedInsideDisplayBox = displayBoxRef.current?.contains(
          e.target as Node
        )

        // prevent an input from losing focus and still get select event
        if (isClickedInsideDisplayBox && e.target != inputRef.current)
          e.preventDefault()
      }
      window.onkeydown = currentOptions.length > 0 ? handleKeyboard : null
    } else {
      window.onmousedown = null
      window.onkeydown = null
    }
  }, [activeDisplayBox, openOptionContainer, selected, query])

  function handleFocus() {
    setActiveDisplayBox(true)
  }

  function handleBlur() {
    if (currentEvent != "mouse") {
      setOpenOptionContainer(false)
      setActiveDisplayBox(false)
    }
  }

  function handleMouseLeave() {
    currentEvent = undefined
  }

  function handleToggleActive() {
    inputRef.current?.focus()
    setOpenOptionContainer(!openOptionContainer)
  }

  function handleSelected(index: number) {
    if (searchable) {
      index = options.findIndex(
        (option) => option.value == currentOptions[index].value
      )
      setQuery("")
    }

    setSelected(index)
    setOpenOptionContainer(false)
    setActiveDisplayBox(false)
    inputRef.current?.blur()
  }

  function handleKeyboard(e: globalThis.KeyboardEvent) {
    // open openOptionContainer during activeDisplayBox is true but openOptionContainer is false
    // TODO activeDisplayBox is true but openOptionContainer is false when backspace pressed, i want openOptionContainer still false
    if (!openOptionContainer) setOpenOptionContainer(true)
    if (!optionContainerRef.current) return

    if (currentEvent != "keyboard") currentEvent = "keyboard"
    if (e.key == "ArrowDown") currentFocus++
    if (e.key == "ArrowUp") currentFocus--

    addSemiActive()
    handleScrolling()

    if (e.key == "Enter")
      optionContainerRef.current.querySelectorAll("li")[currentFocus].click()
  }

  function handleMouseOver(i: number) {
    if (currentEvent == "mouse" && !currentOptions[i].isDisabled) {
      currentFocus = i
      addSemiActive()
    }
  }

  function handleMouseMove(i: number) {
    if (currentEvent != "mouse") {
      currentEvent = "mouse"
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

    // do a scroll to the li/option hiding above the optionContainerDimensions - ArrowUp
    if (currentFocusDimensions.top <= optionContainerDimensions.top) {
      optionContainerRef.current.scrollBy(
        0,
        currentFocusDimensions.top - optionContainerDimensions.top - 5
      )
    }

    // do a scroll to the li/option hiding under the optionContainerDimensions ArrowDown
    if (currentFocusDimensions.bottom >= optionContainerDimensions.bottom) {
      optionContainerRef.current.scrollBy(
        0,
        currentFocusDimensions.bottom - optionContainerDimensions.bottom + 5
      )
    }
  }

  function doClear(e: MouseEvent) {
    e.stopPropagation()
    setSelected(null)
    hasCleaned = true
  }

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    isSearching = true
    setQuery(e.target.value.trimStart())
  }

  function doClear2(e: KeyboardEvent) {
    if (e.key == "Backspace" && !isSearching) {
      setSelected(null)
      hasCleaned = true
    } else {
      isSearching = false
    }
  }

  return (
    <div className="relative mb-10">
      <div
        ref={displayBoxRef}
        className={clsx(
          "flex h-9 justify-between rounded-md border bg-gray-50 p-2 ring-1 transition",
          activeDisplayBox
            ? "border-green-500 ring-green-500"
            : "border-gray-300 ring-transparent"
        )}
        onClick={handleToggleActive}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative flex flex-1 items-center">
          {!query && (
            <span
              className={clsx(
                "line-clamp-1 text-sm",
                selected == null && "text-gray-500"
              )}
            >
              {typeof selected == "number"
                ? currentOptions[selected].label
                : "Select..."}
            </span>
          )}
          <input
            ref={inputRef}
            type="text"
            className={clsx(
              "sr-onlyx h-9 border-none bg-transparent p-0 text-sm focus:ring-transparent",
              searchable && "absolute left-0 right-0"
            )}
            value={query}
            onKeyUp={searchable ? doClear2 : undefined}
            onKeyDown={searchable ? undefined : (e) => e.preventDefault()}
            onChange={handleSearch}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>
        <div className="flex space-x-2">
          {typeof selected == "number" && clearable && (
            <button
              className={clsx(
                "cursor-context-menu outline-none transition",
                activeDisplayBox
                  ? "text-gray-600"
                  : "text-gray-400 hover:text-gray-600"
              )}
              onClick={doClear}
            >
              <IoClose className="text-lg" />
            </button>
          )}
          <span className="w-0.5 bg-gray-400"></span>
          <button
            className={clsx(
              "cursor-context-menu outline-none transition",
              activeDisplayBox
                ? "text-gray-600"
                : "text-gray-400 hover:text-gray-600"
            )}
          >
            <IoChevronDown className="text-lg" />
          </button>
        </div>
      </div>
      {openOptionContainer && (
        <div
          ref={optionContainerRef}
          className="scrollbar absolute inset-x-0 top-11 z-10 max-h-[300px] overflow-y-auto rounded-md border border-gray-300 bg-white py-1 shadow-md"
          onMouseLeave={handleMouseLeave}
        >
          <ul>
            {currentOptions.length == 0 && (
              <li className="p-2 text-center text-gray-400">No options</li>
            )}
            {currentOptions.map((currentOption, i) => (
              <li
                key={i}
                className={clsx(
                  "flex items-center p-2",
                  i == selected && "bg-green-600"
                )}
                onClick={
                  !currentOption.isDisabled
                    ? () => handleSelected(i)
                    : undefined
                }
                onMouseOver={() => handleMouseOver(i)}
                onMouseMove={() => handleMouseMove(i)}
              >
                <span
                  className={clsx(
                    "pointer-events-none text-sm",
                    i == selected && "text-white",
                    currentOption.isDisabled && "text-gray-300"
                  )}
                >
                  {currentOption.label}
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
