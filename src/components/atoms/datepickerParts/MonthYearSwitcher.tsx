import clsx from "clsx"

interface Props {
  /** provided month and year */
  label: string | number
  isNavigator?: boolean
  /** can be used if isNavigator is true */
  active?: boolean
  isYearNegative?: boolean
  onClick?: () => void
}

const MonthYearSwitcher: React.FC<Props> = ({
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

export default MonthYearSwitcher
