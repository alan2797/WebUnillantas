import { Suspense } from 'react';
import { Route } from 'react-router-dom';
import PublicRoute from './public.route';
import PrivateRoute from './private.route';
import MainLayout from '../components/layout/main-layout.component';
import type { RouteConfig } from '../interfaces/routes.interface';
import Spinner from '../components/spinner/spinner.component';

// Esta función retorna un array de Route elements
export const renderRoutes = (routes: RouteConfig[], isAuthenticated: boolean) => {
  return routes.map((route) => {
    const RouteComponent = route.component;
    
    if (route.isPrivate) {
      // Rutas privadas con layout
      if (route.layout === 'main') {
        return (
          <Route
            key={route.path}
            path={route.path}
            element={
              <PrivateRoute isAuthenticated={isAuthenticated} 
                            requiredPermissions={route?.meta?.permissions || []}>
                <MainLayout />
              </PrivateRoute>
            }
          >
            <Route
              index
              element={
                <Suspense fallback={<Spinner />}>
                  <RouteComponent />
                </Suspense>
              }
            />
          </Route>
        );
      }

      
      // Rutas privadas sin layout
      return (
        <Route
          key={route.path}
          path={route.path}
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Suspense fallback={<Spinner />}>
                <RouteComponent />
              </Suspense>
            </PrivateRoute>
          }
        />
      );
    }
    
    // Rutas públicas
    return (
      <Route
        key={route.path}
        path={route.path}
        element={
          <PublicRoute 
            isAuthenticated={isAuthenticated} 
            restricted={route.isRestricted}
          >
            <Suspense fallback={<Spinner />}>
              <RouteComponent />
            </Suspense>
          </PublicRoute>
        }
      />
    );
  });
};
 