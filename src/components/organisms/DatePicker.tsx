import clsx from "clsx"
import { FC, useEffect } from "react"
import { SingleDatePicker } from "../molecules"

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
  useEffect(() => {
    console.log("rendered full datepicker")
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
