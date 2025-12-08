import type { BaseOption } from "./components.interface";

export interface VehicleEntryConfig extends Record<string, unknown> {
    vehicleStatus?: string;
    rangeDate?: string;
}

export interface VehiculoDto {
  marca: string;
  modelo: string;
  color: string;
  placa: string;
  anio: number;
}

export interface TiemposDto {
  ingreso: string;
  salida: string;
}


export interface VehicleEntryResponseDto {
  entryId: number;
  clienteNombre: string;
  vehiculo: VehiculoDto;
  tiempos: TiemposDto;
  estado: string;
}


export interface VehicleEntryCreate extends Record<string, unknown> {
    documentType?: string;
    licencePlateNumber?: string;
    entryTime?: string;
    currentVehicleOwner?:string;
    vehicleYear?:number;
    vehicleType?:number;
    vechicleBrand?:number;
    vehicleModel?:number
    vechicleColor?:number;
    visitReason?:string;
    orderType?:string;
}


export interface VehicleEntryFilter {
    startDate?:string
    endDate?:string;
    statusFilter?:string;
}

// Interfaces para Marcas
export interface Marca {
  id: number;
  nombre: string;
  isPopular: boolean;
  logoUrl: string;
  displayOrder: number;
}

// Interfaces para Colores
export interface Color {
  id: number;
  nombre: string;
  colorHex: string;
  isPopular: boolean;
  displayOrder: number;
}

// Interface principal que contiene ambas listas
export interface MarcasColoresData {
  marcas: Marca[];
  colores: Color[];
}

// Interfaces para Motivos de Visita
export interface MotivoVisitaOption {
  value: string;
  label: string;
}

// Interfaces para Tipos de Pedido
export interface TipoPedidoOption {
  value: string;
  label: string;
}



// Interface principal que contiene ambas listas
export interface OpcionesMotivosPedidos {
  motivosVisita: MotivoVisitaOption[];
  tiposPedido: TipoPedidoOption[];
}

export interface OpcionesTipoDocumento {
  tiposBusqueda?: BaseOption[]
}

export interface OpcionesTiposVehiculo {
  count?: number;
  results?: TiposVehiculo[];
}

export interface TiposVehiculo {
  tipo_vehiculo_id?: number;
  nombre?: string;
}

export interface TipoVehiculo {
  tipo_vehiculo_id: number;
  nombre: string;
}

export interface MarcaEncontrado {
  marca_id: number;
  nombre: string;
}

export interface ModeloEncontrado {
  modelo_id: number;
  nombre: string;
}

export interface ColorEncontrado {
  color_id: number;
  nombre: string;
}

export interface VehiculoEncontrado {
  vehiculo_id: number;
  placa: string;
  tipo_vehiculo: TipoVehiculo;
  marca: MarcaEncontrado;
  modelo: ModeloEncontrado;
  color: ColorEncontrado;
  anio: number;
  nochasisvin: string | null;
  numeropoliza: string | null;
}

export interface Cliente {
  cliente_id: number;
  nombre_completo: string;
  dui: string | null;
}

export interface VehiculoData {
  vehiculo: VehiculoEncontrado;
  cliente: Cliente;
}