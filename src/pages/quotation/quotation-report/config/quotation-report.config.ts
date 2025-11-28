import type { FieldConfig } from "../../../../interfaces/components.interface";
import type { QuotationReportFilters } from "../../../../interfaces/quotation.interface";
import { FilterQuotationReport } from "../../../../utils/catalogs.constant";

export const configFormFilters = (): FieldConfig<QuotationReportFilters>[] => [
     {
        key: "branchId",
        type: "select",
        label: "Sucursal",
        valueInitial: "",
        options:[],
        typeValue: "string",
        placeholder: "Seleccionar",
        xs: 24,
        md: 6

    },
    {
        key: "positionId",
        type: "text",
        typeValue: "string",
        label: "Estación",
        placeholder: "Seleccionar",
        valueInitial: "",
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
        valueInitial:"",
        placeholder: "Busqueda por Nombre/Placa/Marca",
        typeValue:"string",
        xs:24,
        md:6
    },
    {
        key:"status",
        type:"checkbox",
        label:"Estado",
        options:FilterQuotationReport,
        valueInitial:"",
        typeValue:"string",
        xs:24,
        md:6,
        direction: "horizontal"
    },
]