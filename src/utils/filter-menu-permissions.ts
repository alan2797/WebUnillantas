import { jwtDecode } from "jwt-decode";
import type { AppMenuItem } from "../interfaces/routes.interface";
import type { MenuProps } from "antd";
import type { RootState } from "../redux/store";

interface JwtPayload {
  permissions?: string[] | string;
  isAdmin?: boolean;
}

export const filterMenuByPermissions = (menu: AppMenuItem[], state: any[]): AppMenuItem[] => {
  // const permissions = state || [];
  // Asegurar siempre array
  const permissions = Array.isArray(state) ? state : [];
  const token = localStorage.getItem("token");
  if (!token) return [];

  let userPermissions: string[] = [];
  let isAdmin = true;

  /*try {
    const decoded = jwtDecode<JwtPayload>(token);
    userPermissions = permissions.map((item) => item.code ?? "") || [];
    isAdmin = !!decoded.isAdmin; // si quieres dar acceso total a admin
  } catch (error) {
    console.error("Error al decodificar token:", error);
  }*/

  const hasPermission = (item: AppMenuItem): boolean => {
    return true;
    //if (isAdmin) return true; // admin ve todo
    /*if (!item.permissions || item.permissions.length === 0) return true;
    let validate = item.permissions.some((perm: string) => userPermissions.includes(perm));
    return validate;*/
  };

  const filterRecursive = (items: AppMenuItem[]): AppMenuItem[] => {
    return items
      .map((item) => {
        const itemHasPermission = hasPermission(item);

        let children: AppMenuItem[] | undefined;
        if (item.children) {
          children = filterRecursive(item.children);
        }

        // Mostrar el item solo si tiene permiso o tiene hijos válidos
        if (!itemHasPermission && (!children || children.length === 0)) {
          return null; // ❌ no mostrar
        }

        return { ...item, children }; // ✅ mostrar
      })
      .filter(Boolean) as AppMenuItem[];
  };

  return filterRecursive(menu);
}; 

type AntdMenuItem = Required<MenuProps>["items"][number];

export const mapToAntdItems = (items: AppMenuItem[]): AntdMenuItem[] => {
  return items.map((item) => ({
    key: item.key,
    label: item.label,
    icon: item.icon,
    type: item.type as any,
    children: item.children ? mapToAntdItems(item.children) : undefined,
  }));
};
