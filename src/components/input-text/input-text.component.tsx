import { Form, Input } from "antd";
import type { FormFieldProps } from "../../interfaces/components.interface";
import { Controller } from "react-hook-form";
import Link from "antd/es/typography/Link";

const InputText = <TFormValues extends Record<string, unknown>>({
  fieldConfig,
  control,
  error,
}: FormFieldProps<TFormValues>) => {
  const {
    key,
    label,
    placeholder,
    disabled = false,
    helpTextClickable = false,
    onHelpTextClick,
    helpText,
    prefix,
    suffix
  } = fieldConfig;
 // Safe error message handling
  let displayError = error;
  if (error && typeof error === "string") {
    displayError = error.includes("Invalid input")
      ? "El campo es requerido"
      : error;
  }
  return (
    <Form.Item
      label={
        <>
          {label}
          {fieldConfig.validations?.some(v => v.type === "required") && (
            <span style={{ color: "red", marginLeft:3 }}> *</span>
          )}
        </>
      }
      validateStatus={error ? "error" : undefined}
      help={displayError}
      style={{ marginBottom: 16 }}
      layout="vertical"
    >
       <Controller
        name={key as any}
        control={control}
        render={({ field }) => 
          <Input
            {...{
              placeholder,
              value: (field.value ?? "") as string,
              onChange: field.onChange,
              onBlur: field.onBlur,
              size: 'large',
              prefix: prefix,
              suffix: suffix,
              disabled
            }}
        />}
      />
      {helpTextClickable && onHelpTextClick && 
        <Link className="text-decoration-underline fw-bold" onClick={onHelpTextClick} style={{marginTop: 4, display: 'block', cursor: 'pointer'}}>
          {helpText}
        </Link>}
    </Form.Item>
  );
};

export default InputText;
