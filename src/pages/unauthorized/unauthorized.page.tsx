// UnauthorizedPage.tsx
import React from 'react';
import './unauthorized.css';

interface UnauthorizedPageProps {
  message?: string;
  onReturnHome?: () => void;
}

const Unauthorized: React.FC<UnauthorizedPageProps> = ({
  message = "No tienes permisos para acceder a esta página",
  onReturnHome
}) => {
  const handleReturnHome = () => {
    if (onReturnHome) {
      onReturnHome();
    } else {
      window.location.href = '/';
    }
  };

  return (
    <div className="unauthorized-container">
      <div className="unauthorized-content">
        <div className="error-icon">
          <svg viewBox="0 0 24 24" width="64" height="64" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
        
        <h1 className="error-title">Acceso No Autorizado</h1>
        
        <p className="error-message">
          {message}
        </p>
        
        <div className="error-details">
          <p>Código de error: <strong>403</strong></p>
          <p>No tienes los permisos necesarios para ver este contenido.</p>
        </div>

        <div className="action-buttons">
          <button 
            className="primary-button"
            onClick={handleReturnHome}
          >
            Volver al Inicio
          </button>
          
          <button 
            className="secondary-button"
            onClick={() => window.history.back()}
          >
            Regresar
          </button>
        </div>

        <div className="support-info">
          <p>
            Si crees que esto es un error, por favor contacta al{' '}
            <a className="support-link">
              administrador del sistema
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;