import { useState, useRef, useEffect } from "react"
import {
  DateRangeType,
  IdDatePickerState,
  NullableDate,
  SingleDatePicker,
} from "../molecules"
import {
  countDatesInRange,
  formatDateToYYYYMMDD,
} from "../../utilities/dateUtils"

interface Props {
  showShortcuts?: boolean
  showFooter?: boolean
  defaultValue?: DateRangeType
  value?: DateRangeType
  onChange?: (v: DateRangeType) => void
}

const DateRangePicker: React.FC<Props> = ({
  defaultValue,
  value,
  showShortcuts,
  showFooter,
  onChange,
}) => {
  if (
    defaultValue === null ||
    (defaultValue && !isDateRange(defaultValue)) ||
    value === null ||
    (value && !isDateRange(value))
  )
    throw new Error("The value structure must be of type DateRangeType")

  const datePickerContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const [openDatePicker, setOpenDatePicker] = useState(false)
  const [datePickerClickCount, setDatePickerCount] = useState(1)
  const [selected, setSelected] = useState<DateRangeType>(
    value ? value : defaultValue ?? { startDate: null, endDate: null }
  )

  const [date1, setDate1] = useState<Date>(new Date())
  const [currentMonth1, setCurrentMonth1] = useState(date1.getMonth())
  const [currentYear1, setCurrentYear1] = useState(date1.getFullYear())

  const [date2, setDate2] = useState<Date>(
    new Date(currentYear1, currentMonth1 + 1)
  )
  const [currentMonth2, setCurrentMonth2] = useState(date2.getMonth())
  const [currentYear2, setCurrentYear2] = useState(date2.getFullYear())

  useEffect(() => {
    console.log("rendered date-range-picker")
  })

  function isNullableDate(value: NullableDate) {
    return value === null || value instanceof Date
  }

  function isDateRange(value: DateRangeType) {
    return (
      typeof value === "object" &&
      "startDate" in value &&
      isNullableDate(value.startDate) &&
      "endDate" in value &&
      isNullableDate(value.endDate)
    )
  }

  function handleFocus() {
    setOpenDatePicker(true)

    if (showFooter) {
      // adjust selected
      // setSelected(value)

      const resetDate1 = value instanceof Date ? value : new Date()
      adjustDatePicker1(resetDate1)

      adjustDatePicker2(
        new Date(resetDate1.getFullYear(), resetDate1.getMonth() + 1)
      )
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

      if (new Date(year, month) >= new Date(currentYear2, currentMonth2))
        adjustDatePicker2(new Date(year, month + 1))
    }

    if (idComp === "datePicker2") {
      setCurrentMonth2(month)

      if (new Date(year, month) <= new Date(currentYear1, currentMonth1))
        adjustDatePicker1(new Date(year, month - 1))
    }
  }

  function handleSetCurrentYear(
    year: number,
    month: number,
    idComp: IdDatePickerState
  ) {
    if (idComp === "datePicker1") {
      setCurrentYear1(year)

      if (new Date(year, month) >= new Date(currentYear2, currentMonth2))
        adjustDatePicker2(new Date(year, month + 1))
    }

    if (idComp === "datePicker2") {
      setCurrentYear2(year)

      if (new Date(year, month) <= new Date(currentYear1, currentMonth1))
        adjustDatePicker1(new Date(year, month - 1))
    }
  }

  /**
   * @param {Date} d - date from datePicker2 / oriValue(if exist) / today
   * @return {void}
   */
  function adjustDatePicker1(d: Date): void {
    setDate1(d)
    setCurrentMonth1(d.getMonth())
    setCurrentYear1(d.getFullYear())
  }

  /**
   * @param {Date} d - date from datePicker1
   * @return {void}
   */
  function adjustDatePicker2(d: Date): void {
    setDate2(d)
    setCurrentMonth2(d.getMonth())
    setCurrentYear2(d.getFullYear())
  }

  function handleSetSelected(d: Date) {
    let newDateRange: DateRangeType = {
      startDate: datePickerClickCount === 1 ? d : selected.startDate,
      endDate: datePickerClickCount === 2 ? d : null,
    }

    // re-sort
    if (
      datePickerClickCount === 2 &&
      newDateRange.startDate &&
      newDateRange.endDate &&
      newDateRange.endDate < newDateRange.startDate
    ) {
      newDateRange = {
        startDate: newDateRange.endDate,
        endDate: newDateRange.startDate,
      }
    }

    if (showFooter) {
      setSelected(newDateRange)

      if (datePickerClickCount === 2) setDatePickerCount(1)
      else setDatePickerCount(2)
    } else {
      setSelected(newDateRange)

      if (onChange) onChange(newDateRange)

      if (datePickerClickCount === 2) {
        setDatePickerCount(1)

        inputRef.current?.blur()
      } else setDatePickerCount(2)
    }
  }

  function handleCancel() {
    // setSelected(value)
    inputRef.current?.blur()
  }

  function handleApply() {
    if (selected instanceof Date) {
      if (onChange) onChange(selected)
      inputRef.current?.blur()
    }
  }

  let complateValue = []

  if (value && value.startDate) {
    complateValue.push(formatDateToYYYYMMDD(value.startDate))
  }

  if (value && value.endDate) {
    complateValue.push(formatDateToYYYYMMDD(value.endDate))
  }

  return (
    <div className="relative mb-10">
      <input
        ref={inputRef}
        type="text"
        className="block h-9 w-full rounded-md border border-gray-300 bg-gray-50 p-2 text-sm transition focus:border-green-500 focus:ring-green-500"
        value={complateValue.join(" - ")}
        readOnly
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {openDatePicker && (
        <div
          ref={datePickerContainerRef}
          className="absolute z-10 mt-1.5 flex flex-col rounded-md border border-gray-300 bg-white shadow-md lg:flex-row"
        >
          {showShortcuts && (
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
              <SingleDatePicker
                id="datePicker2"
                currentMonth={currentMonth2}
                currentYear={currentYear2}
                selected={selected}
                setCurrentMonth={handleSetCurrentMonth}
                setCurrentYear={handleSetCurrentYear}
                setSelected={handleSetSelected}
              />
            </div>
            {showFooter && (
              <div className="flex flex-col justify-between space-y-4 border-t border-gray-200 px-6 py-4 md:flex-row md:space-y-0">
                <div className="flex items-center space-x-5">
                  <div className="flex w-full items-center space-x-2 text-sm font-semibold md:w-auto">
                    <span className="flex-1 rounded-md bg-gray-100 p-2 text-center md:flex-none">
                      {selected.startDate
                        ? formatDateToYYYYMMDD(selected.startDate)
                        : "YYYY-MM-DD"}
                    </span>
                    <span className="mt-0.5 h-0.5 w-3 bg-gray-400"></span>
                    <span className="flex-1 rounded-md bg-gray-100 p-2 text-center md:flex-none">
                      {selected.endDate
                        ? formatDateToYYYYMMDD(selected.endDate)
                        : "YYYY-MM-DD"}
                    </span>
                  </div>
                  {selected.startDate && selected.endDate && (
                    <span className="hidden text-sm font-semibold md:block">
                      {countDatesInRange(selected.startDate, selected.endDate)}{" "}
                      days <span className="text-gray-400">selected</span>
                    </span>
                  )}
                </div>

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

export default DateRangePicker
