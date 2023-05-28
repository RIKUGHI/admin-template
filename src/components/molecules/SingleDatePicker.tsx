import { useEffect, useState } from "react"
import {
  DateItem,
  MonthYearSwitcher,
  PrevNextButton,
} from "../atoms/datepickerParts"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import clsx from "clsx"

export type IdDatePickerState = "datePicker1" | "datePicker2"
export type DatePickerNavigationType = "PREV" | "NEXT"
type TabState = "MONTH" | "YEAR" | null

interface Props {
  /** indications for the component itself */
  id: IdDatePickerState
  date: Date
  currentMonth: number
  currentYear: number
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
}

const SingleDatePicker: React.FC<Props> = ({
  id,
  date,
  currentMonth,
  currentYear,
  setCurrentMonth,
  setCurrentYear,
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

  function handlePrevNext(type: DatePickerNavigationType) {
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
      } else {
        setCurrentMonth(newCurrentMonth, currentYear, id)
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
                  <DateItem key={key} date={lostDate} isSun={isSun} disabled />
                )
                key++
              }

              //getting all dates of the month
              for (let i = 1; i <= lastDateofMonth; i++) {
                let day = new Date(currentYear, currentMonth, i).getDay()

                let isSun = day === 0
                let isToday =
                  i === date.getDate() &&
                  currentMonth === new Date().getMonth() &&
                  currentYear === new Date().getFullYear()

                dateComps.push(
                  <DateItem
                    key={key}
                    date={i}
                    isToday={isToday}
                    isSun={isSun}
                  />
                )
                key++
              }

              //getting first dates of next month
              for (let i = lastDayofMonth; i < 6; i++) {
                dateComps.push(
                  <DateItem key={key} date={i - lastDayofMonth + 1} disabled />
                )
                key++
              }

              return dateComps
            })()}

            {/* <span className="flex h-10 w-10 items-center justify-center rounded-l-lg bg-green-600 font-semibold text-white">
          18
        </span>
        <span className="flex h-10 w-10 items-center justify-center rounded-none bg-green-50 font-semibold text-green-600">
          19
        </span>
        <span className="flex h-10 w-10 items-center justify-center rounded-none rounded-r-md bg-green-600 font-semibold text-white">
          20
        </span> */}
          </>
        )}
      </div>
    </div>
  )
}

export default SingleDatePicker
