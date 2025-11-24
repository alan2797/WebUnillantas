import React from "react";
import { jwtDecode } from "jwt-decode";
import type { TokenPayload } from "../../interfaces/login.interface";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";


interface CanProps {
  permission: string | string[];
  children: React.ReactNode;
}

const Can: React.FC<CanProps> = ({ permission, children }) => {
  const permissionsState  = useSelector((state: RootState) => state.auth.permissions);
  const permissions = Array.isArray(permissionsState) ? permissionsState : [];
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode<TokenPayload>(token);
    if(decoded.isAdmin) return <>{children}</>;
    const userPermissions = permissions.map((item) => item.code) || [];

    const hasPermission = Array.isArray(permission)
      ? permission.some((perm) => userPermissions.includes(perm))
      : userPermissions.includes(permission);

    return hasPermission ? <>{children}</> : null;
  } catch {
    return null;
  }
};

export default Can;
