// src/services/localStorage.service.ts

import { jwtDecode } from "jwt-decode";
import type { TokenPayload } from "../interfaces/login.interface";
import { LOCAL_STORAGE_PREFIX, TOKEN_KEY } from "../utils/constants";


export const localStorageService = {
  set<T>(key: string, value: T): void {
    try {
      const data = JSON.stringify(value);
      localStorage.setItem(LOCAL_STORAGE_PREFIX + key, data);
    } catch (err) {
      console.error("Error guardando en localStorage", err);
    }
  },

  get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(LOCAL_STORAGE_PREFIX + key);
      return item ? (JSON.parse(item) as T) : null;
    } catch (err) {
      console.error("Error leyendo de localStorage", err);
      return null;
    }
  },

  remove(key: string): void {
    try {
      localStorage.removeItem(LOCAL_STORAGE_PREFIX + key);
    } catch (err) {
      console.error("Error eliminando de localStorage", err);
    }
  },

  clear(): void {
    try {
      localStorage.clear();
    } catch (err) {
      console.error("Error limpiando localStorage", err);
    }
  },

  setToken: (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
  },

  getToken: (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
  },

  removeToken: () => {
    localStorage.removeItem(TOKEN_KEY);
  },

  decode: (): TokenPayload | null => {
    try {
      const token = localStorageService.getToken();
      if (!token) return null;
      return jwtDecode<TokenPayload>(token);
    } catch (error) {
      console.error("Token inválido:", error);
      return null;
    }
  },
  
  isExpired: (): boolean => {
    try {
      const token = localStorageService.getToken();
      if (!token) return true;
      const { exp } = jwtDecode<TokenPayload>(token);
      return Date.now() >= exp * 1000;
    } catch {
      return true;
    }
  },
};
