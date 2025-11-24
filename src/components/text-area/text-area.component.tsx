import { Form, Input } from "antd";
import type { FormFieldProps } from "../../interfaces/components.interface";
import { Controller } from "react-hook-form";

const { TextArea } = Input;

const TextAreaCustom = <TFormValues extends Record<string, unknown>>({
  fieldConfig,
  control,
  error,
}: FormFieldProps<TFormValues>) => {
  const {
    key,
    label,
    placeholder,
    disabled = false,
    showCount=false,
    maxLenght,
    autoSize = { minRows: 3, maxRows: 5 },
  } = fieldConfig;

  return (
    <Form.Item
      label={label}
      validateStatus={error ? "error" : undefined}
      help={error}
      style={{ marginBottom: 16 }}
      layout="vertical"
    >
      <Controller
        name={key as any}
        control={control}
        render={({ field }) => (
          <TextArea
            {...{
              placeholder,
              value: (field.value ?? "") as string,
              onChange: field.onChange,
              onBlur: field.onBlur,
              autoSize,
              showCount,
              maxLength:maxLenght,
              disabled,
              style: { borderRadius: 8, resize: "none" },
            }}
          />
        )}
      />
    </Form.Item>
  );
};

export default TextAreaCustom;
