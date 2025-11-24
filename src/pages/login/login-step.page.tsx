import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { localStorageService } from "../../services/localstorage";
import LoginStepAdmin from "./login-step-admin.page";
import LoginStepNormal from "./login-step-normal.page";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import type { ApiResponse } from "../../interfaces/components.interface";
import type { SessionConfirmResponse } from "../../interfaces/login.interface";
import { handleRequestThunk } from "../../utils/handle-request-thunk";
import { sessionConfirm } from "../../redux/features/auth.slice";

const LoginStep: React.FC = () => {
  const { user, areas, positions } = useSelector(
    (state: RootState) => state.auth
  );
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const decoded = localStorageService.decode();
  const isAdmin = decoded?.isAdmin ?? false;

  useEffect(() => {
    if (!user?.branches) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleFinish = async () => {
    const sessionresult: ApiResponse<SessionConfirmResponse> | null =
      await handleRequestThunk(
        dispatch,
        () => dispatch(sessionConfirm()).unwrap(),
        { showSpinner: true }
      );

    if (sessionresult && sessionresult.success) {
      navigate("/home");
    }
  };

  if (isAdmin) {
    return (
      <LoginStepAdmin
        user={user}
        areas={areas ?? []}
        positions={positions ?? []}
        onFinish={handleFinish}
      />
    );
  }

  return <LoginStepNormal user={user} onFinish={handleFinish} />;
};

export default LoginStep;
