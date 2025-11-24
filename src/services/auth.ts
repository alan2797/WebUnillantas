import type {
  BlockedUsernameRequestDto,
  ChangePasswordRequestDto,
  ForgotPasswordRequestDto,
  ForgotUsernameRequestDto,
  LoginRequestDto,
} from "../interfaces/login.interface";
import api from "./api";

export const authService = async (data: LoginRequestDto) => {
  const res = await api.post("/auth/login", data);
  return res;
};

export const recoveryUsernameService = async (data: ForgotUsernameRequestDto) => {
  const res = await api.post("/auth/recovery/username", data);
  return res;
};

export const blockedUsernameService = async (data: BlockedUsernameRequestDto) => {
  const res = await api.post("/auth/recovery/unlock-user", data);
  return res;
};

export const forgotPasswordService = async (data: ForgotPasswordRequestDto) => {
  const res = await api.post("/auth/recovery/password", data);
  return res;
};

export const changePasswordTempService = async (data: ChangePasswordRequestDto, resetToken: string) => {
  const res = await api.post("/auth/change-temp-password?token=" + resetToken, data);
  return res;
};

export const changePasswordService = async (data: ChangePasswordRequestDto) => {
  const res = await api.post("/auth/change-password", data);
  return res;
};

export const permissionsUserService = async () => {
  const res = await api.get("/permissions/me");
  return res;
};
