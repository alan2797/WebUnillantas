import { TimePicker, Form } from "antd";
import type { FormFieldProps } from "../../interfaces/components.interface";
import { Controller } from "react-hook-form";
import type { Dayjs } from "dayjs";

const TimePickerCustom = <TFormValues extends Record<string, any>>({
  fieldConfig,
  control,
  error,
}: FormFieldProps<TFormValues>) => {
  const {
    key,
    label,
    placeholder = "Seleccionar hora",
    disabled = false,
    use12Hour=true,
    format = "HH:mm A",
  } = fieldConfig;

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
          <TimePicker
            {...field}
            value={field.value}
            onChange={(time: Dayjs | null) => field.onChange(time)}
            placeholder={placeholder}
            use12Hours={use12Hour}
            format={format}
            size="large"
            disabled={disabled}
            style={{ width: "100%" }}
            showNow={false}
          />
        )}
      />
    </Form.Item>
  );
};

export default TimePickerCustom;
