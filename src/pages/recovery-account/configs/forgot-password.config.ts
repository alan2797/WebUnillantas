import type { FieldConfig } from "../../../interfaces/components.interface";
import type { ForgotPasswordRequestDto } from "../../../interfaces/login.interface";

export const configFormForgotPassword =
  (): FieldConfig<ForgotPasswordRequestDto>[] => [
    {
      key: "username",
      type: "text",
      label: "Ingrese su usuario",
      typeValue: "string",
      valueInitial: "",
      xs: 24,
      validations: [{ type: "required" }],
    },
    {
      key: "email",
      type: "text",
      label: "Ingrese su correo",
      typeValue: "string",
      valueInitial: "",
      xs: 24,
      validations: [{ type: "required" }, { type: "email" }],
    },
  ];
