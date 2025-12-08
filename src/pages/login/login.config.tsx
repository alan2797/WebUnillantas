import type { FieldConfig } from "../../interfaces/components.interface";
import type { LoginRequestDto } from "../../interfaces/login.interface";
import { LockOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';

export const configForm = (): FieldConfig<LoginRequestDto>[] => [
  {
    key: "username",
    type: "text",
    label: "Usuario",
    placeholder: "ej. usuario 123",
    valueInitial: "",
    typeValue: "string",
    xs: "12",
    prefix: <UserOutlined style={{color:"#A4A4A4"}}/>,
    validations: [
      { type: "required", },
      { type: "min", value: 3 }
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
      { type: "required"},
      { type: "min", value: 3 },
    ],
  },
];
