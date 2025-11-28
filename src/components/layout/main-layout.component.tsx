import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import HeaderBar from "./header-bar.component";
import { theme } from "antd";
const { Content } = Layout;

const MainLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <HeaderBar />
      <Content
        style={{
          padding: 16,
          background: "#E8E8E8",
          minHeight: "calc(100vh - 86px)",
        }}
      >
        <Outlet />
      </Content>
    </Layout>
  );
};

export default MainLayout;
