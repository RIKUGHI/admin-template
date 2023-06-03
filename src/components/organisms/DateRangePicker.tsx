import clsx from "clsx"
import { useEffect, useRef, useState } from "react"
import {
  countDatesInRange,
  formatDateToYYYYMMDD,
  isDateRange,
} from "../../utilities/dateUtils"
import {
  DateRangeType,
  IdDatePickerState,
  SingleDatePicker,
} from "../molecules"

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
  /**
   * STE is Start to End
   * ETS is End to Start
   */
  const [directionSelectedRange, setDirectionSelectedRange] = useState<
    "STE" | "ETS"
  >("STE")
  const [hasMouseEnteredDate, setHasMouseEnteredDate] = useState(false)
  const [selected, setSelected] = useState<DateRangeType>(
    value
      ? sortAndResetDateRange(value)
      : defaultValue
      ? sortAndResetDateRange(defaultValue)
      : { startDate: null, endDate: null }
  )
  const [inputValue, setInputValue] = useState<DateRangeType>(selected)

  const [date1, setDate1] = useState<Date>(selected.startDate ?? new Date())
  const [currentMonth1, setCurrentMonth1] = useState(date1.getMonth())
  const [currentYear1, setCurrentYear1] = useState(date1.getFullYear())

  const [date2, setDate2] = useState<Date>(
    getAdjustedDatePicker2Value(selected)
  )
  const [currentMonth2, setCurrentMonth2] = useState(date2.getMonth())
  const [currentYear2, setCurrentYear2] = useState(date2.getFullYear())

  useEffect(() => {
    // adjust for controlled
    if (value) {
      const sortedDateRange = sortAndResetDateRange(value)
      setSelected(sortedDateRange)
      setInputValue(sortedDateRange)
      adjustDateRangePicker(sortedDateRange)
    }
  }, [value?.endDate])

  function handleFocus() {
    setOpenDatePicker(true)

    // adjust for uncontrolled / controlled
    adjustDateRangePicker(selected)

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

  function adjustDateRangePicker(d: DateRangeType) {
    const adjustDate1 = d.startDate ?? new Date()
    adjustDatePicker1(adjustDate1)
    adjustDatePicker2(getAdjustedDatePicker2Value(d))
  }

  function getAdjustedDatePicker2Value(d: DateRangeType) {
    const adjustDate = d.startDate ?? new Date()

    return !d.endDate ||
      (adjustDate.getMonth() === d.endDate.getMonth() &&
        adjustDate.getFullYear() === d.endDate.getFullYear())
      ? new Date(adjustDate.getFullYear(), adjustDate.getMonth() + 1)
      : d.endDate
  }

  /**
   * @param {Date} d - date from datePicker2 / selected / value / today
   * @return {void}
   */
  function adjustDatePicker1(d: Date): void {
    setDate1(d)
    setCurrentMonth1(d.getMonth())
    setCurrentYear1(d.getFullYear())
  }

  /**
   * @param {Date} d - date from datePicker1 / selected / value / today
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

    if (datePickerClickCount === 2) {
      newDateRange = sortAndResetDateRange(newDateRange)

      setDatePickerCount(1)
      setDirectionSelectedRange("STE")
      setHasMouseEnteredDate(false)

      if (!showFooter) inputRef.current?.blur()
    } else setDatePickerCount(2)

    if (!hasMouseEnteredDate) setSelected(newDateRange)

    if (!showFooter) {
      setInputValue(hasMouseEnteredDate ? selected : newDateRange)
      if (onChange) onChange(hasMouseEnteredDate ? selected : newDateRange)
    }
  }

  function handleMouseEnterDate(d: Date) {
    if (datePickerClickCount === 2) {
      let newDateRange: DateRangeType | null = null

      if (directionSelectedRange === "STE" && selected.startDate) {
        if (d < selected.startDate) {
          newDateRange = {
            startDate: d,
            endDate: selected.startDate,
          }
          setDirectionSelectedRange("ETS")
        } else {
          newDateRange = {
            startDate: selected.startDate,
            endDate: d,
          }
        }
      }

      if (directionSelectedRange === "ETS" && selected.endDate) {
        if (d > selected.endDate) {
          newDateRange = {
            startDate: selected.endDate,
            endDate: d,
          }
          setDirectionSelectedRange("STE")
        } else {
          newDateRange = {
            startDate: d,
            endDate: selected.endDate,
          }
        }
      }

      if (newDateRange) setSelected(newDateRange)
      setHasMouseEnteredDate(true)
    }
  }

  function handleCancel() {
    inputRef.current?.blur()
  }

  function handleApply() {
    setInputValue(selected)
    if (onChange) onChange(selected)
    inputRef.current?.blur()
  }

  /**
   * Sorts the start and end dates of a date range and resets the hours to 0 (midnight).
   *
   * @param {DateRangeType} dateRange - The date range to sort and reset hours.
   * @returns {DateRangeType} The date range with sorted start and end dates, and hours reset to 0.
   */
  function sortAndResetDateRange({
    startDate,
    endDate,
  }: DateRangeType): DateRangeType {
    if (startDate) startDate.setHours(0, 0, 0, 0)
    if (endDate) endDate.setHours(0, 0, 0, 0)

    if (!startDate || !endDate) {
      if (!startDate && endDate)
        return {
          startDate: endDate,
          endDate: null,
        }

      return { startDate, endDate }
    }

    if (startDate > endDate) [startDate, endDate] = [endDate, startDate]

    return { startDate, endDate }
  }

  function displayDateRange(d: DateRangeType): string {
    let mergedValue = []

    for (const key in d) {
      const dateValue = d[key as keyof DateRangeType]

      if (dateValue) mergedValue.push(formatDateToYYYYMMDD(dateValue))
    }

    return mergedValue.join(" ~ ")
  }

  return (
    <div className="relative mb-10">
      <input
        ref={inputRef}
        type="text"
        className="block h-9 w-full rounded-md border border-gray-300 bg-gray-50 p-2 text-sm transition focus:border-green-500 focus:ring-green-500"
        value={displayDateRange(inputValue)}
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
                onMouseEnterDate={handleMouseEnterDate}
              />
              <SingleDatePicker
                id="datePicker2"
                currentMonth={currentMonth2}
                currentYear={currentYear2}
                selected={selected}
                setCurrentMonth={handleSetCurrentMonth}
                setCurrentYear={handleSetCurrentYear}
                setSelected={handleSetSelected}
                onMouseEnterDate={handleMouseEnterDate}
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
                    className={clsx(
                      "flex h-9 w-full items-center justify-center rounded-md px-3",
                      !selected.startDate || !selected.endDate
                        ? "bg-gray-300 text-white"
                        : "bg-green-600 text-white"
                    )}
                    onClick={handleApply}
                    disabled={!selected.startDate || !selected.endDate}
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
