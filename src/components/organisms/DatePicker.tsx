import clsx from "clsx"
import { FC, useEffect, useState } from "react"
import { IdDatePickerState, SingleDatePicker } from "../molecules"

interface Props {
  asSingle?: boolean
  useRange?: boolean
  /** can be used if useRange is true. */
  showShortcuts?: boolean
  showFooter?: boolean
}

const DatePicker: FC<Props> = ({
  asSingle = true,
  useRange,
  showShortcuts,
  showFooter,
}) => {
  const [date1, setDate1] = useState(new Date())
  const [currentMonth1, setCurrentMonth1] = useState(date1.getMonth())
  const [currentYear1, setCurrentYear1] = useState(date1.getFullYear())

  const [date2, setDate2] = useState(new Date())
  const [currentMonth2, setCurrentMonth2] = useState(date2.getMonth())
  const [currentYear2, setCurrentYear2] = useState(date2.getFullYear())

  useEffect(() => {
    console.log("rendered full datepicker")

    // add 1 month for first mounted
    handleNextMonthDatePicker2(currentMonth1)
  }, [])

  function handlePrevMonthDatePicker1(monthDatePicker2: number) {
    const date = new Date(currentYear1, monthDatePicker2 - 1)

    setDate1(date)
    setCurrentMonth1(date.getMonth())
    setCurrentYear1(date.getFullYear())
  }

  function handleNextMonthDatePicker2(monthDatePicker1: number) {
    const date = new Date(currentYear2, monthDatePicker1 + 1)

    setDate2(date)
    setCurrentMonth2(date.getMonth())
    setCurrentYear2(date.getFullYear())
  }

  function handleSetCurrentMonth(
    month: number,
    year: number,
    idComp: IdDatePickerState
  ) {
    if (idComp === "datePicker1") {
      setCurrentMonth1(month)

      if (new Date(year, month) >= new Date(currentYear2, currentMonth2))
        handleNextMonthDatePicker2(month)
    }

    if (idComp === "datePicker2") {
      setCurrentMonth2(month)

      if (new Date(year, month) <= new Date(currentYear1, currentMonth1)) {
        handlePrevMonthDatePicker1(month)
      }
    }
  }

  function handleSetCurrentYear(
    year: number,
    month: number,
    idComp: IdDatePickerState
  ) {
    if (idComp === "datePicker1") {
      setCurrentYear1(year)

      if (new Date(year, month) >= new Date(currentYear2, currentMonth2)) {
        console.log("next")
        const date = new Date(year, month)

        setDate2(date)
        setCurrentMonth2(date.getMonth())
        setCurrentYear2(date.getFullYear())
      }
    }

    if (idComp === "datePicker2") {
      setCurrentYear2(year)
    }
  }

  return (
    <div className="relative mb-10">
      <input
        type="text"
        className="block h-9 w-full rounded-md border border-gray-300 bg-gray-50 p-2 text-sm transition focus:border-green-500 focus:ring-green-500"
      />
      <div className="absolute z-10 mt-1.5 flex flex-col rounded-md border border-gray-300 bg-white shadow-md lg:flex-row">
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
          <div className="flex divide-x divide-gray-200">
            <SingleDatePicker
              id="datePicker1"
              date={date1}
              currentMonth={currentMonth1}
              currentYear={currentYear1}
              setCurrentMonth={handleSetCurrentMonth}
              setCurrentYear={handleSetCurrentYear}
            />
            {!asSingle && (
              <SingleDatePicker
                id="datePicker2"
                date={date2}
                currentMonth={currentMonth2}
                currentYear={currentYear2}
                setCurrentMonth={handleSetCurrentMonth}
                setCurrentYear={handleSetCurrentYear}
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
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="flex h-9 w-full items-center justify-center rounded-md bg-green-600 px-3 text-white"
                >
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DatePicker
