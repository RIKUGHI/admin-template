import { FC } from "react"

export interface AlertListProps {
  lists: string[]
}

const AlertList: FC<AlertListProps> = ({ lists }) => {
  return (
    <ul className="ml-4 list-inside list-disc text-sm">
      {lists.map((list, i) => (
        <li key={i}>{list}</li>
      ))}
    </ul>
  )
}

export default AlertList
