import { List, Typography } from "antd";
import type { CustomListProps } from "../../interfaces/components.interface";
import ButtonCustom from "../button/button.component";
import { Image } from "antd";
import { env } from "../../config/env";

const { Text } = Typography;
 // Función para extraer texto plano del HTML
const htmlToPlainText = (html: string): string => {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || '';
};

const CustomList: React.FC<CustomListProps> = ({
  data,
  onView,
  showButton = true,
  topButton
}) => {
 

  return (
    <div>
      {topButton && (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: 12,
          }}
        >
          <ButtonCustom
            text={topButton.text}
            icon={topButton.icon}
            onClick={topButton.onClick}
            type="primary"
            variant="solid"
            className="bg-primary-antd"
          />
        </div>
      )}
  <List
    itemLayout="horizontal"

    dataSource={data}
    renderItem={(item) => (
      <List.Item
        style={{
          borderBottom: "1px solid #f0f0f0",
          padding: "16px 0",
          alignItems: "center",
          display: "flex",            
          justifyContent: "space-between",
        }}
      >
        <div style={{ flex: 1, paddingRight: 16 }}>
          <div style={{ marginBottom: 8 }}>
            <Text strong style={{ fontSize: 14 }}>
              {item.title}
            </Text>
            {item.date && (
              <Text type="secondary" style={{ marginLeft: 8, fontSize: 14 }}>
                | {item.date}
              </Text>
            )}
          </div>
          <Text style={{ color: "#8c8c8c", fontSize: 14, display: "block" }}>
            {htmlToPlainText(item.description)}
          </Text>
        </div>
        <div className="mx-3" style={{
            display: "flex",
            alignItems: "center",
          }}>
          <Image
          src={`${env.baseHref}images/signatures/signature1.png`}
          alt="firma"
          height={40}
          preview={false}
          style={{ objectFit: "contain" }}
          />
        </div>
        <div>
          {showButton && (
          <ButtonCustom
            type="primary"
            text="VER NOTA"
            className="bg-warning-antd"
            size="small"
            onClick={() => onView?.(item)}
          />
        )}
        </div>
      </List.Item>
    )}
  />
</div>
  );
}

export default CustomList;
