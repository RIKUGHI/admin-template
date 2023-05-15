import { FC, PropsWithChildren } from "react"

const Centered: FC<PropsWithChildren<{ dialog: string }>> = ({
  children,
  dialog,
}) => {
  return (
    <div className="flex min-h-full items-end justify-center p-4 sm:items-center sm:p-0">
      <div
        className={`relative overflow-hidden rounded-lg bg-white shadow-xl duration-300 ${dialog} transition-all sm:my-8 sm:w-full sm:max-w-lg`}
      >
        {children}
      </div>
    </div>
  )
}

export default Centered
