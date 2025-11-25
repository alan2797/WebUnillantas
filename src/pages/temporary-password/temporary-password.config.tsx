import { LockOutlined } from "@ant-design/icons";
import type { FieldConfig } from "../../interfaces/components.interface";
import type { ChangePasswordRequestDto } from "../../interfaces/login.interface";

export const configForm = (): FieldConfig<ChangePasswordRequestDto>[] => [
  {
    key: "newPassword",
    type: "password",
    label: "Ingresa Nueva Contraseña",
    valueInitial: "",
    typeValue: "string",
    prefix: <LockOutlined style={{ color: "#A4A4A4" }} />,
    validations: [{ type: "required" }],
    xs: 24,
  },
  {
    key: "confirmNewPassword",
    type: "password",
    typeValue: "string",
    label: "Confirma Nueva Contraseña",
    prefix: <LockOutlined style={{ color: "#A4A4A4" }} />,
    valueInitial: "",
    validations: [{ type: "required" }],
    xs: 24,
  },
];
