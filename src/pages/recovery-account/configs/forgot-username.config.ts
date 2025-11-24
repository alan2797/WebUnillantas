import type { FieldConfig } from "../../../interfaces/components.interface";
import type { ForgotUsernameRequestDto } from "../../../interfaces/login.interface";

export const configForm =
  (): FieldConfig<ForgotUsernameRequestDto>[] => [
    {
      key: "email",
      type: "text",
      typeValue: "string",
      label: "Usuario",
      valueInitial: "",
      xs: 24,
      validations: [{ type: "required" }],
    },
  ];
