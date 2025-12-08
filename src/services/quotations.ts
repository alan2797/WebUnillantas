import moment from "moment";
import type { FiltersQuotation, QuotationReportFilters } from "../interfaces/quotation.interface";
import api from "./api";

export const getAllQuotationsService = async (data?: QuotationReportFilters) => {
  const dataWithDefaults: QuotationReportFilters = {
    ...data
  };
  if(data?.startDate){
    dataWithDefaults.startDate = moment(data.startDate).format("YYYY-MM-DD");
  }
  if(data?.endDate){
    dataWithDefaults.endDate = moment(data.endDate).format("YYYY-MM-DD");
  }
  delete dataWithDefaults.divisionId;
  const params = Object.fromEntries(Object.entries(dataWithDefaults).filter(([_, value]) => value !== undefined && value !== ""));

  const res = await api.get(`/piso/cotizaciones`, { params });
  return res;
};