import { IoDesktopOutline, IoListOutline } from "react-icons/io5"
import { NavigationLink, NavigationProps } from "../atoms"
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
]

const Navigation = () => {
  return (
    <aside className="w-60">
      <div className="bb flex h-12 items-center justify-center">Logo</div>
      <div className="flex flex-col p-2">
        {navigations.map((navigation, i) =>
          navigation.hasSubs ? (
            <NestedNavigation
              key={i}
              name="Master"
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
      </div>
    </aside>
  )
}

export default Navigation
