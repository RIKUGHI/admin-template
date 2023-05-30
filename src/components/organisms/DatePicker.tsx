import clsx from "clsx"
import { FC, useEffect, useRef, useState } from "react"
import {
  DatePickerNavigationType,
  DateValueType,
  IdDatePickerState,
  SingleDatePicker,
} from "../molecules"

interface Props {
  asSingle?: boolean
  useRange?: boolean
  /** can be used if useRange is true. */
  showShortcuts?: boolean
  showFooter?: boolean
  value?: DateValueType
  onChange: (v: DateValueType) => void
}

const DatePicker: FC<Props> = ({
  asSingle = true,
  useRange,
  showShortcuts,
  showFooter,
  value: oriValue = null,
  onChange,
}) => {
  if (typeof oriValue !== "object") {
    console.error("The value must be of type Date or DateRange or null")
  }

  if (useRange) {
  }

  const datePickerContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const [openDatePicker, setOpenDatePicker] = useState(false)
  const [selected, setSelected] = useState<DateValueType>(oriValue)

  // adjust date
  const [date1, setDate1] = useState<Date>(
    selected instanceof Date ? selected : new Date()
  )
  const [currentMonth1, setCurrentMonth1] = useState(date1.getMonth())
  const [currentYear1, setCurrentYear1] = useState(date1.getFullYear())

  const [date2, setDate2] = useState<Date>(
    new Date(currentYear1, currentMonth1 + 1)
  )
  const [currentMonth2, setCurrentMonth2] = useState(date2.getMonth())
  const [currentYear2, setCurrentYear2] = useState(date2.getFullYear())

  useEffect(() => {
    const date = new Date()
    const a = new Date("2023-05-30 00:00:00").toISOString()
    const b = new Date(2023, 4, 29)
    const c = new Date("05/29/2023")
    const d = new Date("2023-05-29")
    const e = new Date("2023/05/29")
    const f = new Date("May 29 2023")
    const g = new Date("MAY, 20, 2023")

    // date.setHours(0, 0, 0, 0)
    // console.log("=========================")
    // console.log({
    //   date,
    //   a: { before: a, after: new Date(a) },
    //   b,
    //   c,
    //   d,
    //   e,
    //   f,
    //   g,
    // })

    // d.setHours(0, 0, 0, 0)

    console.log("rendered full datepicker")
  }, [])

  function handleFocus() {
    setOpenDatePicker(true)

    if (showFooter) {
      // adjust selected
      setSelected(oriValue)

      // adjust datePicker1
      const resetDate1 = oriValue instanceof Date ? oriValue : new Date()
      setDate1(resetDate1)
      setCurrentMonth1(resetDate1.getMonth())
      setCurrentYear1(resetDate1.getFullYear())

      if (!asSingle) {
        handlePrevNextMonth(
          "NEXT",
          resetDate1.getFullYear(),
          resetDate1.getMonth()
        )
      }
    }

    window.onmousedown = (e) => {
      const isClickedInsideDatePickerContainer =
        datePickerContainerRef.current?.contains(e.target as Node)

      if (isClickedInsideDatePickerContainer) {
        e.preventDefault()
      }
    }
  }

  function handleBlur() {
    setOpenDatePicker(false)

    window.onmousedown = null
  }

  function handleSetCurrentMonth(
    month: number,
    year: number,
    idComp: IdDatePickerState
  ) {
    if (idComp === "datePicker1") {
      setCurrentMonth1(month)

      if (
        !asSingle &&
        new Date(year, month) >= new Date(currentYear2, currentMonth2)
      )
        handlePrevNextMonth("NEXT", currentYear2, month)
    }

    if (idComp === "datePicker2") {
      setCurrentMonth2(month)

      if (
        !asSingle &&
        new Date(year, month) <= new Date(currentYear1, currentMonth1)
      )
        handlePrevNextMonth("PREV", currentYear1, month)
    }
  }

  function handleSetCurrentYear(
    year: number,
    month: number,
    idComp: IdDatePickerState
  ) {
    if (idComp === "datePicker1") {
      setCurrentYear1(year)

      if (
        !asSingle &&
        new Date(year, month) >= new Date(currentYear2, currentMonth2)
      )
        handlePrevNextYear("NEXT", year, month)
    }

    if (idComp === "datePicker2") {
      setCurrentYear2(year)

      if (
        !asSingle &&
        new Date(year, month) <= new Date(currentYear1, currentMonth1)
      )
        handlePrevNextYear("PREV", year, month)
    }
  }

  function handlePrevNextMonth(
    type: DatePickerNavigationType,
    year: number,
    month: number
  ) {
    if (type === "PREV") {
      const date = new Date(year, month - 1)

      setDate1(date)
      setCurrentMonth1(date.getMonth())
      setCurrentYear1(date.getFullYear())
    } else {
      const date = new Date(year, month + 1)

      setDate2(date)
      setCurrentMonth2(date.getMonth())
      setCurrentYear2(date.getFullYear())
    }
  }

  function handlePrevNextYear(
    type: DatePickerNavigationType,
    year: number,
    month: number
  ) {
    if (type === "PREV") {
      const date = new Date(year, month - 1)

      setDate1(date)
      setCurrentMonth1(date.getMonth())
      setCurrentYear1(date.getFullYear())
    } else {
      const date = new Date(year, month + 1)

      setDate2(date)
      setCurrentMonth2(date.getMonth())
      setCurrentYear2(date.getFullYear())
    }
  }

  function handleSetSelected(v: Date) {
    if (showFooter) {
      setSelected(v)
    } else {
      setSelected(v)
      onChange(v)
      inputRef.current?.blur()
    }
  }

  function handleCancel() {
    setSelected(oriValue)
    inputRef.current?.blur()
  }

  function handleApply() {
    if (selected instanceof Date) {
      onChange(selected)
      inputRef.current?.blur()
    }
  }

  function formatDateToYYYYMMDD(v: Date) {
    return (
      v.getFullYear() +
      "-" +
      String(v.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(v.getDate()).padStart(2, "0")
    )
  }

  return (
    <div className="relative mb-10">
      <input
        ref={inputRef}
        type="text"
        className="block h-9 w-full rounded-md border border-gray-300 bg-gray-50 p-2 text-sm transition focus:border-green-500 focus:ring-green-500"
        value={oriValue instanceof Date ? formatDateToYYYYMMDD(oriValue) : ""}
        readOnly
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {openDatePicker && (
        <div
          ref={datePickerContainerRef}
          className="absolute z-10 mt-1.5 flex flex-col rounded-md border border-gray-300 bg-white shadow-md lg:flex-row"
        >
          {useRange && showShortcuts && (
            <div className="w-full border-b border-gray-200 py-4 lg:w-36 lg:border-r lg:py-6">
              <ul className="grid grid-cols-2 text-xs md:grid-cols-4 lg:grid-cols-1">
                {["Today", "Last 7 days", "Last 14 days", "Last 30 days"].map(
                  (label, i) => (
                    <li key={i} className="rounded-md">
                      <button className="w-full px-6 py-1.5 text-left leading-5 hover:bg-gray-50 hover:text-green-600">
                        {label}
                      </button>
                    </li>
                  )
                )}
              </ul>
            </div>
          )}
          <div className="flex flex-col">
            <div className="flex flex-col divide-x divide-gray-200 md:flex-row">
              <SingleDatePicker
                id="datePicker1"
                currentMonth={currentMonth1}
                currentYear={currentYear1}
                selected={selected}
                setCurrentMonth={handleSetCurrentMonth}
                setCurrentYear={handleSetCurrentYear}
                setSelected={handleSetSelected}
              />
              {!asSingle && (
                <SingleDatePicker
                  id="datePicker2"
                  currentMonth={currentMonth2}
                  currentYear={currentYear2}
                  selected={selected}
                  setCurrentMonth={handleSetCurrentMonth}
                  setCurrentYear={handleSetCurrentYear}
                  setSelected={handleSetSelected}
                />
              )}
            </div>
            {showFooter && (
              <div
                className={clsx(
                  "flex flex-col space-y-4 border-t border-gray-200 px-6 py-4 md:flex-row md:space-y-0",
                  !asSingle && useRange ? "justify-between" : "justify-end"
                )}
              >
                {!asSingle && useRange && (
                  <div className="flex items-center space-x-5">
                    <div className="flex w-full items-center space-x-2 text-sm font-semibold md:w-auto">
                      <span className="flex-1 rounded-md bg-gray-100 p-2 text-center md:flex-none">
                        18/02/2021
                      </span>
                      <span className="mt-0.5 h-0.5 w-3 bg-gray-400"></span>
                      <span className="flex-1 rounded-md bg-gray-100 p-2 text-center md:flex-none">
                        18/03/2021
                      </span>
                    </div>
                    <span className="hidden text-sm font-semibold md:block">
                      30 days <span className="text-gray-400">selected</span>
                    </span>
                  </div>
                )}

                <div className="flex space-x-2">
                  <button
                    type="button"
                    className="flex h-9 w-full items-center justify-center rounded-md px-3"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="flex h-9 w-full items-center justify-center rounded-md bg-green-600 px-3 text-white"
                    onClick={handleApply}
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default DatePicker
