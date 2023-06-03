import clsx from "clsx"
import { FC } from "react"

interface Props {
  label: string
  disabled?: boolean
  onClick?: () => void
}

const DateRangeConfirmButton: FC<Props> = ({ label, disabled, onClick }) => {
  return (
    <button
      type="button"
      className={clsx(
        "flex h-9 w-full items-center justify-center rounded-md px-3",
        label !== "Cancel" && [
          disabled ? "bg-gray-300 text-white" : "bg-green-600 text-white",
        ]
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

export default DateRangeConfirmButton
