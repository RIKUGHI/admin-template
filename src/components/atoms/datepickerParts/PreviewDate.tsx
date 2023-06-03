import { FC } from "react"
import { NullableDate } from "../../molecules"
import { formatDateToYYYYMMDD } from "../../../utilities/dateUtils"

const PreviewDate: FC<{ date: NullableDate }> = ({ date }) => {
  return (
    <span className="flex-1 rounded-md bg-gray-100 p-2 text-center md:flex-none">
      {date ? formatDateToYYYYMMDD(date) : "YYYY-MM-DD"}
    </span>
  )
}

export default PreviewDate
