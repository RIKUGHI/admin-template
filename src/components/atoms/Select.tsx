import clsx from "clsx"
import { CommonBaseFormProps } from "."

interface Props extends Pick<CommonBaseFormProps, "error"> {
  id?: string
}

const Select: React.FC<Props> = ({ id, error }) => {
  return (
    <select
      id={id}
      className={clsx(
        "block h-9 w-full rounded-md border p-2 text-sm transition ",
        {
          "border-gray-300 bg-gray-50 focus:border-green-500 focus:ring-green-500":
            !error,
          "border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500":
            error,
        }
      )}
    >
      <option>United States</option>
      <option>Canada</option>
      <option>Mexico</option>
    </select>
  )
}

export default Select
