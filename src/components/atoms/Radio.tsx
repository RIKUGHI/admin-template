interface Props {
  name: string
}

const Radio: React.FC<Props> = ({ name }) => {
  return (
    <div className="flex items-center">
      <input
        id="radio"
        type="radio"
        className="h-4 w-4 border-gray-300 bg-gray-100 text-green-600 focus:ring-2 focus:ring-green-500"
      />
      <label htmlFor="radio" className="ml-2 text-sm font-medium text-gray-900">
        {name}
      </label>
    </div>
  )
}

export default Radio
