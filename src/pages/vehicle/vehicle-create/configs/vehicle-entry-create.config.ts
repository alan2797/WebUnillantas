import moment from "moment";
import type { FieldConfig } from "../../../../interfaces/components.interface";
import type { VehicleEntryCreate } from "../../../../interfaces/vehicle-entry.interface";
import { documentTypeOptions, vehicleAniosOptions } from "../../../../utils/catalogs.constant";

export const configForm= (callbacks?: {
  onLicencePlateBlur?: (value: string) => void;
}): FieldConfig<VehicleEntryCreate>[] => [
    {
        key: "documentType",
        type: "select",
        label: "Tipo de Documento",
        valueInitial: "",
        options: [],
        typeValue: "string",
        xs: 24,
        md:8
    },
    {
        key: "licencePlateNumber",
        type: "text",
        typeValue: "string",
        label: "Número ID del Vehiculo",
        valueInitial: "",
        xs: 24,
        md:8,
    },
    {
        key:"entryTime",
        type:"timer",
        label:"Hora Ingreso",
        valueInitial:moment(),
        typeValue:"date",
        disabled:true,
        xs:24,
        md:8
    },
    {
        key:"currentVehicleOwner",
        type:"text",
        label:"Dueño Actual del Vehiculo",
        valueInitial:"",
        typeValue:"string",
        xs:24,
        md:8
    },
    {
        key:"vehicleYear",
        type:"select",
        label:"Año",
        options: vehicleAniosOptions,
        valueInitial:"",
        typeValue:"number",
        xs:24,
        md:8
    },
    {
        key:"vehicleType",
        type:"select",
        label:"Tipo de Vehiculo",
        options:[],
        valueInitial:"",
        typeValue:"number",
        xs:24,
        md:8
    },
]


export const configForm2= (): FieldConfig<VehicleEntryCreate>[] => [
{
  key: "visitReason",
  type: "checkbox",
  label: "Motivo de Visita",
  valueInitial: '',
  typeValue: "string",
  singleSelect: true,
  direction:"horizontal",
  xs: 24,
  options: [],
  styleContainer: {
    border: "1px solid #151515",
    borderRadius: "8px",
    marginTop: "5px",
     padding: "20px 15px"
  }
},
{
  key: "orderType", 
  type: "checkbox",
  label: "Pedido",
  valueInitial: '',
  typeValue: "string",
  singleSelect: true,
  direction:"horizontal",
  xs: 24,
  options: [],
  styleContainer: {
    border: "1px solid #151515",
    borderRadius: "8px",
    marginTop: "5px",
    padding: "20px 15px"
  }
},
]

