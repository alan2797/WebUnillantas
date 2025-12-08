import type { VehicleEntryFilter } from "../interfaces/vehicle-entry.interface";
import api from "./api";

export const getAllVehicleEntriesService = async (data?: VehicleEntryFilter) => {
  const dataWithDefaults: VehicleEntryFilter = {
    ...data
  };
  const params = Object.fromEntries(Object.entries(dataWithDefaults).filter(([_, value]) => value !== undefined && value !== ""));

  const res = await api.get(`/piso/ingresos`, { params });
  return res;
};

export const getInitialDataBrandColorService = async () => {
  const res = await api.get(`/piso/catalogos/init`);
  return res;
}

export const searchVehicleService = async(type: string, placa: string) => {
  const dataWithDefaults: any = {
    type: type,
    query: placa
  };
  const params = Object.fromEntries(Object.entries(dataWithDefaults).filter(([_, value]) => value !== undefined && value !== ""));

  const res = await api.get(`/piso/vehiculos/buscar`,{ params });
  return res;
}

