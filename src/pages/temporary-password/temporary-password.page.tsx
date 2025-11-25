import React, { useEffect } from "react";
import { Form, Button } from "antd";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import type { ApiResponse, FieldConfig } from "../../interfaces/components.interface";
import { generateZodSchema } from "../../validators/validations";
import type { ChangePasswordDto, ChangePasswordRequestDto, LoginRequestDto } from "../../interfaces/login.interface";
import { useNavigate } from "react-router-dom";
import { FormField } from "../../components/form-field/form-field.component";
import { RoutePaths } from "../../utils/constants";
import AuthLayout from "../../components/layout/auth-layout/auth.layout";
import { usePasswordValidation } from "./utils/usePasswordValidation";
import { configForm } from "./temporary-password.config";
import { handleRequestThunk } from "../../utils/handle-request-thunk";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { changePassword } from "../../redux/features/auth.slice";

const ChangeTemporaryPassword: React.FC = () => {
  const configFormSchema: FieldConfig<ChangePasswordRequestDto>[] = configForm();
  const loginSchema = generateZodSchema<ChangePasswordRequestDto>(configFormSchema);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordRequestDto>({
    resolver: zodResolver(loginSchema),
    defaultValues: configFormSchema.reduce((acc, field) => ({ ...acc, [field.key]: field.valueInitial }), {} as ChangePasswordRequestDto),
    mode: "onChange",
    criteriaMode: "all",
  });

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const tempPassword = useSelector((state: RootState) => state.auth.tempPassword);
  const tempToken = useSelector((state: RootState) => state.auth.tempToken);

  const passwordValue = useWatch({
    control,
    name: "newPassword",
    defaultValue: "",
  }) as string;

  const passwordConfirm = useWatch({
    control,
    name: "confirmPassword",
    defaultValue: "",
  }) as string;

  const { validations: passwordValidations, isValid: isPasswordValid } = usePasswordValidation(passwordValue, passwordConfirm);

  useEffect(() => {
    if (!tempPassword) navigate(RoutePaths.LOGIN);
  }, [tempPassword, navigate]);

  const onSubmit = async(data: ChangePasswordRequestDto) => {
    console.log(data);
    //navigate(RoutePaths.HOME);
    data.oldPassword = tempPassword ?? "";
    let body: ChangePasswordDto = {
      password: data,
      token: tempToken ?? ""
    }
    const result: ApiResponse<boolean> | null = await handleRequestThunk(dispatch, () => dispatch(changePassword(body)).unwrap(), {
      showSpinner: true,
      showMessageApi: true
    });
    if(result?.success){
      navigate(RoutePaths.HOME);
    }
  };

  return (
    <AuthLayout title="Nueva Contraseña" variant="change-password">
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        {configFormSchema.map((field) => (
          <FormField key={String(field.key)} fieldConfig={field} control={control} error={errors[field.key as keyof ChangePasswordRequestDto]} />
        ))}
        {(() => {
          const strength = passwordValidations.filter((v) => v.type !== "match" && v.isValid).length;

          const level = Math.min(
            3,
            Math.max(0, Math.ceil(strength / 2))
          );

          return (
            <div style={{ display: "flex", gap: 6, margin: "4px 0 16px" }}>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: i <= level ? "#ff4d4f" : "#000",
                    transition: "background-color 0.3s",
                  }}
                />
              ))}
            </div>
          );
        })()}
        {
          <div style={{ margin: "16px 0", padding: "16px", backgroundColor: "transparent", borderRadius: "6px" }}>
            <div style={{ fontWeight: "bold", marginBottom: "12px", fontSize: "14px" }}>La contraseña debe tener:</div>

            {passwordValidations.map((validation) => (
              <div
                key={validation.type}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "8px",
                }}
              >
                {validation.isValid ? <CheckCircleOutlined style={{ color: "#52c41a" }} /> : <CloseCircleOutlined style={{ color: "#ff4d4f" }} />}
                <span
                  style={{
                    color: validation.isValid ? "#52c41a" : "#ff4d4f",
                    fontSize: "14px",
                  }}
                >
                  {validation.message}
                </span>
              </div>
            ))}
          </div>
        }

        <Button type="primary" htmlType="submit" block size="large" loading={isSubmitting} disabled={!!passwordValidations.find(item => item.isValid == false)}>
          Cambiar Contraseña
        </Button>
      </Form>
    </AuthLayout>
  );
};

export default ChangeTemporaryPassword;
