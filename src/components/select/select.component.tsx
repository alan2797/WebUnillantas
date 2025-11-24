import { Form, Select, Checkbox } from "antd";
import { Controller } from "react-hook-form";
import type { FormFieldProps } from "../../interfaces/components.interface";

const { Option } = Select;

const CustomSelect = <TFormValues extends Record<string, unknown>>({
  fieldConfig,
  control,
  error,
}: FormFieldProps<TFormValues>) => {
  const {
    key,
    label,
    placeholder,
    options = [],
    showSearch = false,
    disabled = false,
    mode,
  } = fieldConfig;

  // Safe error message handling
  let displayError = error;
  if (error && typeof error === "string") {
    displayError = error.includes("Invalid input")
      ? "El campo es requerido"
      : error;
  }

  

  const isMultiple = mode === "multiple";
  

  return (
    <Form.Item
      validateStatus={error ? "error" : undefined}
      help={displayError}
      style={{ marginBottom: 16 }}
      label={label}
      layout="vertical"
    >
      <Controller
        name={key as any}
        control={control}
        render={({ field }) => (
          
          
          <Select
            {...field}
            placeholder={placeholder}
            value={field.value === "" || field.value === null || field.value === undefined ? undefined : field.value}
            onBlur={field.onBlur}
            size="large"
            style={{ width: "100%" }}
            optionFilterProp="label"
            showSearch={showSearch}
            disabled={disabled}
            mode={isMultiple ? "multiple" : undefined}
            filterOption={(input, option) =>
              (option?.label ?? "")
                .toLowerCase()
                .includes(input.toLowerCase())
            }
            // 👇 Esto permite mostrar checkbox en cada opción
           optionRender={(option: any) => {
              const currentValue: any = Array.isArray(field.value)
                ? field.value
                : []; // Aseguramos que sea siempre un array

              return (
                <div className="flex items-center gap-2">
                  {isMultiple && (
                    <Checkbox
                      checked={currentValue.includes(option.value)}
                      style={{ pointerEvents: "none", marginRight: 8 }} // evita que el click se duplique
                    />
                  )}
                  {option.label}
                </div>
              );
            }}
          >
            {options.map((option) => (
              <Option
                key={(option.value) as string}
                value={option.value}
                label={option.label}
              >
                {option.label}
              </Option>
            ))}
          </Select>
        )}
      />
    </Form.Item>
  );
};

export default CustomSelect;
