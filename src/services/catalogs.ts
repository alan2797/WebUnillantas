import api from "./api";

export const getAreasService = async (branchId: number) => {
  const res = await api.get(`/catalogs/branches/${branchId}/areas`);
  return res;
};

export const getPositionsService = async (areaId: number) => {
  const res = await api.get(`/catalogs/areas/${areaId}/positions`);
  return res;
};

export const getCountriesService = async () => {
  const res = await api.get(`/catalogs/countries`);
  return res;
};

export const getBranchesService = async () => {
  const res = await api.get(`/catalogs/branches`);
  return res;
};

export const getNationalitiesService = async () => {
  const res = await api.get(`/catalogs/nationalities`);
  return res;
};

export const getDepartmentsService = async () => {
  const res = await api.get(`/catalogs/departments`);
  return res;
};

export const getMunicipalitiesService = async (departmentId: number) => {
  const res = await api.get(`/catalogs/departments/${departmentId}/municipalities`);
  return res;
};

export const getGroupsService = async () => {
  const res = await api.get(`/permissions/roles`);
  return res;
};

export const getPermissionsService = async () => {
  const res = await api.get(`/permissions`);
  return res;
};

export const getEducationsService = async () => {
  const res = await api.get(`/catalogs/educacion`);
  return res;
};

export const getOccupationsService = async () => {
  const res = await api.get(`/catalogs/ocupaciones`);
  return res;
};

export const getCategoriesService = async () => {
  const res = await api.get(`/catalogs/categorias`);
  return res;
};

export const getCountriesCodeService = async () => {
  const res = await api.get(`/catalogs/countries`);
  return res;
};
