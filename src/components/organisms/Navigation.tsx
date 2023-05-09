import { IoDesktopOutline, IoListOutline } from "react-icons/io5"
import { NavigationLink, NavigationProps, Scrollable } from "../atoms"
import TextT from "../atoms/Text"
import { NestedNavigation } from "../molecules"
import { FaDesktop, FaListUl, FaPlus } from "react-icons/fa"

interface INavigation extends NavigationProps {
  hasSubs?: NavigationProps[]
}

const navigations: INavigation[] = [
  {
    to: "/",
    name: "Dashboard",
    icon: FaPlus,
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
    // active: true,
  },
  {
    to: "/master",
    name: "Master",
    icon: FaListUl,
    active: true,
    hasSubs: [
      {
        to: "/a",
        name: "User",
        active: true,
      },
      {
        to: "/b",
        name: "Medrep",
      },
      {
        to: "/b",
        name: "Sapi",
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
      },
      {
        to: "/b",
        name: "Go to sub b",
      },
    ],
  },
]

navigations.push(
  ...Array.from({ length: 4 }).map(() => {
    return {
      to: "/",
      name: "Dashboard",
      icon: FaPlus,
      active: true,
    }
  })
)

const Navigation = () => {
  return (
    <aside
      className="scrollbar fixed inset-y-0 z-20 overflow-y-auto drop-shadow-md transition-all duration-300"
      data-view="2"
    >
      <div className="flex min-h-full flex-col bg-white">
        {/* <div className="flex items-center border-b border-black px-2 py-3">
          <div className="bb mr-2 h-12 w-12 min-w-[48px] rounded-full"></div>
          <div className="flex flex-col">
            <span className="font-medium">My Name lorem</span>
            <span className="text-sm">My Role</span>
          </div>
        </div> */}
        <div className="space-y-1 p-2 px-3">
          {navigations.map((navigation, i) =>
            navigation.hasSubs ? (
              <NestedNavigation
                key={i}
                name={navigation.name}
                icon={navigation.icon}
                active={navigation.active}
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
      </div>
    </aside>
  )
}

export default Navigation
