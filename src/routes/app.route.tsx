import { Routes, Route, Navigate } from "react-router-dom";
import { renderRoutes } from "./router-renderer.route";
import { privateRoutes, publicRoutes } from "./routes.config.route";
import { RoutePaths } from "../utils/constants";
import type { RoutesProps } from "../interfaces/routes.interface";

const AppRoutes: React.FC<RoutesProps> = ({ isAuthenticated }) => {
  return (
    <Routes>
      {/* Renderizar rutas públicas */}
      {renderRoutes(publicRoutes, isAuthenticated)}
      
      {/* Renderizar rutas privadas */}
      {renderRoutes(privateRoutes, isAuthenticated)}

      {/* Redirect para rutas desconocidas */}
      <Route path={RoutePaths.NOT_FOUND} element={<Navigate to={RoutePaths.LOGIN} replace />} />
    </Routes>
  );
}

export default AppRoutes;
