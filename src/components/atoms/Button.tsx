import clsx from "clsx"
import { FC, PropsWithChildren } from "react"
import { IconType } from "react-icons"

interface Props {
  /**
   * React-icons component
   */
  icon?: IconType
  style?: "plain" | "solid" | "outlined"
  color?: "black" | "primary" | "blue" | "red"
  name?: string
  disabled?: boolean
  href?: string
  onClick?: () => void
}

const Button: FC<Props> = ({
  icon: Icon,
  style = "plain",
  color = "black",
  name,
  disabled,
  href,
  onClick,
}) => {
  const button: FC<PropsWithChildren<{ className?: string }>> = ({
    children,
    className,
  }) => {
    return (
      <button
        type="button"
        className={className}
        disabled={disabled}
        onClick={onClick}
      >
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

  const Component = href ? a : button

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
            "bg-black": color == "black" && !disabled,
            "bg-gray-300": disabled,
          },
        ],
        style == "outlined" && [
          "border",
          {
            "border-green-600 bg-green-50": color == "primary" && !disabled,
            "border-blue-600 bg-blue-50": color == "blue" && !disabled,
            "border-red-600 bg-red-50": color == "red" && !disabled,
            "border-black bg-black/5": color == "black" && !disabled,
            "border-gray-300 bg-gray-50": disabled,
          },
        ],
        {
          "text-green-600":
            (style == "plain" || style == "outlined") &&
            color == "primary" &&
            !disabled,
          "text-blue-600":
            (style == "plain" || style == "outlined") &&
            color == "blue" &&
            !disabled,
          "text-red-600":
            (style == "plain" || style == "outlined") &&
            color == "red" &&
            !disabled,
          "text-gray-300": disabled,
        },
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
