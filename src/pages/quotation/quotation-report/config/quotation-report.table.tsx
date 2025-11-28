import type { ColumnsType } from "antd/es/table";
import type { QuotationReportTable } from "../../../../interfaces/quotation.interface";

export const columns: ColumnsType<QuotationReportTable> = [
  { 
    title: "Código de Cotización", 
    dataIndex: "quotationCode", 
    key: "quotationCode",
    render: (value) => (
      <label className="text-primary-antd" style={{ fontWeight: '600' }}>
        {value}
      </label>
    )
  },
  { 
    title: "Placa", 
    dataIndex: "vehiclePlate", 
    key: "vehiclePlate",
    render: (plate) => (
      <label style={{ fontFamily: 'monospace', fontWeight: '600' }}>
        {plate}
      </label>
    )
  },
  { 
    title: "Marca", 
    dataIndex: "vehicleBrand", 
    key: "vehicleBrand" 
  },
  { 
    title: "Cliente", 
    dataIndex: "customerName", 
    key: "customerName" 
  },
  { 
    title: "Hora de Entrada", 
    dataIndex: "entryTime", 
    key: "entryTime",
    render: (entryTime: string) => {
      const formatTime = (dateTime: string) => {
        const date = new Date(dateTime);
        return date.toLocaleTimeString('es-ES', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: true 
        }).toUpperCase();
      };
      
      return formatTime(entryTime);
    }
  },
  { 
    title: "Prioridad", 
    dataIndex: "priority", 
    key: "priority",
    render: (priority: string) => {
      const getPriorityColor = (prio: string) => {
        switch(prio.toLowerCase()) {
          case 'alta': return '#ff4d4f';
          case 'media': return '#faad14';
          case 'baja': return '#52c41a';
          default: return '#d9d9d9';
        }
      };
      
      return (
        <span 
          style={{
            backgroundColor: getPriorityColor(priority),
            color: 'white',
            padding: '2px 8px',
            borderRadius: '10px',
            fontSize: '11px',
            fontWeight: '600'
          }}
        >
          {priority}
        </span>
      );
    }
  },
  { 
    title: "Cotización Cerrada", 
    dataIndex: "quotationStatus", 
    key: "quotationStatus",
    render: (status: string) => {
      const getStatusColor = (stat: string) => {
        switch(stat.toLowerCase()) {
          case 'cerrada': return '#52c41a';
          case 'pendiente': return '#faad14';
          case 'en proceso': return '#1890ff';
          default: return '#d9d9d9';
        }
      };
      
      return (
        <span style={{ 
          color: getStatusColor(status),
          fontWeight: '500'
        }}>
          {status}
        </span>
      );
    }
  },
  { 
    title: "Cotización Facturada", 
    dataIndex: "invoiceNumber", 
    key: "invoiceNumber",
    render: (invoiceNumber: string) => {
      if (!invoiceNumber || invoiceNumber === '') {
        return <span style={{ color: '#bfbfbf', fontStyle: 'italic' }}>-</span>;
      }
      
      return (
        <label className="text-primary-antd" style={{ fontWeight: '500' }}>
          {invoiceNumber}
        </label>
      );
    }
  },
];

export const mockQuotationData: QuotationReportTable[] = [
  {
    quotationCode: "COT-2024-001",
    vehiclePlate: "ABC-123",
    vehicleBrand: "Toyota",
    customerName: "María González",
    entryTime: "2024-01-15 09:30:00",
    priority: "Alta",
    quotationStatus: "Pendiente",
    invoiceNumber: "FAC-001-2024"
  },
  {
    quotationCode: "COT-2024-002",
    vehiclePlate: "XYZ-789",
    vehicleBrand: "Honda",
    customerName: "Carlos Rodríguez",
    entryTime: "2024-01-16 14:20:00",
    priority: "Media",
    quotationStatus: "Cerrada",
    invoiceNumber: "FAC-002-2024"
  },
  {
    quotationCode: "COT-2024-003",
    vehiclePlate: "DEF-456",
    vehicleBrand: "Nissan",
    customerName: "Ana Martínez",
    entryTime: "2024-01-17 11:15:00",
    priority: "Baja",
    quotationStatus: "En Proceso",
    invoiceNumber: "FAC-003-2024"
  }
];