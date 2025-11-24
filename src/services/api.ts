import axios from "axios";
import { env } from "../config/env";

const api = axios.create({
  baseURL: env.baseApi,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    /*if (error.response?.status === 401) {
      // Limpiar inmediatamente y hacer logout
      //message.error("No autorizado. Por favor inicia sesión nuevamente.");
      localStorage.removeItem("token");

      // Redirigir al login si no está allí
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }*/

    return Promise.reject(error);
  }
);

export default api;
