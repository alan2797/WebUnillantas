import {
  Modal,
  Row,
  Col,
  Typography,
  Button,
  Divider,
} from "antd";
import {
  CloseOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import type { ModalFormProps } from "../../interfaces/components.interface";
import ButtonCustom from "../button/button.component";

const { Title } = Typography;

const ModalForm: React.FC<ModalFormProps> = ({
  open,
  onClose,
  icon = <PlusOutlined style={{ fontSize: 28, color: "#1890ff" }} />,
  imageSrc,
  children,
  width=600,
  footerButtons = [],
  showFooter = true,
  title,
  maxHeight = "65vh"
}) => {
  return (
    <Modal
      maskClosable={false}
      open={open}
      onCancel={onClose}
      footer={null}
      width={width}
      centered
      closable={false}
      styles={{
        mask: { backdropFilter: "blur(2px)" },
        content: {
          position: "relative",
          border: "3px solid #1890ff",
          borderRadius: 16,
          padding: "32px 32px",
          background: "#fff",
        },
      }}
    >
      {/* 🔹 Botón de cierre */}
      <Button
        type="text"
        onClick={onClose}
        aria-label="Cerrar"
        style={{
          position: "absolute",
          top: 11,
          right: 11,
          width: 25,
          height: 25,
          padding: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          border: "2px solid #ff4d4f",
          background: "#fff",
          boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
          zIndex: 20,
        }}
        icon={<CloseOutlined style={{ color: "#ff4d4f", fontSize: 14 }} />}
      />

      {/* 🔹 Icono o imagen superior */}
     {(imageSrc || icon) && (
      <div style={{ textAlign: "center", marginTop: 0 }}>
        <div
          style={{
            width: imageSrc ? 150 : 60,
            height: imageSrc ? 100 : 60,
            margin: "8px auto 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: imageSrc ? "5px" : "50%",
            backgroundColor: imageSrc ? "transparent" : "#E6F4FF",
          }}
        >
          {imageSrc ? (
            <img
              src={imageSrc}
              alt="modal-icon"
              style={{
                width: 150,
                height: 90,
                objectFit: "contain",
              }}
            />
          ) : (
            icon
          )}
        </div>
      </div>
    )}


      {/* 🔹 Título dinámico */}
      <Title
        level={4}
        style={{
          textAlign: "center",
          marginTop: 12,
          marginBottom: 16,
          color: "#000",
        }}
      >
        {title}
      </Title>

      <Divider style={{ margin: "16px 0" }} />

      {/* 🔹 Contenido dinámico */}
      <div
        style={{
          maxHeight: maxHeight, // Altura máxima antes de hacer scroll
          overflowY: "auto", // Scroll vertical
          overflowX: "hidden", // Sin scroll horizontal
          paddingRight: 8, // Espacio para el scrollbar
        }}
      >
        {children}
      </div>

      {/* 🔹 Footer dinámico */}
       {showFooter && footerButtons.length > 0 && (
        <Row justify="end" gutter={[12, 12]} style={{ marginTop: 24 }}>
          {footerButtons.map((btn, index) => (
            <Col key={index}>
              <ButtonCustom
                {...btn}
                block={btn.block ?? true}
                htmlType={btn.htmlType || "button"}
                type={btn.type || "default"}
                text={btn.text}
                onClick={btn.onClick}
                className={btn.className}
              />
            </Col>
          ))}
        </Row>
      )}
    </Modal>
  );
};

export default ModalForm;
