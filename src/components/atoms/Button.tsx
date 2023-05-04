import clsx from "clsx"
import { FC } from "react"
import { IconType } from "react-icons"

interface Props {
  /**
   * React-icons component
   */
  icon?: IconType
  /**
   * What style to use
   */
  style?: "solid" | "outlined"
  /**
   * What color to use
   */
  color?: "primary" | "blue" | "red"
  /**
   * Button name
   */
  name?: string
}

const Button: FC<Props> = ({
  icon: Icon,
  style = "solid",
  color = "primary",
  name,
}) => {
  return (
    <button
      className={clsx(
        "flex h-9 items-center justify-center rounded-md",
        style == "solid"
          ? [
              "text-white",
              {
                "bg-green-600": color == "primary",
                "bg-blue-600": color == "blue",
                "bg-red-600": color == "red",
              },
            ]
          : [
              "border",
              {
                "border-green-600 bg-green-50 text-green-600":
                  color == "primary",
                "border-blue-600 bg-blue-50 text-blue-600": color == "blue",
                "border-red-600 bg-red-50 text-red-600": color == "red",
              },
            ],
        name ? "px-3" : "w-9"
      )}
    >
      {Icon && (
        <Icon
          className={clsx({
            "mr-1 text-xs": name,
            "text-base": !name,
          })}
        />
      )}
      {name && <span className={clsx(!Icon && "font-medium")}>{name}</span>}
    </button>
  )
}

export default Button
