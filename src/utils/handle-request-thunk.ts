import { type AppDispatch } from "../redux/store";
import { showSpinner, hideSpinner } from "../redux/features/spinner.slice";
import { message } from "antd";
import type {
  ApiResponse,
  HandleOptions,
} from "../interfaces/components.interface";
import { logout } from "../redux/features/auth.slice";
import { handleApiError } from "./error-handler";

export async function handleRequestThunk<T>(
  dispatch: AppDispatch,
  thunkAction: () => Promise<ApiResponse<T>>,
  options: HandleOptions = {}
): Promise<ApiResponse<T> | null> {
  const {
    showSpinner: show = true,
    successMessage,
    errorMessage,
    showMessageApi,
  } = options;

  try {
    if (show) dispatch(showSpinner());

    const result = await thunkAction();
    if (result && result.success) {
      if (successMessage) message.success(successMessage);
      if (showMessageApi && result.message) message.success(result.message);
    } else {
      if (errorMessage) message.error(errorMessage);
      if (
        showMessageApi &&
        (result?.message ||
          (result?.error && typeof result?.error === "string"))
      ) {
        message.error(result.message || String(result?.error));
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
