import { BaseForm, CommonBaseFormProps, Select } from "../../atoms"

const FormSelect: React.FC<CommonBaseFormProps> = ({
  className,
  name,
  error,
}) => {
  return (
    <BaseForm htmlFor={name} className={className} name={name} error={error}>
      <Select id={name} error={error} />
    </BaseForm>
  )
}

export default FormSelect
