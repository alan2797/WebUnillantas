import React, { useEffect, useState } from "react";
import { Row, Col,  Form, Button, Alert } from "antd";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ApiResponse, FieldConfig } from "../../interfaces/components.interface";
import { generateZodSchema } from "../../validators/validations";
import type { LoginRequestDto, LoginResponseDto } from "../../interfaces/login.interface";
import { Link, useNavigate } from "react-router-dom";
import { FormField } from "../../components/form-field/form-field.component";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { login, setTempPassword } from "../../redux/features/auth.slice";
import { handleRequestThunk } from "../../utils/handle-request-thunk";
import { localStorageService } from "../../services/localstorage";
import { RoutePaths } from "../../utils/constants";
import { env } from "../../config/env";
import { useIndexedDB } from "../../hooks/use-indexed-db";
import AuthLayout from "../../components/layout/auth-layout/auth.layout";
import { configForm } from "./configs/forgot-username.config";

const configFormSchema: FieldConfig<LoginRequestDto>[] = configForm();
const loginSchema = generateZodSchema<LoginRequestDto>(configFormSchema);

/// ELIMINAR SOLO PARA PRUEBAS
// types/user.types.ts
interface User {
  id: string;
  username: string;
  password: string;
  temporaryPassword?: string;
  isTemporal: boolean;
  isBlocked?: boolean;
  name?: string;
}


const RecoveryPage: React.FC = () => {

  //estados para manejar los intentos y errores
  const [attempts, setAttempts] = useState(0);
  const [errorType, setErrorType] = useState<"none" | "wrong"| "temp-wrong" | "blocked">("none");

const {
  control,
  handleSubmit,
  watch,
  formState: { errors, isSubmitting },
} = useForm<LoginRequestDto>({
  resolver: zodResolver(loginSchema),
  defaultValues: configFormSchema.reduce(
    (acc, field) => ({ ...acc, [field.key]: field.valueInitial }),
    {} as LoginRequestDto
  ),
});

 // Observa cambios en los campos
  const watchUsername = watch("username");
  const watchPassword = watch("password");


// const { resetAllIndexedDB } = useIndexedDB("fudem", "fudem", {});


// const dispatch = useDispatch<AppDispatch>();
const navigate = useNavigate();

/* const onSubmit: SubmitHandler<LoginRequestDto> = async (data) => {
  const result: ApiResponse<LoginResponseDto> | null = await handleRequestThunk(dispatch, () => dispatch(login(data)).unwrap(), {
    showSpinner: true,
    showMessageApi: true
  });
  if(result?.success){
    await resetAllIndexedDB();
    if(result.data.requiresTempPasswordChange){
      dispatch(setTempPassword(data?.password ?? ''));
      navigate(RoutePaths.CHANGE_PASSWORD_TEMP);
      return;
    }

    const token = localStorageService.decode();
    if(token?.isAdmin || result.data.requiresBranchSelection){
      navigate(RoutePaths.LOGIN_STEP);
    }else{
      navigate(RoutePaths.HOME);
    }
  }
};
 */


 // Limpia errores cuando el usuario escribe
  useEffect(() => {
    if (errorType !== "none") {
      setErrorType("none");
    }
  }, [watchUsername, watchPassword]);

  // Reinicia intentos cuando cambia el usuario
  useEffect(() => {
    // Resetea los intentos al cambiar de username
    setAttempts(0);
    setErrorType("none");
  }, [watchUsername]);

const onSubmit = (data: any) => {    
  console.log("Login attempt:", data);

  const normalizedUsername = data.username?.trim();
  const normalizedPassword = data.password?.trim();
  
    navigate(RoutePaths.VEHICLE_ENTRY);
    return;
  
  };
 return (
  <AuthLayout
      title="He olvidado mi contraseña"
      variant="login"
    >
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <p>Ingresa tu usuario o correo y te enviaremos un enlace para restablecer tu contraseña</p>
        {configFormSchema.map(field => (
          <FormField key={String(field.key)} fieldConfig={field} control={control} />
        ))}
        <Button type="primary" htmlType="submit" block size="large">
          Iniciar Sesión
        </Button>
        
      </Form>
    </AuthLayout>
 );


};

export default RecoveryPage;
