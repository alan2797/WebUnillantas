import api from "./api";

export const getCountriesService = async () => {
  const res = await api.get(`/catalogs/countries`);
  return res;
};

export const getBranchesService = async () => {
  const res = await api.get(`/catalogs/branches`);
  return res;
};


export const getPermissionsService = async () => {
  const res = await api.get(`/permissions`);
  return res;
};

export const getDocumentTypesService = async () => {
  const res = await api.get(`/piso/opciones-busqueda-vehiculo`);
  return res;
}

export const getVehicleTypesService = async () => {
  const res = await api.get(`/catalogos/tipos-vehiculo`);
  return res;
}

export const getBrandsService = async (search?: string) => {
  const dataWithDefaults: any = {
    search: search ?? undefined
  };
  const params = Object.fromEntries(Object.entries(dataWithDefaults).filter(([_, value]) => value !== undefined && value !== ""));
  
  const res = await api.get(`/catalogos/marcas`, {params});
  return res;
}

export const getModelsService = async (marcaId: number) => {
  const dataWithDefaults: any = {
    marcaId: marcaId
  };
  const params = Object.fromEntries(Object.entries(dataWithDefaults).filter(([_, value]) => value !== undefined && value !== ""));
  
  const res = await api.get(`/catalogos/modelos`, {
    params
  });
  return res;
}

export const getColorsService = async (search?: string) => {
  const dataWithDefaults: any = {
    search: search ?? undefined
  };
  const params = Object.fromEntries(Object.entries(dataWithDefaults).filter(([_, value]) => value !== undefined && value !== ""));
  
  const res = await api.get(`/catalogos/colores`, {params});
  return res;
}

export const getEntryOptionsService = async () => {
  const res = await api.get(`/piso/opciones-ingreso`);
  return res;
}

export const getRejectOptionsService = async () => {
  const res = await api.get(`/piso/motivos-cancelacion`);
  return res;
}

export const getBranchService = async () => {
  const res = await api.get(`/piso/divisiones`);
  return res;
}

export const getEstacionesByBranchIdService = async (branchId: number) => {
  const res = await api.get(`/piso/cotizaciones/estaciones?divisionId=${branchId}`);
  return res;
}
 
