import { Form, Space, InputNumber } from "antd";
import type { FormFieldProps } from "../../interfaces/components.interface";
import { Controller } from "react-hook-form";

const InputDualCounter = <TFormValues extends Record<string, unknown>>({
  fieldConfig,
  control,
  error,
}: FormFieldProps<TFormValues>) => {
  const {
    key,
    label,
    disabled = false,
    min = 0,
    maskChar,
    max = 999,
    valueInitial,
    placeholder,
    widthDualInput = 70,
    sufixLeft,
    sufixRight
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
      label={label}
      validateStatus={error ? "error" : undefined}
      help={displayError}
      style={{ marginBottom: 16 }}
      layout="vertical"
    >
      <Controller
        name={key as any}
        control={control}
        render={({ field }) => {
          const currentValue = (field.value ?? valueInitial) as { left: number; right: number };

          const handleLeftChange = (val: number | null) => {
            field.onChange({ ...currentValue, left: val ?? 0 });
          };

          const handleRightChange = (val: number | null) => {
            field.onChange({ ...currentValue, right: val ?? 0 });
          };

          return (
            <>
              <style>
                {`
                  .counter-input-centered .ant-input-number-input {
                    text-align: center !important;
                    font-size: 18px;
                    font-weight: bold;
                  }
                  .no-padding-input .ant-input-number-input {
                    padding: 4px 0 !important;
                  }
                  .suffix-small {
                    font-size: 10px;
                    color: #666;
                    margin-left: 2px;
                  }
                `}
              </style>
              <Space size="middle" align="center" style={{ columnGap: 10 }}>
                <div style={{ position: 'relative' }}>
                  <InputNumber
                    value={currentValue.left}
                    onChange={handleLeftChange}
                    onBlur={field.onBlur}
                    placeholder={placeholder}
                    controls={false}
                    disabled={disabled}
                    changeOnWheel 
                    min={min}
                    max={max}
                    className="counter-input-centered no-padding-input"
                    style={{
                      borderRadius: 8,
                      height: 40,
                      width: widthDualInput,
                      paddingRight: sufixLeft ? 20 : 0, // Espacio para el sufijo
                    }}
                  />
                  {sufixLeft && <span 
                    className="suffix-small"
                    style={{
                      position: 'absolute',
                      right: 8,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      pointerEvents: 'none'
                    }}
                  >
                    {sufixLeft}
                  </span>}
                  
                </div>
                
                <span style={{ fontSize: 25, fontWeight: "bold" }}>{maskChar ?? "-"}</span>
                
                <div style={{ position: 'relative' }}>
                  <InputNumber
                    value={currentValue.right}
                    onChange={handleRightChange}
                    onBlur={field.onBlur}
                    controls={false}
                    changeOnWheel 
                    disabled={disabled}
                    placeholder={placeholder}
                    min={min}
                    max={max}
                    className="counter-input-centered no-padding-input"
                    style={{
                      borderRadius: 8,
                      height: 40,
                      width: widthDualInput,
                      paddingRight: sufixRight ? 20 : 0, // Espacio para el sufijo
                    }}
                  />
                  {sufixRight &&  <span 
                    className="suffix-small"
                    style={{
                      position: 'absolute',
                      right: 8,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      pointerEvents: 'none'
                    }}
                  >
                    {sufixRight}
                  </span>}
                 
                </div>
              </Space>
            </>
          );
        }}
      />
    </Form.Item>
  );
};

export default InputDualCounter;