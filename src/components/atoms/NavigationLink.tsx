import clsx from "clsx"
import { FC } from "react"
import { IconType } from "react-icons"
import { Link } from "react-router-dom"

export interface NavigationProps {
  name: string
  to: string
  active?: boolean
  icon: IconType
}

const NavigationLink: FC<NavigationProps> = ({
  to,
  name,
  active,
  icon: Icon,
}) => {
  return (
    <a
      href={to}
      className={clsx(
        "flex items-center rounded-md p-2 text-sm font-medium",
        active ? "bg-green-200" : "hover:bg-green-100"
      )}
    >
      <Icon className="mr-2 text-lg" />
      <span className="truncate">{name}</span>
    </a>
  )
}

export default NavigationLink
