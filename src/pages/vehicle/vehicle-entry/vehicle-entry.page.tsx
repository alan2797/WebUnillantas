import React, { useState } from 'react';
import { Button, Col, DatePicker, Dropdown, Form, Popover, Row, Select, Space } from 'antd';
import { PlusOutlined, FilterOutlined, DownOutlined } from '@ant-design/icons';
import { CardList, type Ingreso } from './components/CardList';
import { useForm } from 'react-hook-form';
import type { VehicleEntryConfig } from '../../../interfaces/vehicle-entry.interface';
import type { FieldConfig } from '../../../interfaces/components.interface';
import { buildDefaultValues } from '../../../validators/validations';
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";




// const configFormSchema: FieldConfig<VehicleEntryConfig>[] = configForm();

const VehicleEntry: React.FC = () => {
  const [filters, setFilters] = useState({dateRange: null as any, status: "all"});
  const [openDropDown, setOpenDropDown] = useState(false);
  const [tempFilters, setTempFilters] = useState({dateRange: null as any, status: "all",});
  dayjs.extend(isBetween);

  const [ingresos, setIngresos] = useState<Ingreso[]>([
    {
      id: '1',
      nombre: 'Luis Fernando Umaña Cruz',
      horaIngreso: '7:40 AM',
      horaSalida: '8:40 AM',
      placa: '624-ML1',
      modelo: 'Kia Sedona',
      color: 'Blanco',
      imagen:"https://logo.clearbit.com/chery.cn"
    },
    {
      id: '2',
      nombre: 'Mario Canedo Funes',
      horaIngreso: '10:30 AM',
      horaSalida: '11:30 AM',
      placa: '624-ML1',
      modelo: 'Kia Sedona',
      color: 'Blanco',
      imagen:"https://logo.clearbit.com/toyotacomauto.com"
    },
    {
      id: '3',
      nombre: 'Carlos Miranda Ortega',
      horaIngreso: '10:30 AM',
      horaSalida: '',
      placa: '624-JL5',
      modelo: 'Suzuki Vitara',
      color: 'Blanco',
      imagen:"https://logo.clearbit.com/suzuki.fr"
    },
    {
      id: '4',
      nombre: 'Luis Mendez Foltran',
      horaSalida: '12:45 AM',
      placa: '624-JL5',
      modelo: 'Suzuki Vitara',
      color: 'Blanco',
      imagen:"https://logo.clearbit.com/suzuki.fr"
    }
  ]);

  const menuFiltros = (
  <div
    style={{
      padding: 16,
      width: 250,
      background: "#fff", // <-- fondo blanco siempre
      borderRadius: 8,
      boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
    }}
  >
    <DatePicker.RangePicker
      style={{ width: "100%", marginBottom: 12 }}
      format="DD/MM/YYYY"
      value={tempFilters.dateRange}
      onChange={(value) =>
        setTempFilters((prev) => ({ ...prev, dateRange: value }))
      }
    />

    <Select
      value={tempFilters.status}
      style={{ width: "100%", marginBottom: 12 }}
      onChange={(value) =>
        setTempFilters((prev) => ({ ...prev, status: value }))
      }
      options={[
        { value: "all", label: "Todos" },
        { value: "ingreso", label: "Ingresos" },
        { value: "salida", label: "Salidas" },
      ]}
    />

    <Button
      type="primary"
      style={{ width: "100%" }}
      onClick={() => {
        setFilters(tempFilters); // <-- aquí recién aplicás los filtros reales
        console.log("Filtros aplicados:", tempFilters);
        setOpenDropDown(false);
      }}
    >
      Aplicar filtros
    </Button>
  </div>
);

  const filteredIngresos = ingresos.filter((item) => {
  // Filtrar por estado
  if (filters.status === "ingreso" && item.horaSalida) return false;
  if (filters.status === "salida" && !item.horaSalida) return false;

  // Filtrar por rango de fecha
  if (filters.dateRange) {
    const [start, end] = filters.dateRange;
    const ingresoDate = dayjs("2025-02-10"); // 🔥 Luego lo reemplazas con la fecha REAL del ingreso

    if (!ingresoDate.isBetween(start, end, "day", "[]")) return false;
  }

  return true;
});


  const handleNuevoIngreso = () => {
    console.log('Nuevo ingreso');
    // Aquí abres tu modal o navegas a formulario
  };

  const handleVerHistorial = (id: string) => {
    console.log('Ver historial de:', id);
    // Aquí abres modal de historial
  };

  return (
    <div style={{ padding: 24 }}>
      {/* Botones superiores */}
      <Row  style={{ marginBottom: 16 }}>
        <Col span={24}>
          <Button 
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleNuevoIngreso}
            style={{ backgroundColor: "#ff4d4f", borderColor: "#ff4d4f", marginBottom:"16px" }}
          >
            Nuevo Ingreso
          </Button>
        </Col>

        <Dropdown
          popupRender={()=> menuFiltros}
          trigger={["click"]}
          open={openDropDown}
          onOpenChange={(val) => setOpenDropDown(val)}
          >
          <Button>
          <Space>
            <FilterOutlined />
            Filtros
            <DownOutlined />
            </Space>
            </Button>
        </Dropdown>
      </Row>
      <Row gutter={[16, 16]}>
        {filteredIngresos.map((ingreso) => (
          <Col xs={24} key={ingreso.id}>
            <CardList
              nombre={ingreso.nombre}
              horaIngreso={ingreso.horaIngreso}
              horaSalida={ingreso.horaSalida}
              placa={ingreso.placa}
              imagen={ingreso.imagen}
              modelo={ingreso.modelo}
              color={ingreso.color}
              tipo={ingreso.horaSalida ? 'salida' : 'ingreso'}
              onVerHistorial={() => handleVerHistorial(ingreso.id)}
            />
          </Col>
        ))}
      </Row>

    </div>
  );
};

export default VehicleEntry;