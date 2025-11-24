import { lazy } from 'react';
import { RoutePaths } from '../utils/constants';
import type { RouteConfig } from '../interfaces/routes.interface';


const Unauthorized = lazy(() => import('../pages/unauthorized/unauthorized.page'));
// Lazy loading de componentes
const Login = lazy(() => import('../pages/login/login.page'));
const HomePage = lazy(() => import('../pages/home/home.page'));
const RecoveryAccount = lazy(() => import('../pages/recovery-account/recovery.page'));
const ChangeTemporaryPassword = lazy(() => import('../pages/temporary-password/temporary-password.page'));
const VehicleEntry = lazy(() => import('../pages/vehicle/vehicle-entry/vehicle-entry.page'));



export const publicRoutes: RouteConfig[] = [
  {
    path: RoutePaths.LOGIN,
    component: Login,
    isPrivate: false,
    isRestricted: true,
    title: 'Iniciar Sesión'
  },
  {
    path: RoutePaths.RECOVERY_ACCOUNT,
    component: RecoveryAccount,
    isPrivate: false,
    isRestricted: true,
    title: 'Recuperar Cuenta'
  },
  {
    path: RoutePaths.CHANGE_PASSWORD_TEMP,
    component: ChangeTemporaryPassword,
    isPrivate: false,
    isRestricted: true,
    title: 'Cambiar Contraseña'
  },
];

export const privateRoutes: RouteConfig[] = [
  {
    path: RoutePaths.UNAUTHORIZED,
    component: Unauthorized,
    isPrivate: true,
  },
  {
    path: RoutePaths.HOME,
    component: HomePage,
    isPrivate: true,
    layout: 'main',
    title: 'Inicio'
  },
  {
    path: RoutePaths.VEHICLE_ENTRY,
    component: VehicleEntry,
    isPrivate: true,
    layout: 'main',
    title: 'Entrada de Vehiculo'
  },
  
];

export const allRoutes = [...publicRoutes, ...privateRoutes];