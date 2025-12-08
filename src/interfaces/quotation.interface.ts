export interface QuotationReportFilters extends Record<string, unknown> {
    divisionId?: number;
    stationId?: string;
    startDate?: string;
    endDate?:string;
    search?:string;
    statusFilter?:string;
}

export interface FiltersQuotation {
  divisionId?: number;
  stationId?: number;
  startDate?: string;
  endDate?: string;
  statusFilter?: string;
  search?: string;

}

export interface QuotationReportTable {
    id:string;
    quotationCode?: string;        
    vehiclePlate?: string;         
    vehicleBrand?: string;        
    customerName?: string;     
    entryTime?: string;            
    priority?: string;        
    quotationStatus?: string;      
    invoiceNumber?: string;      
}

export interface CotizacionItem {
  codigoCotizacion: string;
  placa: string;
  marca: string;
  cliente: string;
  horaEntrada: string;
  prioridad: "Alta" | "Baja" | "Media"; // Asumiendo que puede haber "Media" también
  cotizacionCerrada: boolean;
  cotizacionFacturada: boolean;
  fechaCreacion: string; // o Date si lo conviertes
}

export interface PaginationInfo {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface CotizacionesResponse {
  items: CotizacionItem[];
  pagination: PaginationInfo;
}

export interface BranchDto {
  id: number;
  nombre: string;
}

export interface EstacionDto {
  estacionId?: number;
  codigo?: string;
  nombre?: string;
  codigoPuntoVenta?: string;
}

