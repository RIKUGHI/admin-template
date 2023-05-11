import clsx from "clsx"
import { FC } from "react"
import { IconType } from "react-icons"
import { Link } from "react-router-dom"

export interface NavigationProps {
  name: string
  href: string
  active?: boolean
  style?: "primary" | "secondary"
  icon?: IconType
}

const NavigationLink: FC<NavigationProps> = ({
  href,
  name,
  active,
  style = "primary",
  icon: Icon,
}) => {
  return (
    <a
      href={href}
      className={clsx(
        "flex items-center rounded-md p-2 text-sm font-medium",
        active
          ? style == "primary"
            ? "bg-green-200"
            : "text-green-600"
          : style == "primary"
          ? "hover:bg-green-100"
          : "hover:text-green-600"
      )}
    >
      {Icon && <Icon className="min-w-[18px] text-lg" />}
      <span className="ml-2 truncate">{name}</span>
    </a>
  )
}

export default NavigationLink
