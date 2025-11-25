export interface VehicleEntryConfig extends Record<string, unknown> {
    vehicleStatus?: string;
    rangeDate?: string;
}


export interface VehicleEntryCreate extends Record<string, unknown> {
    documentType?: string;
    licencePlateNumber?: string;
    entryTime?: string;
    currentVehicleOwner?:string;
    vehicleYear?:string;
    vehicleType?:string;
    vechicleBrand?:string[];
    vehicleModel?:string
    vechicleColor?:string[];
    visitReason?:string;
    orderType?:string;
}
