import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth.slice";
import spinnerReducer from "./features/spinner.slice";
import catalogsReducer from "./features/catalogs.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    spinner: spinnerReducer,
    catalogs: catalogsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
