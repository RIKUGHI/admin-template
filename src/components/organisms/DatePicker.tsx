import { FC, useEffect, useRef, useState } from "react"
import {
  formatDateToYYYYMMDD,
  isNullableDate,
  isSameDate,
} from "../../utilities/dateUtils"
import { NullableDate, SingleDatePicker } from "../molecules"

interface Props {
  defaultValue?: NullableDate
  value?: NullableDate
  minDate?: Date
  maxDate?: Date
  displayFormat?: (d: Date) => string
  onChange?: (v: NullableDate) => void
}

const DatePicker: FC<Props> = ({
  defaultValue,
  value,
  minDate,
  maxDate,
  displayFormat,
  onChange,
}) => {
  if (
    (defaultValue && !isNullableDate(defaultValue)) ||
    (value && !isNullableDate(value))
  )
    throw new Error(
      "The defaultValue or value structure must be of type NullableDate"
    )

  const datePickerContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const [openDatePicker, setOpenDatePicker] = useState(false)
  const [selected, setSelected] = useState<NullableDate>(
    value ? value : defaultValue ?? null
  )

  const [date, setDate] = useState<Date>(
    selected instanceof Date ? selected : new Date()
  )
  const [currentMonth, setCurrentMonth] = useState(date.getMonth())
  const [currentYear, setCurrentYear] = useState(date.getFullYear())

  useEffect(() => {
    if (value && selected && !isSameDate(value, selected)) {
      const adjustDate = value

      setSelected(adjustDate)
      setDate(adjustDate)
      setCurrentMonth(adjustDate.getMonth())
      setCurrentYear(adjustDate.getFullYear())
    }
  }, [value])

  function handleFocus() {
    setOpenDatePicker(true)
    setTimeout(() => {
      // auto directions
      datePickerContainerRef.current?.classList.replace("hidden", "flex")
      datePickerContainerRef.current?.classList.add(
        datePickerContainerRef.current.getBoundingClientRect().bottom + 10 >
          window.innerHeight
          ? "bottom-to-top"
          : "top-to-bottom"
      )
    }, 0)

    window.onmousedown = (e) => {
      const isClickedInsideDatePickerContainer =
        datePickerContainerRef.current?.contains(e.target as Node)

      if (isClickedInsideDatePickerContainer) e.preventDefault()
    }
  }

  function handleBlur() {
    setOpenDatePicker(false)

    window.onmousedown = null
  }

  function handleSetCurrentMonth(month: number) {
    setCurrentMonth(month)
  }

  function handleSetCurrentYear(year: number) {
    setCurrentYear(year)
  }

  function handleSetSelected(d: Date) {
    if (!selected || (selected && !isSameDate(selected, d))) {
      setSelected(d)
      if (onChange) onChange(d)
    }
    inputRef.current?.blur()
  }

  return (
    <div className="relative mb-10">
      <input
        ref={inputRef}
        type="text"
        className="block h-9 w-full rounded-md border border-gray-300 bg-gray-50 p-2 text-sm transition focus:border-green-500 focus:ring-green-500"
        value={
          selected instanceof Date
            ? displayFormat
              ? displayFormat(selected)
              : formatDateToYYYYMMDD(selected)
            : ""
        }
        readOnly
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {openDatePicker && (
        <div
          ref={datePickerContainerRef}
          className="absolute z-10 hidden flex-col rounded-md border border-gray-300 bg-white lg:flex-row"
        >
          <SingleDatePicker
            id="datePicker1"
            currentMonth={currentMonth}
            currentYear={currentYear}
            selected={selected}
            minDate={minDate}
            maxDate={maxDate}
            setCurrentMonth={handleSetCurrentMonth}
            setCurrentYear={handleSetCurrentYear}
            setSelected={handleSetSelected}
          />
        </div>
      )}
    </div>
  )
}

export default DatePicker
