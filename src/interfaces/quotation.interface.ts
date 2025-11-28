export interface QuotationReportFilters extends Record<string, unknown> {
    branchId?: string;
    positionId?: string;
    startDate?: string;
    endDate?:string;
    search?:string;
    status?:string;
}

export interface QuotationReportTable {
    quotationCode?: string;        
    vehiclePlate?: string;         
    vehicleBrand?: string;        
    customerName?: string;     
    entryTime?: string;            
    priority?: string;        
    quotationStatus?: string;      
    invoiceNumber?: string;      
}
