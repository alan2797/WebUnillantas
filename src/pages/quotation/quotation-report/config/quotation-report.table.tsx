import type { ColumnsType } from "antd/es/table";
import type { QuotationReportTable } from "../../../../interfaces/quotation.interface";
import { Link } from "react-router-dom";
import { Tooltip } from "antd";
import {
  IconFileCheck,
  IconFilePlus,
  IconFileX,
  IconInfoCircleFilled,
} from "@tabler/icons-react";

const getStatusIcon = (stat: string) => {
  switch (stat.toLowerCase()) {
    case "abierta":
      return <IconFileX size={35} style={{ color: "#EC0127" }} />;
    case "cerrada":
      return <IconFileCheck size={35} style={{ color: "#1FC16B" }} />;
    default:
      return <IconFilePlus size={35} style={{ color: "#d9d9d9" }} />;
  }
};

export const columns: ColumnsType<QuotationReportTable> = [
  {
    title: (
      <div style={{ display: "flex", alignItems: "center", justifyContent:"center", gap: 5, textAlign:"left" }}>
        Código
        <br /> de Cotización
        <Tooltip
          title="Haz click en el código para abrir cotización."
          placement="right"
        >
          <IconInfoCircleFilled
            size={22}
            style={{ cursor: "pointer", color: "#EC0127" }}
          />
        </Tooltip>
      </div>
    ),
    dataIndex: "quotationCode",
    key: "quotationCode",
    align: "center",
    render: (value, record) => (
      <Link
        to={`/cotizaciones/${record.id}`}
        className="text-primary-antd"
        style={{ fontWeight: "600" }}
      >
        {value}
      </Link>
    ),
  },
  {
    title: "Placa",
    dataIndex: "vehiclePlate",
    key: "vehiclePlate",
    align: "center",
    render: (plate) => (
      <label style={{ fontFamily: "monospace", fontWeight: "600" }}>
        {plate}
      </label>
    ),
  },
  {
    title: "Marca",
    dataIndex: "vehicleBrand",
    key: "vehicleBrand",
    align: "center",
  },
  {
    title: "Cliente",
    dataIndex: "customerName",
    key: "customerName",
    align: "center",
  },
  {
    title: "Hora de Entrada",
    dataIndex: "entryTime",
    key: "entryTime",
    align: "center",
    render: (entryTime: string) => {
      const formatTime = (dateTime: string) => {
        const date = new Date(dateTime);
        return date
          .toLocaleTimeString("es-ES", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })
          .toUpperCase();
      };

      return formatTime(entryTime);
    },
  },
  {
    title: "Prioridad",
    dataIndex: "priority",
    key: "priority",
    align: "center",
    render: (priority: string) => {
      const getPriorityColor = (prio: string) => {
        switch (prio.toLowerCase()) {
          case "alta":
            return "#ff4d4f";
          case "media":
            return "#faad14";
          case "baja":
            return "#52c41a";
          default:
            return "#d9d9d9";
        }
      };

      return (
        <span
          style={{
            color: getPriorityColor(priority),
            fontSize: "12px",
            fontWeight: "600",
          }}
        >
          {priority}
        </span>
      );
    },
  },
  {
    title: (
      <div style={{ display: "flex", alignItems: "center", gap: 20, justifyContent:"center", textAlign:"center" }}>
        Cotización
        <br />
        Cerrada
      </div>
    ),
    dataIndex: "quotationStatus",
    key: "quotationStatus",
    render: (status: string) => {
      return (
        <div style={{ display: "flex", alignItems: "center", justifyContent:"center" }}>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "50px",
            height: "50px",
            backgroundColor:status.toLowerCase() === "cerrada" ? "#1FC16B1A" : "#EC01271A",
            borderRadius: "50%",
          }}
        >
          {getStatusIcon(status)}
        </span>
        </div>
      );
    },
  },
  {
    title: (
      <div style={{ display: "flex", alignItems: "center", justifyContent:"center", gap: 20}}>
        Cotización
        <br />
        Facturada
      </div>
    ),
    dataIndex: "invoiceNumber",
    key: "invoiceNumber",
    align: "center",
    render: (status: string) => {
      return (
        <div style={{ display: "flex", alignItems: "center", justifyContent:"center" }}>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "50px",
              height: "50px",
              backgroundColor:
                status.toLowerCase() === "cerrada" ? "#1FC16B1A" : "#EC01271A", // fondo suave según estado
              borderRadius: "50%",
            }}
          >
            {getStatusIcon(status)}
          </span>
        </div>
      );
    },
  },
];

export const mockQuotationData: QuotationReportTable[] = [
  {
    id: "1",
    quotationCode: "COT-2024-001",
    vehiclePlate: "ABC-123",
    vehicleBrand: "Toyota",
    customerName: "María González",
    entryTime: "2024-01-15 09:30:00",
    priority: "Alta",
    quotationStatus: "abierta",
    invoiceNumber: "cerrada",
  },
  {
    id: "2",
    quotationCode: "COT-2024-002",
    vehiclePlate: "XYZ-789",
    vehicleBrand: "Honda",
    customerName: "Carlos Rodríguez",
    entryTime: "2024-01-16 14:20:00",
    priority: "Media",
    quotationStatus: "abierta",
    invoiceNumber: "abierta",
  },
  {
    id: "3",
    quotationCode: "COT-2024-003",
    vehiclePlate: "DEF-456",
    vehicleBrand: "Nissan",
    customerName: "Ana Martínez",
    entryTime: "2024-01-17 11:15:00",
    priority: "Baja",
    quotationStatus: "cerrada",
    invoiceNumber: "cerrada",
  },
  {
    id: "4",
    quotationCode: "COT-2024-004",
    vehiclePlate: "DEF-456",
    vehicleBrand: "Nissan",
    customerName: "Ana Martínez",
    entryTime: "2024-01-17 11:15:00",
    priority: "Baja",
    quotationStatus: "cerrada",
    invoiceNumber: "cerrada",
  },
  {
    id: "5",
    quotationCode: "COT-2024-005",
    vehiclePlate: "DEF-456",
    vehicleBrand: "Nissan",
    customerName: "Ana Martínez",
    entryTime: "2024-01-17 11:15:00",
    priority: "Baja",
    quotationStatus: "cerrada",
    invoiceNumber: "cerrada",
  },
  {
    id: "6",
    quotationCode: "COT-2024-007",
    vehiclePlate: "DEF-456",
    vehicleBrand: "Nissan",
    customerName: "Ana Martínez",
    entryTime: "2024-01-17 11:15:00",
    priority: "Baja",
    quotationStatus: "cerrada",
    invoiceNumber: "cerrada",
  },
  {
    id: "7",
    quotationCode: "COT-2024-008",
    vehiclePlate: "DEF-456",
    vehicleBrand: "Nissan",
    customerName: "Ana Martínez",
    entryTime: "2024-01-17 11:15:00",
    priority: "Baja",
    quotationStatus: "cerrada",
    invoiceNumber: "cerrada",
  },
  {
    id: "8",
    quotationCode: "COT-2024-009",
    vehiclePlate: "DEF-456",
    vehicleBrand: "Nissan",
    customerName: "Ana Martínez",
    entryTime: "2024-01-17 11:15:00",
    priority: "Baja",
    quotationStatus: "cerrada",
    invoiceNumber: "cerrada",
  },
];
