import clsx from "clsx"
import { FC, useEffect, useRef, useState } from "react"
import { NullableDate, IdDatePickerState, SingleDatePicker } from "../molecules"

interface Props {
  value?: NullableDate
  onChange?: (v: NullableDate) => void
}

const DatePicker: FC<Props> = ({ value, onChange }) => {
  if (value && !isNullableDate(value))
    throw new Error("The value structure must be of type Date or Null")

  const datePickerContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const [openDatePicker, setOpenDatePicker] = useState(false)
  const [selected, setSelected] = useState<NullableDate>(value ?? null)

  // adjust date
  const [date1, setDate1] = useState<Date>(
    selected instanceof Date ? selected : new Date()
  )
  const [currentMonth1, setCurrentMonth1] = useState(date1.getMonth())
  const [currentYear1, setCurrentYear1] = useState(date1.getFullYear())

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

  function isNullableDate(oriValue: NullableDate) {
    return oriValue === null || oriValue instanceof Date
  }

  function handleFocus() {
    setOpenDatePicker(true)

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

  function handleSetCurrentMonth(
    month: number,
    year: number,
    idComp: IdDatePickerState
  ) {
    setCurrentMonth1(month)
  }

  function handleSetCurrentYear(
    year: number,
    month: number,
    idComp: IdDatePickerState
  ) {
    setCurrentYear1(year)
  }

  function handleSetSelected(v: Date) {
    setSelected(v)
    if (onChange) onChange(v)
    inputRef.current?.blur()
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
        value={value instanceof Date ? formatDateToYYYYMMDD(value) : ""}
        readOnly
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {openDatePicker && (
        <div
          ref={datePickerContainerRef}
          className="absolute z-10 mt-1.5 flex flex-col rounded-md border border-gray-300 bg-white shadow-md lg:flex-row"
        >
          <SingleDatePicker
            id="datePicker1"
            currentMonth={currentMonth1}
            currentYear={currentYear1}
            selected={selected}
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
