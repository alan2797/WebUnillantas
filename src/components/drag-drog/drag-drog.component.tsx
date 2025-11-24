import React, { useEffect, useState } from "react";
import { Upload, Button, message } from "antd";
import { UploadOutlined, InboxOutlined, DeleteOutlined } from "@ant-design/icons";
import type { RcFile, UploadChangeParam, UploadFile } from "antd/es/upload/interface";

const { Dragger } = Upload;

interface CustomDragDropProps {
   value?: File | null;
  onFileChange?: (file: RcFile | null) => void;
  maxSizeMB?: number;
}

const CustomDragDrop: React.FC<CustomDragDropProps> = ({
  value,
  onFileChange,
  maxSizeMB = 25,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileList, setFileList] = useState<any[]>([]);

  useEffect(() => {
    if (value === null) {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl(null);
    }
  }, [value, previewUrl]);

  // Validación de tipo y tamaño
  const beforeUpload = (file: RcFile) => {
    const isValidType = file.type === "image/jpeg" || file.type === "image/png";
    if (!isValidType) {
      message.error("Solo se permiten archivos .jpeg y .png");
    }
    const isLtSize = file.size / 1024 / 1024 <= maxSizeMB;
    if (!isLtSize) {
      message.error(`El archivo debe pesar menos de ${maxSizeMB}MB`);
    }

    return isValidType && isLtSize;
  };

  // Manejo del cambio de archivo
  const handleChange = (info: UploadChangeParam<UploadFile<any>>) => {
    const file = info.file.originFileObj as RcFile;
    if (file && beforeUpload(file)) {
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
      onFileChange?.(file);
    }
  };

  const handleRemove = () => {
     if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    onFileChange?.(null);
    setFileList([]);
  };

  return (
    <div style={{ textAlign: "center" }}>
      {!previewUrl ? (
        <Dragger
          multiple={false}
          beforeUpload={beforeUpload}
          onChange={handleChange}
          showUploadList={false}
          fileList={fileList}
          style={{
            border: "1px dashed #1890ff",
            borderRadius: 6,
            background: "#f5f7fa",
            cursor: "pointer",
          }}
        >
          <InboxOutlined
            style={{ fontSize: 32, color: "#1890ff", marginBottom: 10 }}
          />
          <p style={{ marginBottom: 5 }}>Sube tu Firma</p>
          <p style={{ fontSize: 12, color: "#999" }}>
            Formato: .jpeg, .png, máx. {maxSizeMB} MB
          </p>
          <Button type="primary" icon={<UploadOutlined />} style={{ marginTop: 10 }}>
            Agregar Firma
          </Button>
        </Dragger>
      ) : (
        <div
          style={{
            display: "inline-block",
            border: "1px dashed #1890ff",
            borderRadius: 6,
            padding: "8px",
            background: "#f5f7fa",
            position: "relative",
          }}
        >
          {/* Imagen más pequeña y sin preview ampliable */}
          <img
            src={previewUrl}
            alt="Firma digital"
            width={150}
            height={70}
            style={{
              objectFit: "contain",
              borderRadius: 4,
              pointerEvents: "none",
            }}
          />

          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={handleRemove}
            style={{
              position: "absolute",
              top: 5,
              right: 5,
              background: "white",
              borderRadius: "50%",
              boxShadow: "0 0 5px rgba(0,0,0,0.1)",
              padding: "0 6px",
              height: "24px",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default CustomDragDrop;
