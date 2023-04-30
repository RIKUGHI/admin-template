import { Input } from "../atoms"

const FormInput = () => {
  return (
    <div className="flex flex-col">
      <label htmlFor="default-input" className="mb-1 block text-sm">
        Default input
      </label>
      <Input />
    </div>
  )
}

export default FormInput
