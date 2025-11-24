import React from "react";
import { Form, Button } from "antd";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import type { FieldConfig } from "../../interfaces/components.interface";
import { generateZodSchema } from "../../validators/validations";
import type { LoginRequestDto } from "../../interfaces/login.interface";
import { useNavigate } from "react-router-dom";
import { FormField } from "../../components/form-field/form-field.component";
import { RoutePaths } from "../../utils/constants";
import AuthLayout from "../../components/layout/auth-layout/auth.layout";
import { usePasswordValidation } from "./utils/usePasswordValidation";
import { configForm } from "./temporary-password.config";

const ChangeTemporaryPassword: React.FC = () => {
  const configFormSchema: FieldConfig<LoginRequestDto>[] = configForm();
  const loginSchema = generateZodSchema<LoginRequestDto>(configFormSchema);
  
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginRequestDto>({
    resolver: zodResolver(loginSchema),
    defaultValues: configFormSchema.reduce(
      (acc, field) => ({ ...acc, [field.key]: field.valueInitial }),
      {} as LoginRequestDto
    ),
    mode: "onChange",
    criteriaMode: "all"
  });

  const navigate = useNavigate();

  // Observar el valor de la contraseña y usar el hook
  const passwordValue = useWatch({
    control,
    name: "newPassword",
    defaultValue: ""
  }) as string;

  const passwordConfirm = useWatch({
    control,
    name: "confirmPassword",
    defaultValue: ""
  }) as string;

  const { validations: passwordValidations, isValid: isPasswordValid } = usePasswordValidation(passwordValue, passwordConfirm);

  const onSubmit = (data: LoginRequestDto) => {    
    console.log(data);
    navigate(RoutePaths.HOME);
  };

  return (
  <AuthLayout
    title="Nueva Contraseña"
    variant="change-password"
  >
    <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
      {configFormSchema.map(field => (
        <FormField 
          key={String(field.key)} 
          fieldConfig={field} 
          control={control} 
          error={errors[field.key as keyof LoginRequestDto]}
        />
      ))}

      {/* ============================ */}
      {/* 🔥 INDICADOR DE FUERZA */}
      {/* ============================ */}

    {(() => {
  const strength = passwordValidations.filter(v => v.type !== "match" && v.isValid).length;

  const level = Math.min(
    3,
    Math.max(0, Math.ceil(strength / 2))   // 1–2 → 1, 3–4 → 2, 5 → 3
  );

  return (
    <div style={{ display: "flex", gap: 6, margin: "4px 0 16px" }}>
      {[1, 2, 3].map(i => (
        <div
          key={i}
          style={{
            flex: 1,
            height: 6,
            borderRadius: 3,
            backgroundColor: i <= level ? "#ff4d4f" : "#000",
            transition: "background-color 0.3s"
          }}
        />
      ))}
    </div>
  );
})()}

      {/* ============================ */}
      {/* 🔹 VALIDACIONES EN TIEMPO REAL */}
      {/* ============================ */}
      {
        <div style={{ margin: "16px 0", padding: "16px", backgroundColor: "transparent", borderRadius: "6px" }}>
          <div style={{ fontWeight: "bold", marginBottom: "12px", fontSize: "14px" }}>
            La contraseña debe tener:
          </div>

          {passwordValidations.map((validation) => (
            <div
              key={validation.type}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "8px"
              }}
            >
              {validation.isValid ? (
                <CheckCircleOutlined style={{ color: "#52c41a" }} />
              ) : (
                <CloseCircleOutlined style={{ color: "#ff4d4f" }} />
              )}
              <span style={{
                color: validation.isValid ? "#52c41a" : "#ff4d4f",
                fontSize: "14px"
              }}>
                {validation.message}
              </span>
            </div>
          ))}
        </div>
      }

      <Button 
        type="primary" 
        htmlType="submit" 
        block 
        size="large"
        loading={isSubmitting}
      >
        Cambiar Contraseña
      </Button>
    </Form>
  </AuthLayout>
);

};

export default ChangeTemporaryPassword;