import { Form, InputNumber} from "antd";
import type { FormFieldProps } from "../../interfaces/components.interface";
import { Controller } from "react-hook-form";

const InputNumberCustom = <TFormValues extends Record<string, any>>({
  fieldConfig,
  control,
  error,
}: FormFieldProps<TFormValues>) => {
  const { key, label, addonBefore, min, max, disabled = false, placeholder } = fieldConfig;
  return (
    <Form.Item
      label={label}
      validateStatus={error ? "error" : ""}
      help={error || ""}
      layout="vertical"
    >
      <Controller
        name={key as any}
        control={control}
        render={({ field }) => (
            <InputNumber
            {...field}
            min={min}
            max={max}
            placeholder={placeholder}
            addonBefore={addonBefore}
            size="large"
            style={{width:"100%"}}
            disabled={disabled}
            />
        )}
      />
    </Form.Item>
  );
};

export default InputNumberCustom;
