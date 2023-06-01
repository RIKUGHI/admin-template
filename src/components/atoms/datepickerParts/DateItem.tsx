import clsx from "clsx"

export type SelectedState = "START" | "SINGLE" | "END" | undefined
interface DateItemProps {
  date: number
  isToday?: boolean
  isSun?: boolean
  disabled?: boolean
  preSelected?: boolean
  selectedType?: SelectedState
  onClick?: () => void
}

const DateItem: React.FC<DateItemProps> = ({
  date,
  isToday,
  isSun,
  disabled,
  preSelected,
  selectedType,
  onClick,
}) => {
  return (
    <button
      className={clsx(
        "flex h-10 w-10 items-center justify-center font-semibold",
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
          : disabled
          ? isSun
            ? "text-red-300"
            : "text-gray-300"
          : isSun && "text-red-600",
        preSelected && "bg-green-50",
        !disabled &&
          !selectedType &&
          !preSelected &&
          "rounded-lg hover:bg-green-600 hover:text-white",
        disabled && "rounded-lg hover:bg-green-600/70 hover:text-white/70"
      )}
      onClick={onClick}
    >
      {date}
    </button>
  )
}

export default DateItem
