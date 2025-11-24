import type { JSX } from "react";

export interface LoginRequestDto extends Record<string, unknown> {
  username?: string;
  password?: string;
  
}

export interface LoginResponseDto {
  success?: boolean;
  requiresProfileSelection?: boolean;
  requiresBranchSelection?: boolean;
  requiresAreaSelection?: boolean;
  requiresPositionSelection?: boolean;
  token?: string;
  requiresTempPasswordChange?: boolean;
  canSelectOrganization?: boolean;
  tempPassword?: string;
  canSkipSelection?: boolean;
}

export interface TokenPayload {
  userId: string;
  branchId?: number;
  areaId?: number;
  workProfileId?: number;
  positionId?: number;
  username: string;
  isAdmin: boolean;
  iat: number;
  exp: number;
  permissions?: string[];
  firstName?: string;
  lastName?: string;
}

export interface SelectAreaDto {
  areaId: number;
  branchId: number;
}

export interface ForgotUsernameRequestDto extends Record<string, unknown> {
  email?: string;
}

export interface ChangePasswordRequestDto extends Record<string, unknown> {
  tempPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

export interface ChangePasswordUserRequestDto extends Record<string, unknown> {
  userId?: string;
  autoPassword?: boolean;
  password?: string;
  confirmPassword?: string;
}

export interface BlockedUsernameRequestDto extends Record<string, unknown> {
  username?: string;
  email?: string;
}

export interface ForgotUsernameReponse {
  success?: boolean;
  message?: string;
}

export interface BlockedUsernameReponse {
  success?: boolean;
  message?: string;
}

export interface ForgotPasswordRequestDto extends Record<string, unknown> {
  username?: string;
  email?: string;
}

export interface ForgotPasswordReponse {
  success?: boolean;
  message?: string;
}

export interface LoginStepNormalProps {
  user: LoginResponseDto | null;
  onFinish: () => void;
}

export interface StepItemNormal {
  type: "branch" | "department" | "position";
  component: JSX.Element;
}

export interface ChangePasswordResponse {
  success?: boolean;
  error?: string;
  errorCode?: string;
}

export interface SessionConfirmResponse {
  token?: string;
}

export interface StepAdminItem {
  type: "department" | "branch" | "position";
  component: JSX.Element;
}

export interface LoginStepAdminProps {
  user: LoginResponseDto | null;
  onFinish: () => void;
}
