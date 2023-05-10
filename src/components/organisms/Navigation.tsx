import { IoDesktopOutline, IoListOutline } from "react-icons/io5"
import { NavigationLink, NavigationProps, Scrollable } from "../atoms"
import TextT from "../atoms/Text"
import { NestedNavigation } from "../molecules"
import { FaDesktop, FaListUl, FaPlus } from "react-icons/fa"
import { useEffect, useRef, useState } from "react"

interface INavigation extends NavigationProps {
  hasSubs?: NavigationProps[]
}

const navigations: INavigation[] = [
  {
    href: "/",
    name: "Dashboard",
    icon: FaPlus,
    active: true,
  },
  {
    href: "/a",
    name: "Go to a",
    icon: FaDesktop,
  },
  {
    href: "/b",
    name: "Go to b",
    icon: FaDesktop,
    // active: true,
  },
  {
    href: "/master",
    name: "Master",
    icon: FaListUl,
    active: true,
    hasSubs: [
      {
        href: "/a",
        name: "User",
        active: true,
      },
      {
        href: "/b",
        name: "Medrep",
      },
      {
        href: "/b",
        name: "Sapi",
      },
    ],
  },
  {
    href: "/mastera",
    name: "Master A",
    icon: FaListUl,
    hasSubs: [
      {
        href: "/a",
        name: "Go to sub a",
      },
      {
        href: "/b",
        name: "Go to sub b",
      },
    ],
  },
]

navigations.push(
  ...Array.from({ length: 4 }).map(() => {
    return {
      href: "/",
      name: "Dashboard",
      icon: FaPlus,
      active: true,
    }
  })
)

/**
 * 3 different views (data-view)
 *
 * 1 = static that has scrollbar or not
 * 2 = auto close that has no scrollbar
 * 3 = auto close that has scrollbar
 */
const Navigation = () => {
  const asideRef = useRef<HTMLElement>(null)
  const [hasScrollbar, setHasScrollbar] = useState(false)

  useEffect(() => {
    setHasScrollbar(
      (asideRef.current &&
        asideRef.current.scrollHeight > asideRef.current.clientHeight) ||
        false
    )
  }, [])

  return (
    <aside
      ref={asideRef}
      className="scrollbar fixed inset-y-0 z-20 overflow-y-auto drop-shadow-md transition-all duration-300"
      // data-view={hasScrollbar ? "3" : "2"}
      data-view="1"
    >
      <div className="flex min-h-full flex-col bg-white">
        <div
          id="header"
          className="flex items-center border-b border-black px-2 py-3"
        >
          <div className="bb h-12 w-12 min-w-[48px] rounded-full transition-all duration-300"></div>
          <div className="ml-2 flex flex-col">
            <span className="whitespace-nowrap font-medium">My Name lorem</span>
            <span className="text-sm">My Role</span>
          </div>
        </div>
        <div
          id="wrapper"
          className="space-y-1 py-2 transition-all duration-300"
        >
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
                href={navigation.href}
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
