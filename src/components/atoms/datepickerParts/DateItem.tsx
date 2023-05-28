import clsx from "clsx"

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

export default DateItem
