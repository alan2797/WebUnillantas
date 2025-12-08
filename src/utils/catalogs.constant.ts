export const rolOptions = [
  { value: "adm", label: "Admin" },
  { value: "ven", label: "Vendedor" },
  { value: "sup", label: "Supervisor" },
];

 export const FilterVehicleEntryOptions =[
  { value: "1", label: "Ingreso" },
  { value: "2", label: "Salida" },
  { value: "3", label: "Ambos" },
]

export const FilterQuotationReport =[
  { value: "CERRADO", label: "Cerrado" },
  { value: "FACTURADO", label: "Facturado" },
]

export const documentTypeOptions = [
  {
    value: "PLACA",
    label: "Placa"
  },
  {
    value: "POLIZA",
    label: "Póliza"
  },
  {
    value: "VIN",
    label: "VIN"
  },
]

export const getVehicleYearOptions = (startYear = 1980) => {
  const currentYear = new Date().getFullYear();
  return Array.from(
    { length: currentYear - startYear + 1 },
    (_, index) => ({
      value: currentYear - index,
      label: (currentYear - index).toString()
    })
  );
};
export const vehicleAniosOptions = getVehicleYearOptions();