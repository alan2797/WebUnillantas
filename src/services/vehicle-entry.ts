import type { VehicleEntryFilter } from "../interfaces/vehicle-entry.interface";
import api from "./api";

export const getAllVehicleEntriesService = async (data?: VehicleEntryFilter) => {
 const dataWithDefaults: VehicleEntryFilter = {
    ...data
  };

  // eliminar campos undefined o vacíos
  const params = Object.fromEntries(Object.entries(dataWithDefaults).filter(([_, value]) => value !== undefined && value !== ""));

  const res = await api.get(`/piso/ingresos`, { params });
  return res;
};