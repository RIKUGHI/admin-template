import { FC } from "react"
import { FormSearch } from "../molecules"
import { IconButton } from "../atoms"

const Header: FC = () => {
  return (
    <header className="sticky top-0 mb-2 flex flex-col rounded-bl-md bg-white p-2">
      <h2 className="mb-2 text-lg font-medium">My Name / Create</h2>
      <div className="flex justify-between">
        <div className="flex space-x-1.5">
          <FormSearch />
          <IconButton />
          <IconButton />
        </div>
        <div className="flex space-x-1.5">
          <IconButton />
          <IconButton />
          <IconButton />
        </div>
      </div>
    </header>
  )
}

export default Header
