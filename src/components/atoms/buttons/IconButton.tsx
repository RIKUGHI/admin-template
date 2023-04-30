import { FC } from "react"
import { IoDesktopOutline, IoDownload } from "react-icons/io5"

const IconButton: FC = () => {
  return (
    <button className="block">
      <IoDesktopOutline className="text-xl text-green-600" />
    </button>
  )
}

export default IconButton
