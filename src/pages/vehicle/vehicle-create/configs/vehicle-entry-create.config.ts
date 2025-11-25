import moment from "moment";
import type { FieldConfig } from "../../../../interfaces/components.interface";
import type { VehicleEntryCreate } from "../../../../interfaces/vehicle-entry.interface";



export const configForm= (): FieldConfig<VehicleEntryCreate>[] => [
     {
        key: "documentType",
        type: "select",
        label: "Tipo de Documento",
        valueInitial: "",
        options:[],
        typeValue: "string",
        xs: 8,
    },
    {
        key: "licencePlateNumber",
        type: "text",
        typeValue: "string",
        label: "Placa",
        valueInitial: "",
        xs: 8,
    },
    {
        key:"entryTime",
        type:"timer",
        label:"Hora Ingreso",
        valueInitial:moment(),
        typeValue:"string",
        disabled:true,
        xs:8
    },
    {
        key:"currentVehicleOwner",
        type:"text",
        label:"Dueño Actual del Vehiculo",
        valueInitial:"",
        typeValue:"string",
        xs:8,
    },
    {
        key:"vehicleYear",
        type:"text",
        label:"Año",
        valueInitial:"",
        typeValue:"string",
        xs:8,
    },
    {
        key:"vehicleType",
        type:"text",
        label:"Tipo de Vehiculo",
        valueInitial:"",
        typeValue:"string",
        xs:8,
    },

{
  key: "vehicleBrand",
  type: "checkbox",
  label: "Marca",
  valueInitial: '',
  typeValue: "string",
  displayMode: "image",
  singleSelect: true,
  xs: 24,
  options: [
    { value: "kia", label: "KIA", image: "https://logo.clearbit.com/suzuki.fr" },
    { value: "toyota", label: "TOYOTA", image: "https://logo.clearbit.com/toyotacomauto.com" },
    { value: "chery", label: "CHERY", image: "https://logo.clearbit.com/chery.cn" },
    { value: "chery22", label: "CHERY", image: "https://logo.clearbit.com/chery.cn" },
    { value: "chery3", label: "CHERY", image: "https://logo.clearbit.com/chery.cn" },
  ],
},
{
  key: "vehicleColor", 
  type: "checkbox",
  label: "Color",
  valueInitial: '',
  typeValue: "string", 
  displayMode: "color",
  singleSelect: true,
  xs: 24,
  options: [
    { value: "azul", label: "Azul", color: "#4A90E2" },
    { value: "rojo", label: "Rojo", color: "red" },
    { value: "amarillo", label: "Amarillo", color: "yellow" },
    { value: "verde", label: "Verde", color: "green" },
    { value: "rosado", label: "Rosado", color: "pink" },
  ],
},
]

