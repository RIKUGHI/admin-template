import { FC, PropsWithChildren } from "react"

const Common: FC<PropsWithChildren<{ dialog: string }>> = ({
  children,
  dialog,
}) => {
  return (
    <div className="flex justify-center px-4">
      <div
        className={`${dialog} w-[700px] rounded-md bg-white p-6 shadow-md transition-all duration-300`}
      >
        {children}
      </div>
    </div>
  )
}

export default Common
