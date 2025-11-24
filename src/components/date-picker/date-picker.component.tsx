
import { DatePicker, Form } from "antd";
import type { FormFieldProps } from "../../interfaces/components.interface";
import { Controller } from "react-hook-form";
import type { Dayjs } from "dayjs";
import esES from "antd/es/date-picker/locale/es_ES";
import "dayjs/locale/es"; 
import dayjs from "dayjs";
dayjs.locale("es"); 
const DatePickerCustom = <TFormValues extends Record<string, any>>({
  fieldConfig,
  control,
  error,
}: FormFieldProps<TFormValues>) => {
    const { key, label, format = 'DD/MM/YYYY', placeholder, disabled = false} = fieldConfig;
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
          <DatePicker
            {...field}
            onChange={(date: Dayjs | null) => field.onChange(date)}
            value={field.value}
            placeholder={placeholder}
            format={format}
            style={{ width: "100%" }}
            size="large"
            disabled={disabled}
            locale={esES} // ✅ aplica español
          />
        )}
      />
    </Form.Item>
  );
};

export default DatePickerCustom;