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
    vehicleYear?:string;
    vehicleType?:string;
    vechicleBrand?:string;
    vehicleModel?:string
    vechicleColor?:string;
    visitReason?:string;
    orderType?:string;
}


export interface VehicleEntryFilter {
    startDate?:string
    endDate?:string;
    statusFilter?:string;
}