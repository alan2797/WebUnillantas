import { Form, InputNumber, Space } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import type { FormFieldProps } from "../../interfaces/components.interface";
import { Controller } from "react-hook-form";
import ButtonCustom from "../button/button.component";

const CounterInput = <TFormValues extends Record<string, unknown>>({
  fieldConfig,
  control,
  error,
}: FormFieldProps<TFormValues>) => {
  const {
    key,
    label,
    disabled = false,
    min = 0,
    max = 999,
    placeholder,
    valueInitial,
  } = fieldConfig;

  return (
    <Form.Item
      label={label}
      validateStatus={error ? "error" : undefined}
      help={error}
      style={{ marginBottom: 16 }}
      layout="vertical"
      required={fieldConfig.required}
    >
      <Controller
        name={key as any}
        control={control}
        render={({ field }) => {
          const currentValue = (field.value ?? valueInitial) as number;
          
          const handleDecrement = () => {
            const newValue = Math.max(min, (currentValue ?? 0) - 1);
            field.onChange(newValue);
          };

          const handleIncrement = () => {
            const newValue = Math.min(max, (currentValue ?? 0) + 1);
            field.onChange(newValue);
          };

          return (
            <Space.Compact style={{ width: "100%" }}>
              <ButtonCustom
                icon={<MinusOutlined className="text-primary-antd"/>}
                onClick={handleDecrement}
                disabled={disabled || currentValue <= min}
                style={{
                  borderRadius: "8px 0 0 8px",
                  height: 40,
                  width: 40, // ← Tamaño fijo para los botones
                }}
              />
              <InputNumber
                value={currentValue}
                onChange={(val) => field.onChange(val ?? valueInitial)}
                onBlur={field.onBlur}
                changeOnWheel 
                controls={false}
                placeholder={placeholder}
                disabled={disabled}
                className="counter-input-centered"
                min={min}
                max={max}
                style={{
                  borderRadius: 0,
                  height: 40,
                  width:60,
                  
                }}
              />
              <ButtonCustom
                icon={<PlusOutlined className="text-primary-antd"/>}
                onClick={handleIncrement}
                disabled={disabled || currentValue >= max}
                type="default"
                variant="outlined"
                style={{
                  borderRadius: "0 8px 8px 0",
                  height: 40,
                  width: 40, // ← Tamaño fijo para los botones
                }}
              />
            </Space.Compact>
          );
        }}
      />
      <style>
        {`
          .counter-input-centered .ant-input-number-input {
            text-align: center !important;
            font-size: 18px;
            font-weight: bold;
          }
            .ant-btn-compact-item:not(.ant-btn-status-success) {
              z-index: auto !important;
            }
        `}
      </style>
    </Form.Item>
  );
};

export default CounterInput;