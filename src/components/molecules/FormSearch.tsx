import { FaSearch } from "react-icons/fa"
import { Input } from "../atoms"

const FormSearch = () => {
  return (
    <form className="flex items-center justify-between rounded-md border border-gray-300 bg-gray-50 ring-1 ring-transparent transition focus-within:border-green-600 focus-within:ring-green-600">
      <Input style="base" />
      <button className="mr-2">
        <FaSearch className="text-lg text-green-600" />
      </button>
    </form>
  )
}

export default FormSearch
