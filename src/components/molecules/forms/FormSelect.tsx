import { BaseForm, CommonBaseFormProps, Select } from "../../atoms"

const FormSelect: React.FC<CommonBaseFormProps> = ({
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
      <Select id={name} error={error} />
    </BaseForm>
  )
}

export default FormSelect
