
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { menuItems } from "./menu-items";
import type { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/features/auth.slice";
import { env } from "../../config/env";
import {} from './estilos.css';
import { filterMenuByPermissions, mapToAntdItems } from '../../utils/filter-menu-permissions';

const { Sider } = Layout;

interface SidebarProps {
  collapsed: boolean;
  toggleCollapsed: () => void; // <--- añadimos función para el botón hamburguesa
}

const Sidebar = ({ collapsed, toggleCollapsed }: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  //const permissionsState = useSelector((state: RootState) => state.auth.permissions);
  const filteredMenu = filterMenuByPermissions(menuItems, []);
  const antdItems = mapToAntdItems(filteredMenu);  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={310}
      className={`custom-sider sidebar-content-layout ${collapsed ? "collapsed-sider" : ""}`}
      style={{borderRadius: "8px"}}
    >
      {/* HEADER DEL SIDER: logo a la izquierda + hamburguesa a la derecha */}
      <div
        style={{
          display: "flex",
          flexDirection: collapsed ? 'column-reverse': 'row',
          justifyContent: collapsed ? 'space-around':"space-between",
          alignItems: "center",
          // marginBottom:"30px",
          padding: "0 16px",
          height: 64,
        }}
        className="mb-5"
      >
        {/* Logo */}

         {collapsed ? (
            <img
              src={`${env.baseHref}svg/logo-sm-collapse.svg`} 
              alt="Logo"
              style={{ height: 20, margin:"15px  0"}}
            />
          ) : (
            <img
              src={`${env.baseHref}svg/logo-sm.svg`}
              alt="Logo"
              style={{ height: 35 }}
            />
          )}

        {/* Botón hamburguesa */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 40,
            height: 40,
            marginLeft: 5,
            color: collapsed ? "white" : "black",
            marginTop: collapsed ? '25px':'0',
          }}
        >
          <button
            onClick={toggleCollapsed}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 20,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
          
            }}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </button>
        </div>
      </div>

      <Menu
        theme="light"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={antdItems}
        onClick={({ key }) =>{ 
          if(key == '/logout'){
            dispatch(logout());
            navigate("/login");
            return;
          }
          navigate(key)}}
          className="menu-custom-sidebar"
      />
    </Sider>
  );
};

export default Sidebar;
