import { BaseForm, CommonBaseFormProps, Input } from "../../atoms"

const FormInput: React.FC<CommonBaseFormProps> = ({
  className,
  required,
  name,
  error,
}) => {
  return (
    <BaseForm
      required={required}
      htmlFor={name}
      className={className}
      name={name}
      error={error}
    >
      <Input id={name} error={error} />
    </BaseForm>
  )
}

export default FormInput
