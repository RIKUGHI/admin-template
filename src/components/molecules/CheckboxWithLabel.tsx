import { Checkbox } from "../atoms"

const CheckboxWithLabel = () => {
  return (
    <div className="flex items-center">
      <Checkbox id="a" />
      <label htmlFor="a" className="ml-2 text-sm font-medium text-gray-900">
        Default checkbox
      </label>
    </div>
  )
}

export default CheckboxWithLabel
