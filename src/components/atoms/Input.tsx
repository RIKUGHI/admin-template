import clsx from "clsx"
import { FC } from "react"
import { CommonBaseFormProps } from "."

interface Props extends Pick<CommonBaseFormProps, "error"> {
  id?: string
  style?: "base" | "standart"
}

const Input: FC<Props> = ({ id, style = "standart", error }) => {
  return (
    <input
      id={id}
      type="text"
      autoComplete="off"
      className={clsx(
        "block h-9 w-full rounded-md p-2 text-sm",
        style == "base"
          ? "border-none focus:ring-transparent"
          : [
              "border transition",
              {
                "border-gray-300 bg-gray-50 focus:border-green-500 focus:ring-green-500":
                  !error,
                "border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500":
                  error,
              },
            ]
      )}
    />
  )
}

export default Input
