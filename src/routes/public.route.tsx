import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface PublicRouteProps {
  children: ReactNode;
  isAuthenticated: boolean;
  restricted?: boolean; // Si true, bloquea acceso a páginas públicas cuando está autenticado
  redirectPath?: string;
}

const PublicRoute: React.FC<PublicRouteProps> = ({
  children,
  isAuthenticated,
  restricted = false,
  redirectPath = "/",
}) => {
  if (isAuthenticated && restricted) {
    return <Navigate to={redirectPath} replace />;
  }
  return <>{children}</>;
};

export default PublicRoute;
