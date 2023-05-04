import clsx from "clsx"
import { FC } from "react"
import { IconType } from "react-icons"

interface Props {
  style?: "solid" | "outlined"
  icon?: IconType
  name?: string
}

const Button: FC<Props> = ({ style = "solid", icon: Icon, name }) => {
  return (
    <button
      className={clsx(
        "flex h-9 items-center justify-center rounded-md px-3",
        style == "solid"
          ? "bg-green-600 text-white"
          : "border border-green-600 bg-green-50 text-green-600"
      )}
    >
      {Icon && <Icon className={clsx("text-xs", name && "mr-1")} />}
      {name && (
        <span className={clsx(style == "solid" && "font-medium")}>{name}</span>
      )}
    </button>
  )
}

export default Button
