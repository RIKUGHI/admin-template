import clsx from "clsx"
import { FC, useState } from "react"
import { IconType } from "react-icons"
import { IoChevronDown } from "react-icons/io5"
import { NavigationLink, NavigationProps } from "../atoms"

interface Props extends Pick<NavigationProps, "name" | "icon" | "active"> {
  navigations: NavigationProps[]
}

const NestedNavigation: FC<Props> = ({
  name,
  icon: Icon,
  active,
  navigations,
}) => {
  const [open, setOpen] = useState(true)
  const handleOpen = () => setOpen(!open)

  return (
    <div className="relative flex flex-col">
      <button
        className={clsx(
          "flex items-center rounded-md p-2 text-sm font-medium",
          active ? "bg-green-200" : "hover:bg-green-100"
        )}
        onClick={handleOpen}
      >
        {Icon && <Icon className="min-w-[18px] text-lg" />}
        <span className="ml-2 truncate">{name}</span>
        <IoChevronDown
          className={clsx("ml-auto text-lg", open && "rotate-180")}
        />
      </button>
      {open && (
        <div className="ml-[26px] mt-1 space-y-1" data-view="2">
          {navigations.map((navigation, i) => (
            <NavigationLink
              key={i}
              to={navigation.to}
              name={navigation.name}
              active={navigation.active}
              style="secondary"
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default NestedNavigation
