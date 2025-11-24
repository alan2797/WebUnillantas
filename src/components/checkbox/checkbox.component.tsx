import { Form, Checkbox } from "antd";
import type { FormFieldProps } from "../../interfaces/components.interface";
import { Controller } from "react-hook-form";

const CheckboxGroupCustom = <TFormValues extends Record<string, any>>({
  fieldConfig,
  control,
  error,
}: FormFieldProps<TFormValues>) => {
  const { key, label, options = [], singleSelect = false, style } = fieldConfig;

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
          <Checkbox.Group
            style={style}
            value={
              singleSelect
                ? field.value
                  ? [field.value]
                  : []
                : field.value || []
            }
            onChange={(checkedValues) => {
              if (singleSelect) {
                // si es modo selección única, solo mantener un valor
                const newValue = checkedValues.pop();
                field.onChange(newValue ?? null);
              } else {
                // modo múltiple normal
                field.onChange(checkedValues);
              }
            }}
          >
            {options.map((opt) => (
              <Checkbox
                key={String(opt.value)}
                value={opt.value}
                checked={
                  singleSelect
                    ? field.value === opt.value
                    : field.value?.includes(opt.value)
                }
                className="mt-2"
              >
                {opt.label}
              </Checkbox>
            ))}
          </Checkbox.Group>
        )}
      />
    </Form.Item>
  );
};

export default CheckboxGroupCustom;
