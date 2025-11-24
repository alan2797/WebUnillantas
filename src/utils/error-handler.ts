// utils/error-handler.ts
import { notification } from 'antd';
import React from 'react';

export interface ErrorHandlerConfig {
  status: number;
  serverMessage?: string;
  errorMessage?: string;
  serverErrors?: string[];
  onUnauthorized?: () => void;
}

export const handleApiError = (config: ErrorHandlerConfig) => {
  const { status, serverMessage, errorMessage, serverErrors, onUnauthorized } = config;
  switch (status) {
    case 401:
      notification.error({
        message: 'Error de Autenticación',
        description: 'No autorizado. Por favor inicia sesión nuevamente.',
        duration: 5,
        placement: "top"
      });
      onUnauthorized?.();
      break;
    case 404:
      notification.error({
        message: 'Recurso No Encontrado',
        description: serverMessage || "El recurso solicitado no existe.",
        duration: 5,
        placement: "top"
      });
      break;
    case 0:
      notification.error({
        message: 'Error de Conexión',
        description: "No se pudo conectar con el servidor. Verifique su conexión a internet.",
        duration: 5,
        placement: "top"
      });
      break;
    default:
      if (serverErrors && serverErrors.length > 0) {
        // Crear elemento React para la lista de errores
        const errorList = React.createElement(
          'div',
          { 
            style: { 
              maxHeight: '200px', 
              overflowY: 'auto',
              paddingLeft: '8px'
            } 
          },
          serverErrors.map((error, index) => 
            React.createElement(
              'div', 
              { 
                key: index, 
                style: { 
                  marginBottom: '4px',
                  display: 'flex',
                  alignItems: 'flex-start'
                } 
              },
              React.createElement(
                'span',
                { 
                  style: { 
                    color: '#ff4d4f',
                    marginRight: '8px',
                    fontSize: '12px'
                  } 
                },
                '•'
              ),
              error
            )
          )
        );

        notification.error({
          message: errorMessage || 'Errores en la Solicitud',
          description: errorList,
          duration: 0,
          style: {
            width: 500,
          },
        });
      } else {
        notification.error({
          message: 'Error',
          description:  serverMessage ||  errorMessage || "Ocurrió un error inesperado.",
          duration: 5,
        });
      }
      break;
  }
};