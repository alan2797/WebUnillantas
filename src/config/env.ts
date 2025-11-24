// src/config/env.ts
export const env = {
  baseApi: import.meta.env.VITE_BASE_API,
  baseHref: import.meta.env.VITE_BASE_HREF,
  appTitle: import.meta.env.VITE_APP_TITLE,
  isProduction: import.meta.env.PROD,
};
