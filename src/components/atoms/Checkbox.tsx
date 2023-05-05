import { FC } from "react"

const Checkbox: FC = () => {
  return (
    <input
      type="checkbox"
      className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-green-600 focus:ring-2 focus:ring-green-500"
    />
  )
}

export default Checkbox
