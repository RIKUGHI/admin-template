import clsx from "clsx"
import { FC, useState } from "react"
import { IconType } from "react-icons"
import { IoChevronDown } from "react-icons/io5"
import { NavigationLink, NavigationProps } from "../atoms"

interface Props {
  name: string
  icon: IconType
  navigations: NavigationProps[]
}

const NestedNavigation: FC<Props> = ({ name, icon: Icon, navigations }) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(!open)

  return (
    <div className="flex flex-col">
      <button
        className="flex items-center rounded-md p-2 text-sm font-medium hover:bg-green-100"
        onClick={handleOpen}
      >
        <Icon className="mr-2 text-lg" />
        <span className="text-left">{name}</span>
        <IoChevronDown
          className={clsx("ml-auto text-lg", open && "rotate-180")}
        />
      </button>
      {open && (
        <div className="ml-7">
          {navigations.map((navigation, i) => (
            <NavigationLink
              key={i}
              to={navigation.to}
              name={navigation.name}
              icon={navigation.icon}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default NestedNavigation
