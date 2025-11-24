import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import type { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import type { TokenPayload } from "../interfaces/login.interface";
import Spinner from "../components/spinner/spinner.component";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

interface PrivateRouteProps {
  children: ReactNode;
  isAuthenticated: boolean;
  redirectPath?: string;
  requiredPermissions?: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  isAuthenticated,
  redirectPath = "/login",
  requiredPermissions = [],
}) => {
  const { token, loadingPermissions } = useSelector(
    (state: RootState) => state.auth
  );

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  /* if (loadingPermissions || !permissions) {
    return <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(255, 255, 255, 0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <Spin tip="Cargando..." indicator={<LoadingOutlined color="primary" style={{ fontSize: 80 }} spin />} />
    </div>; // puedes poner un loader más bonito
  }

  if (requiredPermissions.length === 0) {
    return <>{children}</>;
  } */

  if (!token) return <Navigate to={redirectPath} replace />;

 /*  const decoded = jwtDecode<TokenPayload>(token ?? "");
  if(decoded.isAdmin) return <>{children}</>; */

  // const userPermissions = permissions?.map(p => p.code) ?? [];
 /*  const hasPermission = requiredPermissions.every(perm =>
    userPermissions.includes(perm)
  );

  if (!hasPermission) {
    return <Navigate to="/unauthorized" replace />;
  } */

  return <>{children}</>;
};

export default PrivateRoute;
