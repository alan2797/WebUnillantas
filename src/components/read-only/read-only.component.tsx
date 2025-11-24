import { Form, Typography } from "antd";
import type { FormFieldProps } from "../../interfaces/components.interface";
import { Controller } from "react-hook-form";
import type { CSSProperties } from "react";
const { Text } = Typography;
import "./read-only.css";
 // Función para extraer texto plano del HTML
const htmlToPlainText = (html: string): string => {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || '';
};
const ReadOnlyField = <TFormValues extends Record<string, unknown>>({
  fieldConfig,
  control,
  error,
}: FormFieldProps<TFormValues>) => {
  // const {key, label, valueInitial } = fieldConfig;
  const {
    key,
    fontSize = "18px",
    color,
    fontWeight = "bold",
    label,
    textAlign = "left",
    display = "block",
    padding,
    style = {},
    typeText,
    valueInitial,
    margin,
    textTransform,
  } = fieldConfig;
  const textStyle: CSSProperties = {
    fontSize,
    color,
    fontWeight,
    textAlign,
    textTransform,
    display,
    padding,
    margin,
    ...style,
  };

  return (
    <Form.Item
      layout="vertical"
      label={label}
      validateStatus={error ? "error" : undefined}
      help={error}
      className={"readonly-field-container"}
    >
      <Controller
        name={key as any}
        control={control}
        render={({ field }) => (
          <Text type={typeText} style={textStyle}>
            {htmlToPlainText(String(field.value ?? valueInitial ?? ""))}
          </Text>
        )}
      />
    </Form.Item>
  );
};

export default ReadOnlyField;
