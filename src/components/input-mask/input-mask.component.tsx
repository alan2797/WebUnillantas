import { Form, Input } from "antd";
import type { FormFieldProps } from "../../interfaces/components.interface";
import { Controller } from "react-hook-form";
import InputMask from "react-input-mask";

const InputMaskCustom = <TFormValues extends Record<string, unknown>>({
  fieldConfig,
  control,
  error,
}: FormFieldProps<TFormValues>) => {
  const { key, label, placeholder, disabled = false, mask, maskChar, alwaysShowMask, max, min } = fieldConfig;

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
          <InputMask
            mask={mask}
            maskChar={maskChar || null} // ← Cambiar a null en lugar de espacio
            alwaysShowMask={alwaysShowMask}
            value={(field.value ?? "") as string}
            onChange={(e) => {
              // Limpiar el valor antes de pasarlo al form
              const rawValue = e.target.value.replace(/_/g, '').trim();
              field.onChange(rawValue);
            }}
            onBlur={field.onBlur}
            disabled={disabled}
          >
            {/* @ts-ignore - InputMask pasa las props al Input */}
            {(inputProps: any) => (
              <Input
                {...inputProps}
                placeholder={placeholder}
                size="large"
                maxLength={max}
                minLength={min}
                
              />
            )}
          </InputMask>
        )}
      />
    </Form.Item>
  );
};

export default InputMaskCustom;