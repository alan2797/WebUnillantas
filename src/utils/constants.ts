export const TOKEN_KEY = "token";
export const LOCAL_STORAGE_PREFIX = "app_";
export const RoutePaths = {
  // Public routes
  UNAUTHORIZED: "/unauthorized",
  LOGIN: "/login",
  RECOVERY_ACCOUNT: "/recovery-account",
  CHANGE_PASSWORD_TEMP: "/change-temp-password",

  // Private routes
  HOME: "/",
  VEHICLE_ENTRY: "/ingreso-vehiculo",
  VEHICLE_ENTRY_CREATE: "/crear-ingreso-vehiculo",
  QUOTATION_REPORT: "/reporte-cotizacion",

  // Catch all
  NOT_FOUND: "*",
} as const;
