import { Form, Radio } from "antd";
import type { FormFieldProps } from "../../interfaces/components.interface";
import { Controller } from "react-hook-form";


const RadioGroupCustom = <TFormValues extends Record<string, any>>({
  fieldConfig,
  control,
  error,
}: FormFieldProps<TFormValues>) => {
    const { key, label, options=[], style } = fieldConfig;

    // Safe error message handling
    let displayError = error;
    if (error && typeof error === "string") {
      displayError = error.includes("Invalid input")
        ? "El campo es requerido"
        : error;
    }
  return (
    <Form.Item
      label={label}
      validateStatus={error ? "error" : ""}
      help={displayError}
      layout="vertical"
    >
      <Controller
        name={key as any}
        control={control}
        render={({ field }) => (
          <Radio.Group
            {...field}
            value={field.value}
            style={style}
            onChange={(e) => field.onChange(e.target.value)}
          >{options.map((opt) => (
              <Radio key={String(opt.value)} value={opt.value} className="mt-2">
                {opt.label}
              </Radio>
            ))}
            
          </Radio.Group>
        )}
      />
    </Form.Item>
  );
};

export default RadioGroupCustom;