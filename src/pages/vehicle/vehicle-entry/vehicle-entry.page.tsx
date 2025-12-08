import React, { useEffect, useState } from 'react';
import { Alert, Button, Card, Col, DatePicker, Dropdown, Row, Select, Space } from 'antd';
import { PlusOutlined, FilterOutlined, DownOutlined } from '@ant-design/icons';
import { CardList } from './components/CardList';
import dayjs from "dayjs";
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '../../../utils/constants';
import { getAllVehicleEntriesService } from '../../../services/vehicle-entry';
import type { ApiResponse } from '../../../interfaces/components.interface';
import type { VehicleEntryFilter, VehicleEntryResponseDto } from '../../../interfaces/vehicle-entry.interface';
import { handleRequestAxios } from '../../../utils/handle-request-axios';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../redux/store';
import ButtonCustom from '../../../components/button/button.component';
import { IconClockDown, IconClockUp, IconFilter2, IconSortAscendingLetters, IconSortDescendingLetters } from '@tabler/icons-react';
import type { MenuProps } from 'antd/lib';


const VehicleEntry: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [openDropDown, setOpenDropDown] = useState(false);
  const [tempFilters, setTempFilters] = useState({dateRange: null as any, status: "TODOS",});
  const [datasource, setDataSource] = useState<VehicleEntryResponseDto[]>([])

  const navigate = useNavigate();
  const menuFiltros = (
  <div
    style={{
      padding: 16,
      width: 250,
      background: "#fff",
      borderRadius: 8,
      boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
    }}
  >
    <DatePicker.RangePicker
      style={{ width: "100%", marginBottom: 12 }}
      format="YYYY-MM-DD"
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
        { value: "INGRESOS", label: "INGRESOS" },
        { value: "SALIDAS", label: "SALIDAS" },
        { value: "TODOS", label: "TODOS" },
      ]}
    />

    <Button
      type="primary"
      style={{ width: "100%" }}
      onClick={() => {
        const [start, end] = tempFilters.dateRange || [];
       const data: VehicleEntryFilter = {
          ...(start && { startDate: start.format("YYYY-MM-DD") }),
          ...(end && { endDate: end.format("YYYY-MM-DD") }),
          ...(tempFilters.status && { statusFilter: tempFilters.status }),
        };    
        getAllVehicleEntries(data)
        setOpenDropDown(false);
      }}
    >
      Aplicar filtros
    </Button>
  </div>
  );

  const items: MenuProps['items'] = [
    {
      label: (
        <a rel="noopener noreferrer" style={{textDecoration:"none"}}>
          <IconClockUp style={{marginRight: 8}}/>
          De más reciente a más antiguo
        </a>
      ),
      key: '0',
    },
    {
      label: (
        <a  rel="noopener noreferrer" style={{textDecoration:"none"}}>
          <IconClockDown style={{marginRight: 8}}/>
          De más antiguo a más reciente
        </a>
      ),
      key: '1',
    },
    {
      label: (
        <a  rel="noopener noreferrer" style={{textDecoration:"none"}}>
          <IconSortAscendingLetters style={{marginRight: 8}}/>
          Alfabeto Ascendente
        </a>
      ),
      key: '2',
    },
    {
      label: (
        <a  rel="noopener noreferrer" style={{textDecoration:"none"}}>
          <IconSortDescendingLetters style={{marginRight: 8}}/>
          Alfabeto Descendente
        </a>
      ),
      key: '3',
    },
  ];

  useEffect(() => {
    getAllVehicleEntries();
  }, []);

  const getAllVehicleEntries = async (params?: VehicleEntryFilter) => {    
    const result: ApiResponse<VehicleEntryResponseDto[]> | null =
    await handleRequestAxios(dispatch, () => getAllVehicleEntriesService(params), {showSpinner: true});
    if (result?.success) {
      setDataSource(result?.data);      
    }else{
      setDataSource([]);
    }
  };

  const handleNuevoIngreso = () => {
    navigate(RoutePaths.VEHICLE_ENTRY_CREATE);
  };

  const handleVerHistorial = (id: number) => {
    console.log('Ver historial de:', id);
  };

  return (
    <div className='p-0 p-md-3 p-lg-5'>
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
          <Button color="danger" variant="outlined" style={{color: "black", borderRadius: 15}}>
          <Space>
            <FilterOutlined />
              Filtros
            <DownOutlined />
            </Space>
            </Button>
        </Dropdown>
        <div className='ms-2' style={{marginTop: -4}}>
          <Dropdown menu={{ items }} trigger={["click"]} placement="bottomRight">
            <a onClick={(e) => e.preventDefault()} style={{textDecoration:"none"}}>
              <ButtonCustom
                  icon={<IconFilter2 />}
                  style={{
                      backgroundColor: "black",
                      color: "white",
                      border: "none",
                      marginRight: 10
                  }}
              />
            </a>
          </Dropdown>
        </div>
        
      </Row>
      <Row gutter={[16, 16]}>
        {datasource?.map((ingreso) => (
          <Col xs={24} key={ingreso.entryId}>
            <CardList
              nombre={ingreso.clienteNombre}
              horaIngreso={dayjs(ingreso.tiempos.ingreso, "HH:mm:ss").format("hh:mm A")}
              horaSalida={dayjs(ingreso.tiempos.salida, "HH:mm:ss").format("hh:mm A")}
              placa={ingreso.vehiculo.placa}
              //imagen={ingreso.vehiculo.marca}
              marca={ingreso.vehiculo.marca}
              modelo={ingreso.vehiculo.modelo}
              color={ingreso.vehiculo.color}
              anio={ingreso.vehiculo.anio}
              tipo={ingreso.estado}
              onVerHistorial={() => handleVerHistorial(ingreso.entryId)}
            />
          </Col>
        ))}
        {datasource.length < 1 && <Col xs={24}>
          <Card className='text-center'>No se encontro información</Card>
        </Col>}
      </Row>

    </div>
  );
};

export default VehicleEntry;