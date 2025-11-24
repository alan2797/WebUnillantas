import { Form, theme, Typography, } from "antd";
import type { FormFieldProps } from "../../interfaces/components.interface";
import { Controller } from "react-hook-form";
import type { CSSProperties } from "react";
const { Title } = Typography;

const TitleCustom = <TFormValues extends Record<string, unknown>>({
  fieldConfig,
  control,
  error,
}: FormFieldProps<TFormValues>) => {
  const {
      key,
      color,
      fontWeight,
      textAlign="left",
      level=5,
      padding,
      style = {},
      valueInitial,
      margin,
      textTransform,
      classTitle,
    } = fieldConfig;

    const { token } = theme.useToken();
    const primaryColor = color || token.colorPrimary;

   const textStyle: CSSProperties = {
      color:primaryColor,
      fontWeight,
      textAlign,
      textTransform,
      padding,
      margin,
      ...style,
    };
    

  return (
    <Form.Item
      validateStatus={error ? "error" : undefined}
      help={error}
      style={{marginBottom:0}}
      layout="vertical"
    >
       <Controller
        name={key as any}
        control={control}
        render={({ field }) => (
          <Title level={level} style={textStyle} className={classTitle}>
            {(field.value ?? valueInitial ?? "") as string}
          </Title>
        )}
      />
    </Form.Item>
  );
};

export default TitleCustom;