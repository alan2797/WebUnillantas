import { Select } from "antd";
import { DownOutlined } from "@ant-design/icons";
import type { SelectMenuConfigProps } from "../../interfaces/components.interface";
Select
export const SelectMenu = ({
  placeholder = "Seleccionar opción",
  options = [],
  icon,
  color = "#1890ff",
  size = "large",
  showSearch = false,
  value,
  defaultValue,
  onChange,
}: SelectMenuConfigProps) => {
    const uniqueId = `select-menu-${Math.random().toString(36).substr(2, 9)}`;
  return (
    <div style={{ position: "relative", marginBottom: 12 }}>
      {icon && (
        <div
          style={{
            position: "absolute",
            left: 12,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 1,
            color: color,
            display: "flex",
            alignItems: "center",
            pointerEvents: "none"

          }}
        >
          {icon}
        </div>
      )}
      <Select
        
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        size={size}
        showSearch={showSearch}
        options={options}
        style={{
          width: "100%",
        }}
        className={uniqueId}
      />
      <style>{`
        .${uniqueId} .ant-select-selector {
          padding-left: ${icon ? "40px" : "11px"} !important;
          border: 1.5px solid ${color} !important;
          border-radius: 8px !important;
          transition: all 0.3s ease !important;
        }
        
        .${uniqueId}:hover .ant-select-selector {
          border-color: ${color} !important;
          box-shadow: 0 0 0 2px ${color}20 !important;
        }
        
        .${uniqueId}.ant-select-focused .ant-select-selector {
          border-color: ${color} !important;
          box-shadow: 0 0 0 2px ${color}30 !important;
        }
        
        .${uniqueId} .ant-select-arrow {
          color: ${color} !important;
          pointer-events: none !important;
        }
         
      `}</style>
    </div>
  );
};