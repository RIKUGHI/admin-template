const TextAreaFloatingLabel = () => {
  return (
    <div className="relative z-0 mt-10 w-full">
      <textarea
        cols={3}
        className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
        placeholder=" "
      />
      <label className="absolute -top-1 -z-10 origin-[0] -translate-y-1/2 scale-75 transform text-sm font-medium text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:scale-100 peer-focus:-top-1 peer-focus:left-0 peer-focus:scale-75">
        Email address My Own
      </label>
    </div>
  )
}

export default TextAreaFloatingLabel
