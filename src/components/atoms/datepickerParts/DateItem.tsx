import clsx from "clsx"

export type SelectedState = "START" | "SINGLE" | "END" | undefined
interface DateItemProps {
  date: number
  isToday?: boolean
  isSun?: boolean
  extendedDate?: boolean
  disabled?: boolean
  preSelected?: boolean
  selectedType?: SelectedState
  onClick?: () => void
  onMouseEnter?: () => void
}

const DateItem: React.FC<DateItemProps> = ({
  date,
  isToday,
  isSun,
  extendedDate,
  disabled,
  preSelected,
  selectedType,
  onClick,
  onMouseEnter,
}) => {
  return (
    <button
      tabIndex={-1}
      className={clsx(
        "relative flex h-10 w-10 items-center justify-center font-semibold",
        selectedType
          ? [
              "bg-green-600 text-white",
              (selectedType === "START" || selectedType === "END") &&
                "hover:rounded-lg",
              selectedType === "START" && "rounded-l-lg",
              selectedType === "SINGLE" && "rounded-lg",
              selectedType === "END" && "rounded-r-lg",
            ]
          : isToday || preSelected
          ? "text-green-600"
          : extendedDate
          ? isSun
            ? "text-red-300"
            : "text-gray-300"
          : isSun && "text-red-600",
        preSelected && "bg-green-50",
        !extendedDate &&
          !selectedType &&
          !preSelected &&
          !disabled &&
          "rounded-lg hover:bg-green-600 hover:text-white",
        extendedDate &&
          !disabled &&
          "rounded-lg hover:bg-green-600/70 hover:text-white/70"
      )}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
    >
      {disabled && (
        <span
          className={clsx(
            "absolute h-px w-1/3",
            extendedDate ? "bg-gray-300" : "bg-gray-900"
          )}
        ></span>
      )}
      {date}
    </button>
  )
}

export default DateItem
