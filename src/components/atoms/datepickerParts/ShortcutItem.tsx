import { FC } from "react"
import { DateRangeType } from "../../molecules"

interface Props {
  label: string
  onClik?: () => void
}

const ShortcutItem: FC<Props> = ({ label, onClik }) => {
  return (
    <button
      className="w-full px-6 py-1.5 text-left leading-5 hover:bg-gray-50 hover:text-green-600"
      onClick={onClik}
    >
      {label}
    </button>
  )
}

export default ShortcutItem
