import { BaseForm, CommonBaseFormProps, TextArea } from "../../atoms"

const FormTextArea: React.FC<CommonBaseFormProps> = ({
  className,
  name,
  error,
}) => {
  return (
    <BaseForm htmlFor={name} className={className} name={name} error={error}>
      <TextArea id={name} error={error} />
    </BaseForm>
  )
}

export default FormTextArea
