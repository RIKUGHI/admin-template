import { FC } from "react"
import { FaDesktop, FaPlus } from "react-icons/fa"

const IconButton: FC = () => {
  return (
    <button className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-300">
      <FaDesktop className="text-lg text-green-600" />
    </button>
  )
}

export default IconButton
