import { Form, Checkbox, Space } from "antd";
import type { FormFieldProps } from "../../interfaces/components.interface";
import { Controller } from "react-hook-form";

import styles from './CheckboxGroupCustom.module.css'; // Opcional: CSS para estilos

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
    displayMode = "text"
  } = fieldConfig;

  const renderOptionContent = (option: any, isChecked: boolean) => {
    switch (displayMode) {
      case "image":
        return (
          <div className={`${styles.optionContent} ${styles.imageOption} ${isChecked ? styles.checked : ''}`}>
            <div className={`${styles.imageOption} ${isChecked ? styles.checked : ''}`}>
              <img 
                src={option.image} 
                alt={option.label}
                className={styles.optionImage}
              />
            </div>
            {/* {option.label && <span className={styles.optionLabel}>{option.label}</span>} */}
          </div>
        );

      case "color":
        return (
          <div className={`${styles.optionContent} ${styles.colorOption} ${isChecked ? styles.checked : ''}`}>
            <div 
              style={{ 
                width: 30, 
                height: 30, 
                borderRadius: '50%',
                backgroundColor: option.color,
                border: option.color === '#FFFFFF' ? '1px solid #d9d9d9' : 'none'
              }}
            />
            {/* <span>{option.label}</span> */}
            <span className={styles.optionLabel}>{option.label}</span>
          </div>
        );

      default:
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
        render={({ field }) => {
          if (singleSelect) {
            // Modo selección única (CheckBox)
            return (
              <Checkbox.Group
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
                style={styles}
              >
                <Space direction={displayMode === "text" ? "vertical" : "horizontal"} wrap>
                  {options.map((opt) => (
                    <Checkbox key={String(opt.value)} value={opt.value}>
                      {renderOptionContent(opt, field.value === opt.value)}
                    </Checkbox>
                  ))}
                </Space>
              </Checkbox.Group>
            );
          } else {
            // Modo selección múltiple (Checkbox)
            return (
              <Checkbox.Group
                value={field.value || []}
                onChange={(checkedValues) => {
                  field.onChange(checkedValues);
                }}
                style={style}
              >
                <Space direction={displayMode === "text" ? "vertical" : "horizontal"} wrap>
                  {options.map((opt) => (
                    <Checkbox 
                      key={String(opt.value)} 
                      value={opt.value}
                    >
                      {renderOptionContent(opt, field.value?.includes(opt.value))}
                    </Checkbox>
                  ))}
                </Space>
              </Checkbox.Group>
            );
          }
        }}
      />
    </Form.Item>
  );
};

export default CheckboxGroupCustom;