import clsx from "clsx"
import { FC, PropsWithChildren } from "react"
import { IconType } from "react-icons"

interface Props {
  /**
   * React-icons component
   */
  icon?: IconType
  style?: "solid" | "outlined"
  color?: "primary" | "blue" | "red"
  name?: string
  disabled?: boolean
  href?: string
  as?: "button" | "a"
}

const Button: FC<Props> = ({
  icon: Icon,
  style,
  color = "primary",
  name,
  disabled,
  href,
  as = "button",
}) => {
  const button: FC<PropsWithChildren<{ className?: string }>> = ({
    children,
    className,
  }) => {
    return (
      <button className={className} disabled={disabled}>
        {children}
      </button>
    )
  }

  const a: FC<PropsWithChildren<{ className?: string }>> = ({
    children,
    className,
  }) => {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    )
  }

  const Component = as == "button" ? button : a

  return (
    <Component
      className={clsx(
        "flex h-9 items-center justify-center rounded-md",
        style == "solid" && [
          "text-white",
          {
            "bg-green-600": color == "primary" && !disabled,
            "bg-blue-600": color == "blue" && !disabled,
            "bg-red-600": color == "red" && !disabled,
            "bg-gray-300": disabled,
          },
        ],
        style == "outlined" && [
          "border",
          {
            "border-green-600 bg-green-50 text-green-600":
              color == "primary" && !disabled,
            "border-blue-600 bg-blue-50 text-blue-600":
              color == "blue" && !disabled,
            "border-red-600 bg-red-50 text-red-600":
              color == "red" && !disabled,
            "border-gray-300 bg-gray-50 text-gray-300": disabled,
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
      {name && (
        <span className={clsx((style == "solid" || !Icon) && "font-medium")}>
          {name}
        </span>
      )}
    </Component>
  )
}

export default Button
