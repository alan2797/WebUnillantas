import { Form, Checkbox, Space } from "antd";
import type { FormFieldProps } from "../../interfaces/components.interface";
import { Controller } from "react-hook-form";
import { CheckOutlined } from "@ant-design/icons";
import styles from './CheckboxGroupCustom.module.css';

const CheckboxGroupCustom = <TFormValues extends Record<string, any>>({
  fieldConfig,
  control,
  error,
}: FormFieldProps<TFormValues>) => {
  const { 
    key, 
    label, 
    options = [], 
    singleSelect = false, 
    style,
    displayMode = "text",
    direction = "vertical",
  } = fieldConfig;

  const renderOptionContent = (option: any, isChecked: boolean) => {
    switch (displayMode) {
      case "image":
        return (
          <div className={`${styles.imageCard} ${isChecked ? styles.checked : ''}`}>
            {/* Checkbox visual personalizado */}
            <div className={`${styles.checkboxIndicator} ${isChecked ? styles.checked : ''}`}>
              {isChecked && (
                <div className={styles.checkIcon}>
                  <CheckOutlined />
                </div>
              )}
            </div>
            
            {/* Imagen */}
            <div className={styles.imageWrapper}>
              <img 
                src={option.image} 
                alt={option.label}
                className={styles.optionImage}
              />
            </div>
          </div>
        );

      case "color":
        return (
          <div className={`${styles.colorCard} ${isChecked ? styles.checked : ''}`}>
            {/* Checkbox visual personalizado */}
            <div className={`${styles.checkboxIndicator} ${isChecked ? styles.checked : ''}`}>
              {isChecked && (
                <div className={styles.checkIcon}>
                  <CheckOutlined />
                </div>
              )}
            </div>
            <div 
              className={styles.colorCircle}
              style={{ 
                backgroundColor: option.color,
                border: option.color === '#FFFFFF' ? '2px solid #d9d9d9' : 'none'
              }}
            />
            <span className={styles.colorLabel}>{option.label}</span>
          </div>
        );

      default:
        // Modo texto normal - no envolver en ningún div especial
        return <span>{option.label}</span>;
    }
  };

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
            value={
              singleSelect
                ? field.value ? [field.value] : []
                : field.value || []
            }
            onChange={(checkedValues) => {
              if (singleSelect) {
                const newValue = checkedValues.pop();
                // Convertir a string siempre si typeValue es string
                if (fieldConfig.typeValue === "string") {
                  field.onChange(newValue ? String(newValue) : "");
                } else {
                  field.onChange(newValue ?? null);
                }
              } else {
                field.onChange(checkedValues);
              }
            }}
            style={style}
            className={styles.checkboxGroup}
          >
            <Space 
              direction={direction} 
              wrap
              size={displayMode === "text" ? 8 : 4}
              className={styles.checkboxGroup}
            >
              {options.map((opt) => {
                const isChecked = singleSelect 
                  ? field.value === opt.value
                  : field.value?.includes(opt.value);

                // Para modo texto, no aplicar clase hiddenCheckbox
                const checkboxClassName = (displayMode === 'image' || displayMode === 'color') 
                  ? styles.hiddenCheckbox 
                  : '';

                return (
                  <Checkbox 
                    key={String(opt.value)} 
                    value={opt.value}
                    className={checkboxClassName}
                  >
                    {renderOptionContent(opt, isChecked)}
                  </Checkbox>
                );
              })}
            </Space>
          </Checkbox.Group>
        )}
      />
    </Form.Item>
  );
};

export default CheckboxGroupCustom;