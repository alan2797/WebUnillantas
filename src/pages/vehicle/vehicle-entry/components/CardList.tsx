import React from 'react';
import { Card, Button, Divider } from 'antd';
import { IconCar, IconCarCrash, IconTimelineEvent} from "@tabler/icons-react";
import './estilos.css'   

export interface Ingreso {
  id: string;
  nombre: string;
  horaIngreso?: string;
  horaSalida?: string;
  placa: string;
  modelo: string;
  color: string;
  imagen?: string;
}

export interface IngresoCardProps {
  nombre: string;
  horaIngreso?: string;
  horaSalida?: string;
  placa: string;
  modelo: string;
  color: string;
  tipo: 'ingreso' | 'salida';
  imagen?: string;
  onVerHistorial?: () => void;
}

export const CardList: React.FC<IngresoCardProps> = ({
  nombre,
  horaIngreso,
  horaSalida,
  placa,
  modelo,
  imagen,
  color,
  tipo,
  onVerHistorial
}) => {
  return (
    <Card 
      className="ingreso-card"
      style={{ marginBottom: 16 }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Lado izquierdo - Ingreso (solo si tiene horaIngreso) - DESKTOP */}
        {horaIngreso && (
          <div className="side-icon left-icon" style={{ gap: 4 }}>
            <IconCar size={40} color='#52c41a' />
            <div style={{ fontSize: 12, color: '#888' }}>{horaIngreso}</div>
          </div>
        )}

        {/* Centro - Información */}
        <div style={{ flex: 1, marginLeft: 24 }}>
          <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "flex-start" }}>
            <h3 style={{ margin: 0, marginBottom: 8, whiteSpace: "nowrap" }}>{nombre}</h3>
            <div style={{ width: "100%" }}>
              <Divider style={{ margin: "8px 0", borderTopWidth:2}} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', color: '#666', flexWrap: 'wrap' }}>
            <img
              src={imagen}
              alt="car logo"
              style={{ width: 35}}
            />
            <span>|</span>
            <span>{placa}</span>
            <span>|</span>
            <span>{modelo}</span>
            <span>|</span>
            <span>{color}</span>
          </div>
          
          {/* Iconos móviles - solo visibles en pantallas pequeñas */}
          <div className="mobile-icons">
            {horaIngreso && (
              <div className="mobile-icon-item">
                <IconCar size={40} color="#52c41a" />
                <span className="mobile-time">{horaIngreso}</span>
              </div>
            )}

            {horaSalida && (
              <div className="mobile-icon-item">
                <IconCarCrash size={40} color="#ff4d4f" style={{ transform: "scaleX(-1)" }} />
                <span className="mobile-time">{horaSalida}</span>
              </div>
            )}
          </div>
          
        </div>

        {/* Lado derecho - Salida - DESKTOP */}
        {tipo === 'salida' && horaSalida && (
          <div className="side-icon right-icon" style={{ gap: 4 }}>
            <IconCarCrash size={40} color='#ff4d4f' style={{ transform: "scaleX(-1)" }}/>
            <div style={{ fontSize: 12, color: '#888' }}>{horaSalida}</div>
          </div>
        )}
        
      </div>
      <Divider className='my-0 mt-4' style={{borderTopWidth:2}}/>
      {/* Botón Ver Historial */}
      <Button 
        type="link" 
        icon={<IconTimelineEvent size={20} fontWeight={"bolder"} />} 
        onClick={onVerHistorial}
        className='view-history'
        style={{ marginTop: 12, padding: 0, color: '#ff4d4f', fontWeight:"bold" }}
      >
        Ver Historial
      </Button>
    </Card>
  );
};