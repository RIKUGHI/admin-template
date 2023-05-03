import { FC } from "react"
import { FormSearch } from "../molecules"
import { IconButton } from "../atoms"

const Header: FC = () => {
  return (
    <header className="bb flex flex-col p-2">
      <h2 className="bb mb-2 text-xl font-medium">Dashboard / Create</h2>
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
