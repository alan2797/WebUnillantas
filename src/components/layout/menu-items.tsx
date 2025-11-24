import {
  UserOutlined,
  UnorderedListOutlined,
  UserAddOutlined,
  CalendarOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import type { AppMenuItem } from "../../interfaces/routes.interface";

export const menuItems: AppMenuItem[] = [
  {
    key: "/users",
    label: "USUARIOS",
    type: "group",
    children: [
      {
        key: "users",
        icon: <UserOutlined />,
        label: "Administración de Usuarios",
        children: [
          { key: "user/list", label: "Lista de Usuarios", icon: <UnorderedListOutlined />},
          { key: "user/create", label: "Crear Usuario", icon: <UserAddOutlined />} ],
      },
    ],
  },

  { key: "/calendar", icon: <CalendarOutlined />, label: "Calendario" },
  { key: "/settings", icon: <SettingOutlined />, label: "Ajustes de cuenta" },
  { key: "/logout", icon: <LogoutOutlined />, label: "Cerrar Sesión" },
];
