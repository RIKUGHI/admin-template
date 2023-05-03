import { IoDesktopOutline, IoListOutline } from "react-icons/io5"
import { NavigationLink, NavigationProps, Scrollable } from "../atoms"
import { NestedNavigation } from "../molecules"
import { FaDesktop, FaListUl } from "react-icons/fa"

interface INavigation extends NavigationProps {
  hasSubs?: NavigationProps[]
}

const navigations: INavigation[] = [
  {
    to: "/",
    name: "Dashboard",
    icon: FaDesktop,
    active: true,
  },
  {
    to: "/a",
    name: "Go to a",
    icon: FaDesktop,
  },
  {
    to: "/b",
    name: "Go to b",
    icon: FaDesktop,
  },
  {
    to: "/master",
    name: "Master",
    icon: FaListUl,
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
    icon: FaListUl,
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
  return (
    <aside className="flex w-60 max-w-[240px] flex-col bg-white">
      <div className="flex items-center border-b border-black px-2 py-3">
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
              icon={navigation.icon}
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
