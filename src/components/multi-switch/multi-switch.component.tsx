// MultiSwitchCustom.tsx
import { Form, Switch, Space, Tag, Input } from "antd";
import { EditOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import type { FormFieldProps } from "../../interfaces/components.interface";
import { Controller } from "react-hook-form";
import { useState } from "react";

interface EditableValue {
  enabled: boolean;
  details?: string;
}

const MultiSwitchCustom = <TFormValues extends Record<string, unknown>>({
  fieldConfig,
  control,
  error,
}: FormFieldProps<TFormValues>) => {
  const {
    key,
    label,
    options = [],
    gridColumns = 4,
    editableOptions = [],
    extraInputKey,
    showExtraInput=false,
    extraInputLabel,
    disabled
  } = fieldConfig;

  const [editingStates, setEditingStates] = useState<Record<string, boolean>>(
    {}
  );
  const [tempTexts, setTempTexts] = useState<Record<string, string>>({});

  const isEditable = (optionValue: string | number | boolean) => {
    const option = options.find((item) => item.value == optionValue);
    if(option){
      return editableOptions.includes(String(option.label));
    }else{
      return false;
    }
  };
// ant-form-item-label
  return (
    <Form.Item
      label={
        label ? (
          <div>
            {label}
          </div>
        ) : undefined
      }
      validateStatus={error ? "error" : undefined}
      help={error}
      style={{ marginBottom: 16}}
      layout="vertical"
      className="custom-label-item"
    >
       <style>
        {`
        .custom-label-item  .ant-form-item-label {
            text-align: center !important;
            font-weight: bold;
            
          }
          .custom-label-item  .ant-form-item-label>label {
            font-size: 17px !important;
            color: black;
            margin-bottom: 15px;
          }
       
      `}
      </style>

      <Controller
        name={key as any}
        control={control}
        render={({ field }) => {
          const isArrayMode = !editableOptions || editableOptions.length === 0;

          const currentValues: (string | number | boolean)[] = isArrayMode
            ? Array.isArray(field.value)
              ? field.value
              : []
            : [];

          const currentObject = !isArrayMode
            ? ((field.value || {}) as Record<string, boolean | EditableValue>)
            : {};

          const handleToggle = (value: string | number | boolean) => {
            if (isArrayMode) {
              const newValues = currentValues.includes(value)
                ? currentValues.filter((v) => v !== value)
                : [...currentValues, value];
              field.onChange(newValues);
            } else {
              const updatedObject = { ...currentObject };
              const optionKey = String(value);

              if (isEditable(value)) {
                const currentState = updatedObject[optionKey] as
                  | EditableValue
                  | undefined;
                const isCurrentlyEnabled = currentState?.enabled || false;

                if (isCurrentlyEnabled) {
                  // Si está activo y lo apagas → lo eliminas del objeto
                  delete updatedObject[optionKey];
                  setEditingStates((prev) => ({ ...prev, [optionKey]: false }));
                  setTempTexts((prev) => ({ ...prev, [optionKey]: "" }));
                } else {
                  // Si está apagado y lo enciendes → lo agregas con detalles vacíos
                  updatedObject[optionKey] = {
                    enabled: true,
                    details: currentState?.details || "",
                  };
                }
              } else {
                const isCurrentlyEnabled = updatedObject[optionKey] === true;
                if (isCurrentlyEnabled) {
                  // Si lo apagas → eliminar
                  delete updatedObject[optionKey];
                } else {
                  // Si lo enciendes → agregar
                  updatedObject[optionKey] = true;
                }
              }

              field.onChange(updatedObject);
            }
          };

          const handleEdit = (optionValue: string | number | boolean) => {
            const optionKey = String(optionValue);
            const currentDetails =
              (currentObject[optionKey] as EditableValue)?.details || "";
            setTempTexts((prev) => ({ ...prev, [optionKey]: currentDetails }));
            setEditingStates((prev) => ({ ...prev, [optionKey]: true }));
          };

          const handleSave = (optionValue: string | number | boolean) => {
            const optionKey = String(optionValue);
            const updatedObject = { ...currentObject };
            updatedObject[optionKey] = {
              enabled: true,
              details: tempTexts[optionKey] || "",
            };
            field.onChange(updatedObject);
            setEditingStates((prev) => ({ ...prev, [optionKey]: false }));
          };

          const handleCancel = (optionValue: string | number | boolean) => {
            const optionKey = String(optionValue);
            const currentDetails =
              (currentObject[optionKey] as EditableValue)?.details || "";
            setTempTexts((prev) => ({ ...prev, [optionKey]: currentDetails }));
            setEditingStates((prev) => ({ ...prev, [optionKey]: false }));
          };

          const isChecked = (
            optionValue: string | number | boolean
          ): boolean => {
            if (isArrayMode) {
              return currentValues.includes(optionValue);
            } else {
              const optionKey = String(optionValue);
              const value = currentObject[optionKey];
              if (typeof value === "boolean") return value;
              if (typeof value === "object" && value !== null) {
                return (value as EditableValue).enabled || false;
              }
              return false;
            }
          };

          const getTextValue = (
            optionValue: string | number | boolean
          ): string => {
            if (isArrayMode) return "";
            const optionKey = String(optionValue);
            const value = currentObject[optionKey];
            if (typeof value === "object" && value !== null) {
              return (value as EditableValue).details || "";
            }
            return "";
          };

          const columnPercentage = 100 / gridColumns;
          const itemWidth = `calc(${columnPercentage}% - ${
            (12 * (gridColumns - 1)) / gridColumns
          }px)`;

          return (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",
                width: "100%",
              }}
            >
              {options.map((option, index) => {
                const switchChecked = isChecked(option.value);
                const textValue = getTextValue(option.value);
                const isCurrentlyEditing = editingStates[String(option.value)];
                const canEdit = isEditable(option.value);

                return (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      
                      width: itemWidth,
                      minWidth: "170px",
                      minHeight: "32px",
                    }}
                    key={`${option.value}-${index}`}
                  >
                    
                    <Switch
                      checked={switchChecked}
                      onChange={() => handleToggle(option.value)}
                      size="default"
                      disabled={disabled}
                    />

                    <Tag style={{ fontSize: "14px", margin: 0 }}>
                      {option.label}
                    </Tag>

                    {canEdit && switchChecked && !isCurrentlyEditing && (
                      <>
                        {textValue ? (
                          <span
                            style={{
                              fontSize: 16,
                              color: "#8c8c8c",
                              fontStyle: "italic",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {textValue}
                          </span>
                        ) : null}
                        {!disabled && <EditOutlined
                          style={{
                            cursor: "pointer",
                            color: "#1890ff",
                            fontSize: 16,
                            flexShrink: 0,
                          }}
                          onClick={() => handleEdit(option.value)}
                        />}
                      </>
                    )}

                    {canEdit && switchChecked && isCurrentlyEditing && (
                      <Input
                        disabled={disabled}
                        placeholder="Hemoglutest"
                        value={tempTexts[String(option.value)] || ""}
                        onChange={(e) =>
                          setTempTexts((prev) => ({
                            ...prev,
                            [String(option.value)]: e.target.value,
                          }))
                        }
                        onPressEnter={() => handleSave(option.value)}
                        autoFocus
                        size="small"
                        style={{ flex: 1 }}
                        suffix={
                          <Space size={4}>
                            <CheckOutlined
                              style={{
                                cursor: "pointer",
                                color: "#52c41a",
                                fontSize: 12,
                              }}
                              onClick={() => handleSave(option.value)}
                            />
                            <CloseOutlined
                              style={{
                                cursor: "pointer",
                                color: "#ff4d4f",
                                fontSize: 12,
                              }}
                              onClick={() => handleCancel(option.value)}
                            />
                          </Space>
                        }
                      />
                    )}
                  </div>
                );
              })}
            </div>
          );
        }}
      />
      {showExtraInput && extraInputKey && (
        <div className="custom-input-extra" style={{ marginTop: 16, width: "100%" }}>
            {fieldConfig.extraInputLabel && (
              <label className="custom-input-extra-label">
                {fieldConfig.extraInputLabel}
              </label>
            )}
            <Controller
              name={extraInputKey as any}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  value={(field.value as string) || ""}
                  disabled={disabled}
                />
              )}
            />
        </div>
    )}
    </Form.Item>
  );
};

export default MultiSwitchCustom;
