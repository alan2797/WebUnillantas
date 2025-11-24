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
import { configForm } from "./login.config";

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

// Simula la respuesta del backend
const usersDatabase: User[] = [
  {
    id: "1",
    username: "admin1",
    password: "Unillantas2024!",
    temporaryPassword: "temp123",
    isTemporal: true, // 🔥 Debe cambiar contraseña
    isBlocked: false,
    name: "Administrador Principal"
  },
  {
    id: "2",
    username: "usuario1",
    password: "Password123!",
    isTemporal: false, // ✅ Contraseña permanente
    isBlocked: false,
    name: "Usuario Normal"
  },
  {
    id: "3",
    username: "usuario2",
    password: "temp456",
    temporaryPassword: "temp456",
    isTemporal: true, // 🔥 Debe cambiar contraseña
    isBlocked: false,
    name: "Usuario Nuevo"
  },
  {
    id: "4",
    username: "bloqueado",
    password: "cualquiera",
    isTemporal: false,
    isBlocked: true, // ❌ Usuario bloqueado
    name: "Usuario Bloqueado"
  }
];


const Login: React.FC = () => {

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

  // =========================================================
  // 🔍 PASO 1: Buscar usuario en la "base de datos"
  // =========================================================
  const user = usersDatabase.find(u => u.username === normalizedUsername);

  // =========================================================
  // ❌ ESCENARIO 1: Usuario no existe
  // =========================================================
  if (!user) {
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (newAttempts >= 5) {
      setErrorType("blocked");
      return;
    }

    setErrorType("wrong"); // "Usuario o contraseña incorrectos"
    return;
  }

  // =========================================================
  // ❌ ESCENARIO 2: Usuario bloqueado
  // =========================================================
  if (user.isBlocked) {
    setErrorType("blocked");
    return;
  }

  // =========================================================
  // 🔍 PASO 2: Validar contraseña según isTemporal
  // =========================================================
  
  if (user.isTemporal) {
    // 🔥 Usuario tiene contraseña temporal activa
    const isTemporaryPasswordCorrect = normalizedPassword === user.temporaryPassword;
    
    if (!isTemporaryPasswordCorrect) {
      // ⚠️ Contraseña temporal incorrecta
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      if (newAttempts >= 5) {
        setErrorType("blocked");
        return;
      }

      setErrorType("temp-wrong"); // "La contraseña temporal no coincide"
      return;
    }

    // ✅ Contraseña temporal correcta → Redirigir a cambio
    setErrorType("none");
    setAttempts(0);
    // dispatch(setTempPassword(user.temporaryPassword!));
    // dispatch(setUserInfo({ id: user.id, username: user.username }));
    navigate(RoutePaths.CHANGE_PASSWORD_TEMP);
    return;
    
  } else {
    // ✅ Usuario con contraseña permanente
    const isPasswordCorrect = normalizedPassword === user.password;
    
    if (!isPasswordCorrect) {
      // ❌ Contraseña permanente incorrecta
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      if (newAttempts >= 5) {
        setErrorType("blocked");
        return;
      }

      setErrorType("wrong"); // "Usuario o contraseña incorrectos"
      return;
    }

    // Login normal exitoso
    setErrorType("none");
    setAttempts(0);
    localStorageService.setToken("token_jwt_aqui");
    navigate(RoutePaths.VEHICLE_ENTRY);
    return;
  }
};
 return (
  <AuthLayout
      title="Iniciar Sesión"
      variant="login"
    >
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        {configFormSchema.map(field => (
          <FormField key={String(field.key)} fieldConfig={field} control={control} />
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
          <Alert
            message="Usuario o contraseña incorrectos, por favor intente de nuevo"
            type="error"
            showIcon
            style={{ marginBottom: 16 }}
          />
        )}

        {errorType === "blocked" && (
          <Alert
            message="Usuario bloqueado, contacte con administración"
            type="error"
            showIcon
            style={{ marginBottom: 16 }}
          />
        )}
        
        {errorType === "temp-wrong" && (
            <Alert
              message="La contraseña temporal no coincide"
              type="error"
              showIcon
              style={{ marginBottom: 16 }}
            />
          )}
        <Button type="primary" htmlType="submit" block size="large">
          Iniciar Sesión
        </Button>
        
      </Form>
    </AuthLayout>
 );


};

export default Login;
