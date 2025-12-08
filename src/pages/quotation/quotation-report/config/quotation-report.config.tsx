import { IconPlane, IconSearch } from "@tabler/icons-react";
import type { FieldConfig } from "../../../../interfaces/components.interface";
import type { QuotationReportFilters } from "../../../../interfaces/quotation.interface";
import { FilterQuotationReport } from "../../../../utils/catalogs.constant";

export const configFormFilters = (): FieldConfig<QuotationReportFilters>[] => [
     {
        key: "divisionId",
        type: "select",
        label: "Sucursal",
        valueInitial: "",
        options:[{
            value: 1,
            label: "Sucursal 1"
        },
        {
            value: 2,
            label: "Sucursal 2"
        }],
        typeValue: "number",
        placeholder: "Seleccionar",
        xs: 24,
        md: 6

    },
    {
        key: "stationId",
        type: "select",
        typeValue: "string",
        label: "Estación",
        placeholder: "Seleccionar",
        valueInitial: "",
        options:[],
        xs: 24,
        md: 6
    },
    {
        key:"startDate",
        type:"date",
        label:"Desde",
        typeValue:"date",
        xs:24,
        md:6
    },
    {
        key:"endDate",
        type:"date",
        label:"Hasta",
        valueInitial:"",
        typeValue:"string",
        xs:24,
        md:6
    },
    {
        key:"search",
        type:"text",
        label:"Buscar",
        prefix:<IconSearch size={20} color="#A4A4A4"/>,
        valueInitial:"",
        placeholder: "Busqueda por Nombre/Placa/Marca",
        typeValue:"string",
        xs:24,
        md:6
    },
    {
        key:"statusFilter",
        type:"checkbox",
        label:"Estado",
        options:FilterQuotationReport,
        singleSelect:true,
        valueInitial:"",
        typeValue:"string",
        xs:24,
        md:6,
        direction: "horizontal"
    },
]

