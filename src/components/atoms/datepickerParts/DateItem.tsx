import clsx from "clsx"

interface DateItemProps {
  date: number
  isToday?: boolean
  isSun?: boolean
  disabled?: boolean
  selected?: boolean
  onClick?: () => void
}

const DateItem: React.FC<DateItemProps> = ({
  date,
  isToday,
  isSun,
  disabled,
  selected,
  onClick,
}) => {
  return (
    <button
      className={clsx(
        "flex h-10 w-10 items-center justify-center rounded-lg font-semibold",
        selected
          ? "bg-green-600 text-white"
          : isToday
          ? "text-green-600"
          : disabled
          ? isSun
            ? "text-red-300"
            : "text-gray-300"
          : isSun && "text-red-600",
        !disabled && !selected && "hover:bg-green-600 hover:text-white",
        disabled && "hover:bg-green-600/70 hover:text-white/70"
      )}
      onClick={onClick}
    >
      {date}
    </button>
  )
}

export default DateItem
