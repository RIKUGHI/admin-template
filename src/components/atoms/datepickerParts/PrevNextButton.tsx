import clsx from "clsx"
import { IconType } from "react-icons"

interface Props {
  icon: IconType
  isYearNegative?: boolean
  onClick?: () => void
}

const PrevNextButton: React.FC<Props> = ({
  icon: Icon,
  isYearNegative,
  onClick,
}) => {
  return (
    <button
      tabIndex={-1}
      className={clsx(
        "flex items-center justify-center rounded-full p-2",
        isYearNegative ? "text-gray-300" : "hover:bg-gray-50"
      )}
      onClick={onClick}
      disabled={isYearNegative}
    >
      <Icon className="text-xs" />
    </button>
  )
}

export default PrevNextButton
