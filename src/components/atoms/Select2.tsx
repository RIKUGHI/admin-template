import clsx from "clsx"
import {
  ChangeEvent,
  FC,
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

const options: readonly Option[] = [
  { value: "ocean", label: "1 Ocean" },
  { value: "blue", label: "2 Blue", isDisabled: true },
  { value: "purple", label: "3 Purple" },
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
  isClearable?: boolean
  isSearchable?: boolean
  isMulti?: boolean
}

const Select2: FC<SelectProps> = ({ isClearable, isSearchable, isMulti }) => {
  const displayBoxRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const optionContainerRef = useRef<HTMLDivElement>(null)

  const [activeDisplayBox, setActiveDisplayBox] = useState(false)
  const [openOptionContainer, setOpenOptionContainer] = useState(false)
  const [selected, setSelected] = useState<number | null>(null)
  const [multiSelected, setMultiSelected] = useState<number[]>([])
  const [query, setQuery] = useState("")

  const filteredData: Option[] = useMemo(() => {
    return options.filter((option, i) => {
      return (
        !multiSelected.includes(i) && option.label.toLowerCase().includes(query)
      )
    })
  }, [query, multiSelected])

  if (isMulti) {
    isClearable = true
    isSearchable = true
  }

  const currentOptions: readonly Option[] = isSearchable
    ? filteredData
    : options

  useEffect(() => {
    console.log("rendered select")
    if (activeDisplayBox) {
      // Adjust the current focus for unsearchable
      currentFocus =
        typeof selected == "number" ? selected : hasCleaned ? currentFocus : 0
      hasCleaned = undefined

      // adjust the original currentFocus of currentOptions during filtering
      if (isSearchable && typeof selected == "number") {
        const oriCurrentFocus = currentOptions.findIndex(
          (currentOption) => currentOption.value == options[selected].value
        )

        currentFocus = oriCurrentFocus == -1 ? 0 : oriCurrentFocus
      }

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
      // prevent an input from moving caret
      window.onkeydown = (e) => {
        if (e.key == "ArrowDown" || e.key == "ArrowUp") e.preventDefault()
      }
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
    setQuery("")
    isSearching = false
  }

  function handleSelected(index: number) {
    if (isSearchable) {
      // adjust the original index of options during filtering
      index = options.findIndex(
        (option) => option.value == currentOptions[index].value
      )
      setQuery("")
    }

    if (isMulti) {
      setMultiSelected((oldMultiSelected) => [...oldMultiSelected, index])
    } else setSelected(index)

    setOpenOptionContainer(false)

    if (isMulti && currentEvent == "keyboard") return

    setActiveDisplayBox(false)
    inputRef.current?.blur()
  }

  function handleKeyboard(e: KeyboardEvent) {
    // TODO When the first type is ArrowUp the currentFocus must be last option
    const allowedKeys = ["Tab", "Enter", "ArrowDown", "ArrowUp", "F5"]

    // prevent keyboard from not allowed keys during !isSearchable
    if (!isSearchable && !allowedKeys.includes(e.key)) e.preventDefault()

    setTimeout(() => {
      const deleteKeys = e.key == "Backspace" || e.key == "Delete"

      if (!isClearable && deleteKeys) return

      const inputValue = (e.target as HTMLInputElement).value

      if (deleteKeys && inputValue == "" && isSearching) {
        isSearching = false
        return
      }

      if (deleteKeys && !isSearching) {
        if (isMulti) {
          setMultiSelected((oldMultiSelected) => oldMultiSelected.slice(0, -1))
        } else {
          setSelected(null)
          hasCleaned = true
        }
      }

      if (
        !openOptionContainer &&
        (inputValue != "" || (e.key != "Backspace" && e.key != "Delete"))
      )
        setOpenOptionContainer(true)
    }, 0)

    if (!optionContainerRef.current) return

    if (currentEvent != "keyboard") currentEvent = "keyboard"
    if (e.key == "ArrowDown") currentFocus++
    if (e.key == "ArrowUp") currentFocus--

    addSemiActive()
    handleScrolling()

    if (e.key == "Tab" || e.key == "Enter")
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

    if (isMulti) {
      setMultiSelected([])
    } else {
      setSelected(null)
      hasCleaned = true
    }
  }

  function handleSearching(e: ChangeEvent<HTMLInputElement>) {
    isSearching = true
    setQuery(e.target.value.trimStart())
  }

  function getOriginalSelected(index: number) {
    return isSearchable && typeof selected == "number"
      ? options[selected].value == currentOptions[index].value
      : index == selected
  }

  return (
    <div className="relative mb-10">
      <div
        ref={displayBoxRef}
        className={clsx(
          "flex min-h-[36px] justify-between rounded-md border bg-gray-50 px-2 ring-1 transition",
          activeDisplayBox
            ? "border-green-500 ring-green-500"
            : "border-gray-300 ring-transparent",
          !isMulti && "h-9"
        )}
        onClick={handleToggleActive}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative flex flex-1 flex-wrap items-center">
          {isMulti && multiSelected.length > 0 ? (
            <>
              {multiSelected.map((selected, i) => (
                <div key={i} className="m-0.5 flex rounded bg-gray-300 text-sm">
                  <span className="line-clamp-1 px-1 leading-snug">
                    {options[selected].label}
                  </span>
                  <button
                    className="group flex cursor-context-menu items-center px-1 hover:bg-red-200"
                    onClick={(e) => {
                      e.stopPropagation()
                      setMultiSelected((oldMultiSelected) => {
                        const newMultiSelected = [...oldMultiSelected]
                        newMultiSelected.splice(i, 1)
                        return newMultiSelected
                      })
                    }}
                  >
                    <IoClose className="text-sm group-hover:text-red-600" />
                  </button>
                </div>
              ))}
            </>
          ) : (
            !query && (
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
            )
          )}
          <input
            ref={inputRef}
            type="text"
            className={clsx(
              "sr-onlyx h-9 bg-transparent p-0 text-sm focus:ring-transparent",
              isSearchable && !isMulti && "absolute left-0 right-0",
              isMulti && "flex-1"
            )}
            value={query}
            onKeyDown={currentOptions.length > 0 ? handleKeyboard : undefined}
            onChange={handleSearching}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>
        <div className="flex space-x-2">
          {isClearable &&
            (typeof selected == "number" || multiSelected.length > 0) && (
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
          <span className="my-2 w-0.5 bg-gray-400"></span>
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
          className="scrollbar absolute inset-x-0 top-[calc(100%+0.4rem)] z-10 max-h-[300px] overflow-y-auto rounded-md border border-gray-300 bg-white py-1 shadow-md"
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
                  getOriginalSelected(i) && "bg-green-600"
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
                    getOriginalSelected(i) && "text-white",
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
