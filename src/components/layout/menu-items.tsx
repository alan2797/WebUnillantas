import { CarOutlined } from "@ant-design/icons";
import type { AppMenuItem } from "../../interfaces/routes.interface";
import { IconCalendar, IconCar, IconInputSearch, IconLayout, IconLayout2Filled, IconLayoutRows, IconLock, IconMail, IconReportMoney, IconSettingsShare } from "@tabler/icons-react";
import { RoutePaths } from "../../utils/constants";

export const menuItems: AppMenuItem[] = [
  {
    key: "/modules",
    label: "MODULOS",
    type: "group",
    children: [
      {
        key: "modulos",
        icon: <IconLayout   size={22} stroke={2} />,
        label: "Módulos",
        children: [
          { key: RoutePaths.VEHICLE_ENTRY, label: "Ingreso Vehiculos", icon: <CarOutlined />},
          { key: RoutePaths.HOME, label: "Consulta de Productos", icon: <IconInputSearch />},
          { key: "2", label: "Generar Enlaces", icon: <IconLock />},
          { key: "3", label: "Orden de Trabajo", icon: <IconSettingsShare />},
          { key: "4", label: "Agenda", icon: <IconCalendar />},
          { key: "5", label: "Tránsito", icon: <IconCar />},
          { key: "6", label: "Cotizar Pistas", icon: <IconReportMoney />},
        ]
      },
    ],
  },

  { key: "", icon: <IconMail size={22} stroke={2} />, label: "Buzón" },
  // { key: "/settings", icon: <SettingOutlined />, label: "Ajustes de cuenta" },
];
