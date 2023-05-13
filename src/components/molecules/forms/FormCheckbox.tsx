import { CheckboxWitlLabel } from ".."
import { BaseForm, CommonBaseFormProps } from "../../atoms"

const FormCheckbox: React.FC<CommonBaseFormProps> = ({
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
      <CheckboxWitlLabel />
    </BaseForm>
  )
}

export default FormCheckbox
