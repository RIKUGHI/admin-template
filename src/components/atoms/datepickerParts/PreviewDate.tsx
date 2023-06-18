import { FC } from "react"
import { NullableDate } from "../../molecules"
import { formatDateToYYYYMMDD } from "../../../utilities/dateUtils"

interface Props {
  date: NullableDate
  placeholder?: string
  displayFormat?: (d: Date) => string
}

const PreviewDate: FC<Props> = ({ date, placeholder, displayFormat }) => {
  return (
    <span className="flex-1 rounded-md bg-gray-100 p-2 text-center md:flex-none">
      {date
        ? displayFormat
          ? displayFormat(date)
          : formatDateToYYYYMMDD(date)
        : placeholder ?? "YYYY-MM-DD"}
    </span>
  )
}

export default PreviewDate
