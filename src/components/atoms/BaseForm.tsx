import clsx from "clsx"
import { FC, PropsWithChildren } from "react"

export interface CommonBaseFormProps {
  required?: boolean
  className?: string
  name: string
  helperText?: string
  error?: boolean
}

interface IBaseFormProps extends CommonBaseFormProps {
  htmlFor?: string
}

const BaseForm: FC<PropsWithChildren<IBaseFormProps>> = ({
  children,
  required,
  className,
  htmlFor,
  name,
  helperText,
  error,
}) => {
  return (
    <div className={clsx("space-y-1", className && className)}>
      <label
        htmlFor={htmlFor}
        className={clsx(
          "block text-sm font-medium",
          error ? "text-red-600" : "text-gray-900"
        )}
      >
        {name}
        {required && <span className="ml-1 text-red-600">*</span>}
      </label>
      {children}
      {(helperText || error) && (
        <div>
          {helperText && <p className="text-sm">Helper text</p>}
          {error && <p className="text-sm text-red-600">My version</p>}
        </div>
      )}
    </div>
  )
}

export default BaseForm
