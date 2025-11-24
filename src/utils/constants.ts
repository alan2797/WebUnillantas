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
  VEHICLE_ENTRY: "/vehicle-entry",

  // Catch all
  NOT_FOUND: "*",
} as const;
