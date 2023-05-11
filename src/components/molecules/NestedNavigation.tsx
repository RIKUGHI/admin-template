import clsx from "clsx"
import { FC, useState } from "react"
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
  const [open, setOpen] = useState(false)
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
      <div
        id="wrapper-sub-menu"
        className={clsx(
          "trasition-all ml-[26px] space-y-1 duration-300",
          open && "active-wrapper-sub"
        )}
      >
        {navigations.map((navigation, i) => (
          <NavigationLink
            key={i}
            href={navigation.href}
            name={navigation.name}
            active={navigation.active}
            style="secondary"
          />
        ))}
      </div>
    </div>
  )
}

export default NestedNavigation
