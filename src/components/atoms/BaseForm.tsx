import clsx from "clsx"
import { FC, PropsWithChildren } from "react"

export interface CommonBaseFormProps {
  className?: string
  name: string
  error?: boolean
}

interface IBaseFormProps extends CommonBaseFormProps {
  htmlFor?: string
}

const BaseForm: FC<PropsWithChildren<IBaseFormProps>> = ({
  children,
  className,
  htmlFor,
  name,
  error,
}) => {
  return (
    <div className={clsx("space-y-2", className && className)}>
      <label
        htmlFor={htmlFor}
        className={clsx(
          "block text-sm font-medium",
          error ? "text-red-600" : "text-gray-900"
        )}
      >
        {name}
      </label>
      {children}
      {error && <p className="text-sm text-red-600">My version</p>}
    </div>
  )
}

export default BaseForm
