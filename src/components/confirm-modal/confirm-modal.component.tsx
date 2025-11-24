import React from "react";
import { Modal, Button, Space } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined, PlusSquareOutlined } from "@ant-design/icons";
import type { ConfirmModalProps } from "../../interfaces/components.interface";

interface CustomConfirmModalProps extends ConfirmModalProps {
  okIcon?: React.ReactNode;
  cancelIcon?: React.ReactNode;
  okColor?: string;
  cancelColor?: string;
  buttonSize?: 'small' | 'middle' | 'large';
  icon?: React.ReactNode;
  mode?: 'confirm' | 'success'; // Nueva Props tipo de modal
  successText?: string; // Nueva Props texto del botón único
  successIcon?: React.ReactNode;
  customFooter?: React.ReactNode;
}

export const ConfirmModal: React.FC<CustomConfirmModalProps> = ({
  visible,
  title = "Confirmar",
  content = "¿Estás seguro?",
  onConfirm,
  onCancel,
  okText = "Aceptar",
  cancelText = "Cancelar",
  okIcon = <CheckCircleOutlined />,
  cancelIcon = <CloseCircleOutlined />,
  okColor = '#1890ff',
  cancelColor,
  buttonSize = 'large',
  icon = <PlusSquareOutlined  className="text-primary-antd" style={{fontSize: 20}}/>,
  mode = 'confirm',
  successText,
  successIcon=<CheckCircleOutlined style={{fontSize: 20}}/>,
  customFooter,
  closeIcon,
  ...modalProps
}) => {
  const footer = customFooter
  ? customFooter
  : mode === "success"
    ? (
        <Space size="middle" style={{ width: '100%', justifyContent: 'center' }}>
          <Button
            type="primary"
            icon={successIcon}
            size={buttonSize}
            onClick={onCancel}
          >
            {successText}
          </Button>
        </Space>
      )
    : (
        <Space size="middle" style={{ width: '100%', justifyContent: 'center' }}>
          {cancelText && cancelColor && (
            <Button
              icon={cancelIcon}
              onClick={onCancel}
              size={buttonSize}
              iconPosition="end"
              style={{
                color: cancelColor,
                borderColor: cancelColor
              }}
            >
              {cancelText}
            </Button>
          )}

          {cancelText && !cancelColor && (
            <Button
              icon={cancelIcon}
              iconPosition="end"
              onClick={onCancel}
              size={buttonSize}
              danger
            >
              {cancelText}
            </Button>
          )}

          <Button
            iconPosition="end"
            icon={okIcon}
            onClick={onConfirm}
            type="primary"
            size={buttonSize}
          >
            {okText}
          </Button>
        </Space>
      );

  return (
      <Modal
      {...modalProps}
      open={visible}
      closeIcon={closeIcon}
      onCancel={onCancel}
      footer={footer}
      centered
      maskClosable={false}
      styles={{
        content: {
          position: "relative",
          border: "3px solid #1890ff",
          borderRadius: 30,
          padding: "32px 40px",
          background: "#fff",
        },
      }}
    >
      <div
        style={{
          textAlign: 'center',
          fontSize: '16px',
          fontWeight: '500',
          padding: '10px 0'
        }}
      >
        <div
          style={{
            width: 50,
            height: 50,
            margin: "0px auto 0",
            marginBottom: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            backgroundColor: "#E6F4FF",
          }}
        >
          {icon}
        </div>
        {content}
      </div>
    </Modal>
  );
};