import clsx from "clsx"
import { number } from "prop-types"
import React, { FC, useEffect, useState } from "react"
import { IconType } from "react-icons"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"

interface Props {
  asSingle?: boolean
  useRange?: boolean
  /** can be used if useRange is true. */
  showShortcuts?: boolean
  showFooter?: boolean
}

type TabState = "MONTH" | "YEAR" | null

const DatePicker: FC<Props> = ({
  asSingle = true,
  useRange,
  showShortcuts,
  showFooter,
}) => {
  useEffect(() => {
    // console.log({ date, currentMonth, currentYear })
    console.log("rendered full datepicker", Date.now())
  })

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
            <SingleDatePicker />
            {!asSingle && <SingleDatePicker />}
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

interface PrevNextButtonProps {
  icon: IconType
  isYearNegative?: boolean
  onClick?: () => void
}

const PrevNextButton: React.FC<PrevNextButtonProps> = ({
  icon: Icon,
  isYearNegative,
  onClick,
}) => {
  return (
    <button
      className={clsx(
        "flex items-center justify-center rounded-full p-2",
        isYearNegative ? "text-gray-300" : "hover:bg-gray-50"
      )}
      onClick={onClick}
      disabled={isYearNegative}
    >
      <Icon className="text-xs" />
    </button>
  )
}

interface MonthYearSwitcherProps {
  /** provided month and year */
  label: string | number
  isNavigator?: boolean
  /** can be used if isNavigator is true */
  active?: boolean
  isYearNegative?: boolean
  onClick?: () => void
}

const MonthYearSwitcher: React.FC<MonthYearSwitcherProps> = ({
  label,
  isNavigator,
  active,
  isYearNegative,
  onClick,
}) => {
  return (
    <button
      className={clsx(
        "flex-1 rounded-md py-2 text-center text-sm font-semibold ",
        isNavigator
          ? active
            ? "bg-green-50 text-green-600"
            : "hover:bg-green-50 hover:text-green-600"
          : isYearNegative
          ? "text-gray-300"
          : "hover:bg-gray-50"
      )}
      onClick={onClick}
      disabled={isYearNegative}
    >
      {label}
    </button>
  )
}

interface DateItemProps {
  date: number
  isToday?: boolean
  isSun?: boolean
  disabled?: boolean
}

const DateItem: React.FC<DateItemProps> = ({
  date,
  isToday,
  isSun,
  disabled,
}) => {
  return (
    <button
      className={clsx(
        "flex h-10 w-10 items-center justify-center rounded-lg font-semibold",
        isToday
          ? "text-green-600"
          : disabled
          ? isSun
            ? "text-red-300"
            : "text-gray-300"
          : isSun && "text-red-600",
        !disabled && "hover:bg-green-600 hover:text-white"
      )}
      disabled={disabled}
    >
      {date}
    </button>
  )
}

const SingleDatePicker: React.FC = () => {
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

  const [date, setDate] = useState(new Date())
  const [currentMonth, setCurrentMonth] = useState(date.getMonth())
  const [currentYear, setCurrentYear] = useState(date.getFullYear())

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

  function handleToggleTab(v: TabState) {
    // reset stacked year intervals to 0
    if (v === "YEAR") setStackedYearIntervals(0)

    setActiveTab((prev) => (prev === v ? null : v))
  }

  function handlePrevNext(type: "PREV" | "NEXT") {
    if (!activeTab) {
      const newCurrentMonth = currentMonth + (type === "PREV" ? -1 : 1)

      if (newCurrentMonth < 0 || newCurrentMonth > 11) {
        const newDate = new Date(
          currentYear,
          newCurrentMonth,
          new Date().getDate()
        )

        setCurrentMonth(newDate.getMonth())
        setCurrentYear(newDate.getFullYear())
      } else {
        setCurrentMonth(newCurrentMonth)
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
    setCurrentMonth(month)
    setActiveTab(null)
  }

  function handleActiveYear(year: number) {
    setCurrentYear(year)
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
