import type { FieldConfig } from "../../interfaces/components.interface";
import type { LoginRequestDto } from "../../interfaces/login.interface";
import { LockOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';

export const configForm = (): FieldConfig<LoginRequestDto>[] => [
  {
    key: "username",
    type: "text",
    label: "Usuario",
    placeholder: "ej. jhon.doe@unillantas.com",
    valueInitial: "",
    typeValue: "string",
    xs: "12",
    prefix: <UserOutlined style={{color:"#A4A4A4"}}/>,
    validations: [
      { type: "required", message: "El email es obligatorio" },
      { type: "min", value: 3, message: "Mínimo 3 caracteres" }
    ],
  },

  {
    key: "password",
    type: "password",
    label: "Contraseña",
    placeholder: "Ingresa tu contraseña",
    valueInitial: "",
    typeValue: "string",
    xs: "12",
    prefix: <LockOutlined style={{color:"#A4A4A4"}}/>,
    validations: [
      { type: "required", message: "La contraseña es obligatoria" },
      { type: "min", value: 3, message: "Mínimo 3 caracteres" },
    ],
  },
];
