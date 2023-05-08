import { FC, PropsWithChildren } from "react"
import { FaInfo, FaTimes } from "react-icons/fa"
import { AlertList, AlertListProps } from "../atoms"
import clsx from "clsx"

interface SubComponents {
  List: FC<AlertListProps>
}

interface Props {
  variant?: "success" | "danger" | "warning" | "info" | string
}

const Alert: FC<PropsWithChildren<Props>> & SubComponents = ({
  children,
  variant = "info",
}) => {
  return (
    <div
      className={clsx("relative overflow-hidden rounded-md px-3 py-2", {
        "bg-green-50 text-green-800": variant == "success",
        "bg-red-50 text-red-800": variant == "danger",
        "bg-yellow-50 text-yellow-800": variant == "warning",
        "bg-blue-50 text-blue-800": variant == "info",
      })}
    >
      <div
        className={clsx("absolute -left-2 -top-0.5 rounded-full p-2", {
          "bg-green-200": variant == "success",
          "bg-red-200": variant == "danger",
          "bg-yellow-200": variant == "warning",
          "bg-blue-200": variant == "info",
        })}
      >
        <FaInfo className="text-white" />
      </div>
      <div className={clsx("relative z-10 flex flex-col")}>
        <span className="font-bold">Info</span>
        {children}
      </div>
      <button
        className="absolute right-1 top-1 z-10 p-0.5"
        onClick={() => console.log("wew")}
      >
        <FaTimes className="text-xs text-gray-400" />
      </button>
    </div>
  )
}

Alert.List = AlertList

export default Alert
