import { FC, PropsWithChildren } from "react"
import { DialogProps } from "."

const Centered: FC<PropsWithChildren<DialogProps>> = ({
  children,
  style,
  onHide,
}) => {
  return (
    <div className="flex min-h-full items-end justify-center p-4 sm:items-center sm:p-0">
      <div
        className={`relative overflow-hidden rounded-lg bg-white shadow-xl duration-300 ${style} transition-all sm:my-8 sm:w-full sm:max-w-lg`}
      >
        {children}
      </div>
    </div>
  )
}

export default Centered
