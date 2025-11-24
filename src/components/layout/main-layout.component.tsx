import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import HeaderBar from "./header-bar.component";
import Sidebar from "./sidebar.component";
import { useState } from "react";
const { Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout style={{ minHeight: "100vh" }}>
       {/* <GlobalTopNavigation /> */}
      {/* HEADER */}
      <HeaderBar />
      {/* <Sidebar collapsed={collapsed} toggleCollapsed={() => setCollapsed(!collapsed)} /> */}
      {/* CONTENT */}
      <Content
        style={{
          padding: 16,
          background: "#E8E8E8",
          minHeight: "calc(100vh - 86px)", // 70 header + margin
        }}
      >
        <Outlet />
      </Content>

    </Layout>
  );
};

export default MainLayout;
