import { type AppDispatch } from "../redux/store";
import { showSpinner, hideSpinner } from "../redux/features/spinner.slice";
import { message, notification } from "antd";
import type { AxiosResponse } from "axios";
import type { ApiResponse, HandleOptions } from "../interfaces/components.interface";
import { logout } from "../redux/features/auth.slice";
import { handleApiError } from "./error-handler";

export async function handleRequestAxios<T>(
  dispatch: AppDispatch,
  apiCall: () => Promise<AxiosResponse<ApiResponse<T>>>,
  options: HandleOptions = {}
): Promise<ApiResponse<T> | null> {
  const { showSpinner: show = true, successMessage, errorMessage, showMessageApi } = options;

  try {
    if (show) dispatch(showSpinner());

    const response = await apiCall();
    const result = response.data;

    if (result?.success) {
      if (successMessage) notification.success({ message: successMessage, duration: 5, placement: "top" });
      if (showMessageApi && result.message) notification.success({ message: result.message, duration: 5, placement: "top" });
    } else {
      if (errorMessage) notification.error({ message: errorMessage, duration: 5, placement: "top" });
      if (showMessageApi && (result?.message || (result?.error && typeof result?.error === "string"))) {
        notification.error({ message: result.message || String(result?.error), duration: 5, placement: "top" });
      }
    }

    return result;
  } catch (err: any) {
    const status = err.response?.status;
    const serverMessage = err.response?.data?.message;
    const serverErrors = err.response?.data?.error?.errors;
    const errorMessage = err.message;

    handleApiError({
      status: status || 0,
      serverMessage,
      errorMessage,
      serverErrors,
      onUnauthorized: () => dispatch(logout()),
    });

    return null;
  } finally {
    if (show) dispatch(hideSpinner());
  }
}
