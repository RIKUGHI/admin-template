import { BaseForm, CommonBaseFormProps, TextArea } from "../../atoms"

const FormTextArea: React.FC<CommonBaseFormProps> = ({
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
      <TextArea id={name} error={error} />
    </BaseForm>
  )
}

export default FormTextArea
