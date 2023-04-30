import { useRef } from "react"
import { IoDesktopOutline, IoListOutline } from "react-icons/io5"
import { NavigationLink, NavigationProps, Scrollable } from "../atoms"
import { NestedNavigation } from "../molecules"

interface INavigation extends NavigationProps {
  hasSubs?: NavigationProps[]
}

const navigations: INavigation[] = [
  {
    to: "/",
    name: "Dashboard",
    icon: IoDesktopOutline,
    active: true,
  },
  {
    to: "/a",
    name: "Go to a",
    icon: IoDesktopOutline,
  },
  {
    to: "/b",
    name: "Go to b",
    icon: IoDesktopOutline,
  },
  {
    to: "/master",
    name: "Master",
    icon: IoDesktopOutline,
    hasSubs: [
      {
        to: "/a",
        name: "Go to sub a",
        icon: IoDesktopOutline,
      },
      {
        to: "/b",
        name: "Go to sub b",
        icon: IoDesktopOutline,
      },
    ],
  },
  {
    to: "/mastera",
    name: "Master A",
    icon: IoDesktopOutline,
    hasSubs: [
      {
        to: "/a",
        name: "Go to sub a",
        icon: IoDesktopOutline,
      },
      {
        to: "/b",
        name: "Go to sub b",
        icon: IoDesktopOutline,
      },
    ],
  },
]

const Navigation = () => {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <aside className="flex w-60 max-w-[240px] flex-col">
      <div className="bb flex items-center p-2">
        <div className="bb mr-2 h-12 w-12 min-w-[48px] rounded-full"></div>
        <div className="flex flex-col">
          <span className="font-medium">My Name lorem</span>
          <span className="text-sm">My Role</span>
        </div>
      </div>
      <Scrollable>
        {navigations.map((navigation, i) =>
          navigation.hasSubs ? (
            <NestedNavigation
              key={i}
              name={navigation.name}
              icon={IoListOutline}
              navigations={navigation.hasSubs}
            />
          ) : (
            <NavigationLink
              key={i}
              to={navigation.to}
              name={navigation.name}
              active={navigation.active}
              icon={navigation.icon}
            />
          )
        )}
      </Scrollable>
    </aside>
  )
}

export default Navigation
