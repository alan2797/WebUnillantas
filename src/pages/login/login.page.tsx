import React, { useEffect, useState } from "react";
import { Form, Button, Alert } from "antd";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ApiResponse, FieldConfig } from "../../interfaces/components.interface";
import { generateZodSchema } from "../../validators/validations";
import type { LoginRequestDto, LoginResponseDto } from "../../interfaces/login.interface";
import { Link, useNavigate } from "react-router-dom";
import { FormField } from "../../components/form-field/form-field.component";
import { localStorageService } from "../../services/localstorage";
import { RoutePaths } from "../../utils/constants";
import AuthLayout from "../../components/layout/auth-layout/auth.layout";
import { configForm } from "./login.config";
import { handleRequestThunk } from "../../utils/handle-request-thunk";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { login, setTempPassword } from "../../redux/features/auth.slice";

const configFormSchema: FieldConfig<LoginRequestDto>[] = configForm();
const loginSchema = generateZodSchema<LoginRequestDto>(configFormSchema);

const Login: React.FC = () => {
  const [attempts, setAttempts] = useState(0);
  const [errorType, setErrorType] = useState<"none" | "wrong" | "temp-wrong" | "blocked">("none");

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LoginRequestDto>({
    resolver: zodResolver(loginSchema),
    defaultValues: configFormSchema.reduce((acc, field) => ({ ...acc, [field.key]: field.valueInitial }), {} as LoginRequestDto),
  });
  const watchUsername = watch("username");
  const watchPassword = watch("password");

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginRequestDto> = async (data) => {
    const result: ApiResponse<LoginResponseDto> | null = await handleRequestThunk(dispatch, () => dispatch(login(data)).unwrap(), {
      showSpinner: true,
      showMessageApi: true
    });
    if(result?.success){
      if(result.data.user?.isTemporaryPassword){
        dispatch(setTempPassword(data?.password ?? ''));
        navigate(RoutePaths.CHANGE_PASSWORD_TEMP);
      }else{
        navigate(RoutePaths.HOME);
      }
    }
  };
 

  useEffect(() => {
    if (errorType !== "none") {
      setErrorType("none");
    }
  }, [watchUsername, watchPassword]);

  useEffect(() => {
    setAttempts(0);
    setErrorType("none");
  }, [watchUsername]);

  /*const onSubmit = (data: any) => {
    const normalizedUsername = data.username?.trim();
    const normalizedPassword = data.password?.trim();
    const user = usersDatabase.find((u) => u.username === normalizedUsername);
    if (!user) {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      if (newAttempts >= 5) {
        setErrorType("blocked");
        return;
      }
      setErrorType("wrong");
      return;
    }

    if (user.isBlocked) {
      setErrorType("blocked");
      return;
    }

    if (user.isTemporal) {
      const isTemporaryPasswordCorrect = normalizedPassword === user.temporaryPassword;

      if (!isTemporaryPasswordCorrect) {
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);

        if (newAttempts >= 5) {
          setErrorType("blocked");
          return;
        }
        setErrorType("temp-wrong");
        return;
      }
      setErrorType("none");
      setAttempts(0);
      navigate(RoutePaths.CHANGE_PASSWORD_TEMP);
      return;
    } else {
      const isPasswordCorrect = normalizedPassword === user.password;

      if (!isPasswordCorrect) {
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        if (newAttempts >= 5) {
          setErrorType("blocked");
          return;
        }
        setErrorType("wrong");
        return;
      }

      setErrorType("none");
      setAttempts(0);
      localStorageService.setToken("token_jwt_aqui");
      navigate(RoutePaths.HOME);
      return;
    }
  };*/
  return (
    <AuthLayout title="Iniciar Sesión" variant="login">
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        {configFormSchema.map((field) => (
          <FormField key={String(field.key)} fieldConfig={field} control={control} error={errors[field.key]?.message as string} />
        ))}
        {errorType !== "blocked" && (
          <div style={{ textAlign: "left", marginTop: -8 }}>
            <Link
              to="/recovery-account"
              style={{
                fontSize: 16,
                fontWeight: 400,
                lineHeight: 4,
                textDecoration: "underline",
                color: "#EC0127",
              }}
            >
              ¿Olvidó su Contraseña?
            </Link>
          </div>
        )}
        {errorType === "wrong" && (
          <Alert message="Usuario o contraseña incorrectos, por favor intente de nuevo" type="error" showIcon style={{ marginBottom: 16 }} />
        )}

        {errorType === "blocked" && (
          <Alert message="Usuario bloqueado, contacte con administración" type="error" showIcon style={{ marginBottom: 16 }} />
        )}

        {errorType === "temp-wrong" && <Alert message="La contraseña temporal no coincide" type="error" showIcon style={{ marginBottom: 16 }} />}
        <Button type="primary" htmlType="submit" block size="large">
          Iniciar Sesión
        </Button>
      </Form>
    </AuthLayout>
  );
};

export default Login;
