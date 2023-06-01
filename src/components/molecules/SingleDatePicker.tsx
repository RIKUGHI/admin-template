import { useEffect, useState } from "react"
import {
  DateItem,
  MonthYearSwitcher,
  PrevNextButton,
  SelectedState,
} from "../atoms/datepickerParts"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import clsx from "clsx"

export type IdDatePickerState = "datePicker1" | "datePicker2"
export type DatePickerNavigationType = "PREV" | "NEXT"
type TabState = "MONTH" | "YEAR" | null

export type NullableDate = null | Date
export type DateRangeType = {
  startDate: NullableDate
  endDate: NullableDate
}

interface Props {
  /** indications for the component itself */
  id: IdDatePickerState
  currentMonth: number
  currentYear: number
  selected?: NullableDate | DateRangeType
  setCurrentMonth: (
    month: number,
    year: number,
    idComp: IdDatePickerState
  ) => void
  setCurrentYear: (
    year: number,
    month: number,
    idComp: IdDatePickerState
  ) => void
  setSelected: (v: Date) => void
}

const SingleDatePicker: React.FC<Props> = ({
  id,
  currentMonth,
  currentYear,
  selected,
  setCurrentMonth,
  setCurrentYear,
  setSelected,
}) => {
  const days = ["Su", "Mo", "Tu", "We", "Th", "Fri", "Sa"]
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ]

  const [activeTab, setActiveTab] = useState<TabState>(null)

  const numberofYearsShown = 12
  const [stackedYearIntervals, setStackedYearIntervals] = useState(0)

  let lastDateofMonth = new Date(currentYear, currentMonth + 1, 0).getDate()

  let firstDayofMonth = new Date(currentYear, currentMonth, 1).getDay()
  let lastDayofMonth = new Date(
    currentYear,
    currentMonth,
    lastDateofMonth
  ).getDay()

  let lostMonth = new Date(currentYear, currentMonth, 0)
  let lostMonthIndex = lostMonth.getMonth()
  let lastDateofLostMonth = lostMonth.getDate()

  useEffect(() => {
    console.log("render single datepicker")
  })

  function handleToggleTab(v: TabState) {
    // reset stacked year intervals to 0
    if (v === "YEAR") setStackedYearIntervals(0)

    setActiveTab((prev) => (prev === v ? null : v))
  }

  function handlePrevNext(
    type: DatePickerNavigationType,
    cb?: (year: number, month: number) => void
  ) {
    if (!activeTab) {
      const newCurrentMonth = currentMonth + (type === "PREV" ? -1 : 1)

      if (newCurrentMonth < 0 || newCurrentMonth > 11) {
        const newDate = new Date(
          currentYear,
          newCurrentMonth,
          new Date().getDate()
        )

        setCurrentMonth(newDate.getMonth(), newDate.getFullYear(), id)
        setCurrentYear(newDate.getFullYear(), newDate.getMonth(), id)

        if (cb) cb(newDate.getFullYear(), newDate.getMonth())
      } else {
        setCurrentMonth(newCurrentMonth, currentYear, id)

        if (cb) cb(currentYear, newCurrentMonth)
      }
    }

    if (activeTab === "YEAR") {
      setStackedYearIntervals(
        (prev) =>
          prev + (type === "PREV" ? -numberofYearsShown : numberofYearsShown)
      )
    }
  }

  function handleActiveMonth(month: number) {
    setCurrentMonth(month, currentYear, id)
    setActiveTab(null)
  }

  function handleActiveYear(year: number) {
    setCurrentYear(year, currentMonth, id)
    setActiveTab(null)
  }

  function getSelectedType(d: Date): SelectedState {
    if (selected instanceof Date)
      return isSameDate(selected, d) ? "SINGLE" : undefined

    if (selected !== null && typeof selected === "object") {
      const { startDate, endDate } = selected

      if (
        startDate instanceof Date &&
        endDate instanceof Date &&
        isSameDate(startDate, d) &&
        isSameDate(endDate, d)
      )
        return "SINGLE"

      if (startDate instanceof Date && isSameDate(startDate, d)) return "START"
      else if (endDate instanceof Date && isSameDate(endDate, d)) return "END"
    }

    return undefined
  }

  function isPreSelected(d: Date) {
    if (selected instanceof Date) return false

    if (
      selected !== null &&
      typeof selected === "object" &&
      selected.startDate instanceof Date &&
      selected.endDate instanceof Date &&
      selected.startDate < d &&
      d < selected.endDate
    )
      return true

    return false
  }

  function isSameDate(date1: Date, date2: Date) {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    )
  }

  return (
    <div className="flex flex-col p-5">
      <div className="flex items-center justify-between space-x-2 rounded-md border border-gray-200 px-2 py-1.5">
        {activeTab !== "MONTH" &&
          (() => {
            const isYearNegative =
              activeTab === "YEAR" && currentYear + stackedYearIntervals < 0

            return (
              <PrevNextButton
                icon={FaChevronLeft}
                isYearNegative={isYearNegative}
                onClick={() => handlePrevNext("PREV")}
              />
            )
          })()}
        <MonthYearSwitcher
          label={months[currentMonth]}
          isNavigator
          active={activeTab === "MONTH"}
          onClick={() => handleToggleTab("MONTH")}
        />
        <MonthYearSwitcher
          label={currentYear}
          isNavigator
          active={activeTab === "YEAR"}
          onClick={() => handleToggleTab("YEAR")}
        />
        {activeTab !== "MONTH" && (
          <PrevNextButton
            icon={FaChevronRight}
            onClick={() => handlePrevNext("NEXT")}
          />
        )}
      </div>

      <div
        className={clsx(
          "grid w-[calc(40px*7)] text-center text-xs text-gray-900",
          activeTab === "MONTH" || activeTab === "YEAR"
            ? "mt-3 grid-cols-2 gap-2"
            : "grid-cols-7"
        )}
      >
        {activeTab === "MONTH" &&
          months.map((month, i) => (
            <MonthYearSwitcher
              key={i}
              label={month}
              onClick={() => handleActiveMonth(i)}
            />
          ))}

        {activeTab === "YEAR" &&
          Array.from({ length: numberofYearsShown }).map((_, i) => {
            const year = currentYear + i + stackedYearIntervals
            const isYearNegative = year < 0

            return (
              <MonthYearSwitcher
                key={i}
                label={year}
                isYearNegative={isYearNegative}
                onClick={() => handleActiveYear(year)}
              />
            )
          })}

        {!activeTab && (
          <>
            {days.map((day, i) => (
              <span
                key={i}
                className="flex h-10 w-10 items-center justify-center font-semibold"
              >
                {day}
              </span>
            ))}

            {(() => {
              let dateComps: JSX.Element[] = []
              let key = 0

              //getting all last dates of lost month
              for (let i = firstDayofMonth; i > 0; i--) {
                let lostDate = lastDateofLostMonth - i + 1
                let day = new Date(
                  currentYear,
                  lostMonthIndex,
                  lostDate
                ).getDay()

                let isSun = day === 0

                dateComps.push(
                  <DateItem
                    key={key}
                    date={lostDate}
                    isSun={isSun}
                    disabled
                    onClick={() =>
                      handlePrevNext("PREV", (year, month) => {
                        setSelected(new Date(year, month, lostDate))
                      })
                    }
                  />
                )
                key++
              }

              //getting all dates of the month
              for (let i = 1; i <= lastDateofMonth; i++) {
                let day = new Date(currentYear, currentMonth, i).getDay()

                let isSun = day === 0
                let isToday =
                  i === new Date().getDate() &&
                  currentMonth === new Date().getMonth() &&
                  currentYear === new Date().getFullYear()

                dateComps.push(
                  <DateItem
                    key={key}
                    date={i}
                    isToday={isToday}
                    isSun={isSun}
                    preSelected={isPreSelected(
                      new Date(currentYear, currentMonth, i)
                    )}
                    selectedType={getSelectedType(
                      new Date(currentYear, currentMonth, i)
                    )}
                    onClick={() =>
                      setSelected(new Date(currentYear, currentMonth, i))
                    }
                  />
                )
                key++
              }

              //getting first dates of next month
              for (let i = lastDayofMonth; i < 6; i++) {
                const date = i - lastDayofMonth + 1

                dateComps.push(
                  <DateItem
                    key={key}
                    date={date}
                    disabled
                    onClick={() =>
                      handlePrevNext("NEXT", (year, month) => {
                        setSelected(new Date(year, month, date))
                      })
                    }
                  />
                )
                key++
              }

              return dateComps
            })()}
          </>
        )}
      </div>
    </div>
  )
}

export default SingleDatePicker
