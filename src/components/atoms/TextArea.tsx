import clsx from "clsx"
import { CommonBaseFormProps } from "."

interface Props extends Pick<CommonBaseFormProps, "error"> {
  id?: string
}

const TextArea: React.FC<Props> = ({ id, error }) => {
  return (
    <textarea
      id={id}
      rows={3}
      className={clsx("block w-full rounded-md border p-2 text-sm transition", {
        "border-gray-300 bg-gray-50 focus:border-green-500 focus:ring-green-500":
          !error,
        "border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500":
          error,
      })}
    ></textarea>
  )
}

export default TextArea
