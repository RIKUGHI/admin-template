import { FaChevronLeft, FaChevronRight } from "react-icons/fa"

const DatePicker = () => {
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

  return (
    <div className="relative mb-10">
      <input
        type="text"
        className="block h-9 w-full rounded-md border border-gray-300 bg-gray-50 p-2 text-sm transition focus:border-green-500 focus:ring-green-500"
      />
      <div className="absolute z-10 mt-1.5 flex flex-col rounded-md bg-white shadow-md lg:flex-row">
        <div className="w-full border-b border-gray-200 py-4 lg:w-36 lg:border-r lg:py-6">
          <ul className="grid grid-cols-2 text-xs md:grid-cols-4 lg:grid-cols-1">
            {["Today", "Last 7 days", "Last 14 days", "Last 30 days"].map(
              (label) => (
                <li className="rounded-md">
                  <button className="w-full px-6 py-1.5 text-left leading-5 hover:bg-gray-50 hover:text-green-600">
                    {label}
                  </button>
                </li>
              )
            )}
          </ul>
        </div>
        <div className="flex flex-col">
          <div className="flex divide-x divide-gray-200">
            <div className="flex flex-col p-5">
              <div className="flex items-center justify-between space-x-2 rounded-md border border-gray-200 px-2 py-1.5">
                <button className="flex items-center justify-center rounded-full p-2 hover:bg-gray-50">
                  <FaChevronLeft className="text-xs" />
                </button>
                <button className="flex-1 rounded-md py-2 text-center text-sm font-semibold hover:bg-gray-50">
                  FEB
                </button>
                <button className="flex-1 rounded-md py-2 text-center text-sm font-semibold hover:bg-gray-50">
                  2023
                </button>
                <button className="flex items-center justify-center rounded-full p-2 hover:bg-gray-50">
                  <FaChevronRight className="text-xs" />
                </button>
              </div>
              <div className="mt-3 grid w-[calc(40px*7)] grid-cols-2 gap-2 text-center text-xs text-gray-900">
                {months.map((month) => (
                  <button className="flex-1 rounded-md py-2 text-center text-sm font-semibold hover:bg-gray-50">
                    {month}
                  </button>
                ))}
              </div>
              {/* <div className="grid w-[calc(40px*7)] grid-cols-7 text-center text-xs text-gray-900">
                {days.map((day) => (
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg font-semibold">
                    {day}
                  </span>
                ))}
                <span className="flex h-10 w-10 items-center justify-center rounded-lg font-semibold text-red-600">
                  1
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-lg font-semibold">
                  2
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-lg font-semibold">
                  3
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-lg font-semibold">
                  4
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-lg font-semibold">
                  5
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-lg font-semibold">
                  6
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 font-semibold">
                  7
                </span>

                <span className="flex h-10 w-10 items-center justify-center rounded-lg font-semibold text-red-600">
                  8
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-600 font-semibold text-white">
                  9
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-lg font-semibold">
                  10
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-lg font-semibold">
                  11
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-lg font-semibold">
                  12
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-lg font-semibold">
                  13
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-lg font-semibold">
                  14
                </span>

                <span className="flex h-10 w-10 items-center justify-center rounded-lg font-semibold text-red-600">
                  15
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-lg font-semibold">
                  16
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-lg font-semibold">
                  17
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-l-lg bg-green-600 font-semibold text-white">
                  18
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-none bg-green-50 font-semibold text-green-600">
                  19
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-none bg-green-50 font-semibold text-green-600">
                  20
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-none rounded-tr-lg bg-green-50 font-semibold text-green-600">
                  21
                </span>

                <span className="flex h-10 w-10 items-center justify-center rounded-none rounded-l-lg bg-green-50 font-semibold text-green-600">
                  22
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-none bg-green-50 font-semibold text-green-600">
                  23
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-none bg-green-50 font-semibold text-green-600">
                  24
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-none bg-green-50 font-semibold text-green-600">
                  25
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-none bg-green-50 font-semibold text-green-600">
                  26
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-none bg-green-50 font-semibold text-green-600">
                  27
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-none rounded-br-lg bg-green-50 font-semibold text-green-600">
                  28
                </span>

                <span className="flex h-10 w-10 items-center justify-center rounded-lg font-semibold text-red-600">
                  1
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-lg font-semibold text-gray-300">
                  2
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-lg font-semibold text-gray-300">
                  3
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-lg font-semibold text-gray-300">
                  4
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-lg font-semibold text-gray-300">
                  5
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-lg font-semibold text-gray-300">
                  6
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-lg font-semibold text-gray-300">
                  7
                </span>
              </div> */}
            </div>
            <div className="hidden p-5 md:flex md:flex-col">
              <div className="flex items-center justify-between space-x-2 rounded-md border border-gray-200 px-2 py-1.5">
                <button className="flex items-center justify-center rounded-full p-2 hover:bg-gray-50">
                  <FaChevronLeft className="text-xs" />
                </button>
                <button className="flex-1 rounded-md py-2 text-center text-sm font-semibold hover:bg-gray-50">
                  February
                </button>
                <button className="flex-1 rounded-md py-2 text-center text-sm font-semibold hover:bg-gray-50">
                  2023
                </button>
                <button className="flex items-center justify-center rounded-full p-2 hover:bg-gray-50">
                  <FaChevronRight className="text-xs" />
                </button>
              </div>
              <div className="grid w-[calc(40px*7)] grid-cols-7 text-center text-xs text-gray-900">
                {days.map((day) => (
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg font-semibold">
                    {day}
                  </span>
                ))}

                <span className="flex h-10 w-10 items-center justify-center rounded-none rounded-tl-lg bg-green-50 font-semibold text-red-600">
                  1
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-none bg-green-50 font-semibold text-green-600">
                  2
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-none bg-green-50 font-semibold text-green-600">
                  3
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-none bg-green-50 font-semibold text-green-600">
                  4
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-none bg-green-50 font-semibold text-green-600">
                  5
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-none bg-green-50 font-semibold text-green-600">
                  6
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-none bg-green-50 font-semibold text-green-600">
                  7
                </span>

                <span className="flex h-10 w-10 items-center justify-center rounded-none rounded-bl-lg bg-green-50 font-semibold text-red-600">
                  8
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-none bg-green-50 font-semibold text-green-600">
                  9
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-none bg-green-50 font-semibold text-green-600">
                  10
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-r-lg bg-green-600 font-semibold text-white">
                  11
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-lg font-semibold">
                  12
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-lg font-semibold">
                  13
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-lg font-semibold">
                  14
                </span>

                <span className="flex h-10 w-10 items-center justify-center rounded-lg font-semibold text-red-600">
                  15
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-lg font-semibold">
                  16
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-lg font-semibold">
                  17
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-lg font-semibold">
                  18
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-lg font-semibold">
                  19
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-lg font-semibold">
                  20
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-lg font-semibold">
                  21
                </span>

                <span className="flex h-10 w-10 items-center justify-center rounded-lg font-semibold text-red-600">
                  22
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-lg font-semibold">
                  23
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-lg font-semibold">
                  24
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-lg font-semibold">
                  25
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-lg font-semibold">
                  26
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-lg font-semibold">
                  27
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-lg font-semibold">
                  28
                </span>

                <span className="flex h-10 w-10 items-center justify-center rounded-lg font-semibold text-red-600">
                  29
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-lg font-semibold">
                  30
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-lg font-semibold">
                  31
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-lg font-semibold text-gray-300">
                  1
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-lg font-semibold text-gray-300">
                  2
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-lg font-semibold text-gray-300">
                  3
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-lg font-semibold text-gray-300">
                  4
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between space-y-4 border-t border-gray-200 px-6 py-4 md:flex-row md:space-y-0">
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
        </div>
      </div>
    </div>
  )
}

export default DatePicker
