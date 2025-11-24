import type { ComponentType, LazyExoticComponent, ReactNode } from "react";

export interface RouteConfig {
  path: string;
  component: LazyExoticComponent<ComponentType<any>>;
  isPrivate: boolean;
  isRestricted?: boolean;
  layout?: "main" | "none" | "expedient";
  title?: string;
  meta?: {
    requiresEmailVerification?: boolean;
    requiresPasswordChange?: boolean;
    permissions?: string[];
  };
}

export interface RouteRendererProps {
  routes: RouteConfig[];
  isAuthenticated: boolean;
}

export interface RoutesProps {
  isAuthenticated: boolean;
}

export interface AppMenuItem {
  key?: string;
  label?: ReactNode;
  icon?: ReactNode;
  type?: "group" | "divider";
  children?: AppMenuItem[];
  permissions?: string[]; // 👈 Campo personalizado
}
