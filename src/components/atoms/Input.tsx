import clsx from "clsx"
import { FC } from "react"

interface Props {
  /**
   * Hello world
   */
  style?: "base" | "standart"
}

const Input: FC<Props> = ({ style = "standart" }) => {
  return (
    <input
      type="text"
      className={clsx(
        "h-9 rounded-md bg-gray-50 p-2 text-sm",
        style == "base"
          ? "border-none focus:ring-transparent"
          : "border border-gray-300 transition focus:border-blue-500 focus:ring-blue-500"
      )}
    />
  )
}

export default Input
