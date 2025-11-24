// hooks/useErrorHandler.ts
import { notification } from "antd";
import { useCallback } from "react";

export const useErrorHandler = () => {
  const handleError = useCallback(
    (status: number | any, serverMessage?: string, errorMessage?: string, serverErrors?: string[], onUnauthorized?: () => void) => {
      switch (status) {
        case 401:
          notification.error({
            message: "Error de Autenticación",
            description: "No autorizado. Por favor inicia sesión nuevamente.",
            duration: 5,
          });
          onUnauthorized?.();
          break;
        case 404:
          notification.error({
            message: "Recurso No Encontrado",
            description: serverMessage || "El recurso solicitado no existe.",
            duration: 5,
          });
          break;
        case 0:
          notification.error({
            message: "Error de Conexión",
            description: "No se pudo conectar con el servidor. Verifique su conexión a internet.",
            duration: 0,
          });
          break;
        default:
          if (serverErrors && serverErrors.length > 0) {
            const errorList = serverErrors.map((error) => `• ${error}`).join("\n");
            notification.error({
              message: errorMessage || "Errores en la Solicitud",
              description: errorList,
              duration: 0,
            });
          } else {
            notification.error({
              message: "Error",
              description: errorMessage || serverMessage || "Ocurrió un error inesperado.",
              duration: 5,
            });
          }
          break;
      }
    },
    []
  );

  return { handleError };
};
