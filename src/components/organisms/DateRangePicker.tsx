import { useEffect, useRef, useState } from "react"
import {
  countDatesInRange,
  formatDateToYYYYMMDD,
  isDateRange,
} from "../../utilities/dateUtils"
import {
  DateRangeConfirmButton,
  PreviewDate,
  ShortcutItem,
} from "../atoms/datepickerParts"
import {
  DateRangeType,
  IdDatePickerState,
  SingleDatePicker,
} from "../molecules"

type ShortcutType = {
  label: string
  range: DateRangeType
}
interface Props {
  defaultValue?: DateRangeType
  value?: DateRangeType
  minDate?: Date
  maxDate?: Date
  displayFormat?: (d: Date) => string
  placeholder?: string
  separator?: string
  /** default is today if true */
  shortcutList?: boolean | ShortcutType[]
  showFooter?: boolean
  onChange?: (v: DateRangeType) => void
}

const DateRangePicker: React.FC<Props> = ({
  defaultValue,
  value,
  minDate,
  maxDate,
  displayFormat,
  placeholder,
  separator,
  shortcutList,
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

  function handleShortCut(d: DateRangeType) {
    if (d === null || !isDateRange(d))
      throw new Error("The value structure must be of type DateRangeType")

    const sortedDateRange = sortAndResetDateRange(d)

    setSelected(sortedDateRange)
    adjustDateRangePicker(sortedDateRange)

    if (!showFooter) {
      setInputValue(sortedDateRange)
      if (onChange) onChange(sortedDateRange)
      inputRef.current?.blur()
    }
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

      if (dateValue)
        mergedValue.push(
          displayFormat
            ? displayFormat(dateValue)
            : formatDateToYYYYMMDD(dateValue)
        )
    }

    return mergedValue.join(separator ?? " ~ ")
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
          className="top-to-bottom absolute z-10 flex flex-col rounded-md border border-gray-300 bg-white md:flex-row"
        >
          {shortcutList &&
            (() => {
              const defaultShortcutList: ShortcutType[] = [
                {
                  label: "Today",
                  range: {
                    startDate: new Date(),
                    endDate: new Date(),
                  },
                },
              ]

              if (typeof shortcutList === "object" && shortcutList.length > 0)
                defaultShortcutList.push(...shortcutList)

              return (
                <div className="hidden w-full border-b border-gray-200 py-4 sm:block md:w-36 md:border-b-0 md:border-r md:py-6">
                  <ul className="grid grid-cols-2 text-xs md:grid-cols-1">
                    {defaultShortcutList.map((shortcut, i) => (
                      <li key={i} className="rounded-md">
                        <ShortcutItem
                          key={i}
                          label={shortcut.label}
                          onClik={() => handleShortCut(shortcut.range)}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })()}
          <div className="flex flex-col">
            <div className="flex flex-col divide-x divide-gray-200 sm:flex-row">
              <SingleDatePicker
                id="datePicker1"
                currentMonth={currentMonth1}
                currentYear={currentYear1}
                selected={selected}
                minDate={minDate}
                maxDate={maxDate}
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
                minDate={minDate}
                maxDate={maxDate}
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
                    <PreviewDate
                      date={selected.startDate}
                      placeholder={placeholder}
                      displayFormat={displayFormat}
                    />
                    <span className="mt-0.5 h-0.5 w-3 bg-gray-400"></span>
                    <PreviewDate
                      date={selected.endDate}
                      placeholder={placeholder}
                      displayFormat={displayFormat}
                    />
                  </div>
                  {selected.startDate && selected.endDate && (
                    <span className="hidden text-sm font-semibold md:block">
                      {countDatesInRange(selected.startDate, selected.endDate)}{" "}
                      days <span className="text-gray-400">selected</span>
                    </span>
                  )}
                </div>

                <div className="flex space-x-2">
                  <DateRangeConfirmButton
                    label="Cancel"
                    onClick={handleCancel}
                  />
                  <DateRangeConfirmButton
                    label="Apply"
                    disabled={!selected.startDate || !selected.endDate}
                    onClick={handleApply}
                  />
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
