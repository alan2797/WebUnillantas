// PageContainer.tsx
import { Typography, Breadcrumb, Tabs } from "antd";
import type { PageContainerProps } from "../../interfaces/components.interface";
const PageContainer = ({ title, icon, breadcrumb,tabs, children,iconOnTop }: PageContainerProps) => {
  return (
    <div style={{ padding: "0px" }}>
     {breadcrumb && breadcrumb.length > 0 && (
  <Breadcrumb
    style={{ marginBottom: "25px" }}
    items={breadcrumb.map((item) => ({
      title: item.path ? <a href={item.path}>{item.label}</a> : item.label,
    }))}
  />
)}

        <div className={`page-container ${""}`} style={{ padding: 0 }}>
        {iconOnTop ? (
            <div
              className="page-header text-primary-antd"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                marginBottom: 8,
              }}
            >
              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  backgroundColor: "#E6F4FF",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                {icon && (
                  <span style={{ fontSize: 40, marginBottom:6, display: "flex" }}>
                    {icon}
                  </span>
                )}
              </div>

              <Typography.Title
                level={3}
                style={{ margin: 10, fontWeight: 500 }}
              >
                {title}
              </Typography.Title>
            </div>
          ) : (
            <div
              className="page-header text-primary-antd"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                lineHeight: 1,
                marginBottom: 16,
              }}
            >
              {icon && <span style={{ display: "flex", alignItems: "center" }}>{icon}</span>}

              <Typography.Title
                level={4}
                style={{ margin: 0, fontWeight: 400 }}
                className="text-primary-antd fs-3 ms-2"
              >
                {title}
              </Typography.Title>
            </div>
          )}
           {tabs && tabs.items.length > 0 && (
              <Tabs
                defaultActiveKey={tabs.defaultActiveKey}
                onChange={tabs.onChange}
                items={tabs.items.map((tab) => ({
                  key: tab.key,
                  label: (
                    <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      {tab.icon && tab.icon}
                      {tab.label}
                    </span>
                  ),
                  children: tab.children,
                }))}
                style={{ marginBottom: 16 }}
              />
            )}
        <div className="page-content" style={{ padding: 0 }}>
            {children}
        </div>
        </div>
    </div>
  );
};

export default PageContainer;
