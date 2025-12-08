import React from "react";
import {  Form, Button, notification } from "antd";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ApiResponse, FieldConfig } from "../../interfaces/components.interface";
import { buildDefaultValues, generateZodSchema } from "../../validators/validations";
import type { ForgotUsernameRequestDto, LoginRequestDto } from "../../interfaces/login.interface";
import { useNavigate } from "react-router-dom";
import { FormField } from "../../components/form-field/form-field.component";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { RoutePaths } from "../../utils/constants";
import AuthLayout from "../../components/layout/auth-layout/auth.layout";
import { configForm } from "./configs/forgot-username.config";
import { handleRequestAxios } from "../../utils/handle-request-axios";
import { forgotPasswordService } from "../../services/auth";

const configFormSchema: FieldConfig<LoginRequestDto>[] = configForm();
const loginSchema = generateZodSchema<LoginRequestDto>(configFormSchema);

const RecoveryPage: React.FC = () => {

  const form = useForm<LoginRequestDto>({
    resolver: zodResolver(loginSchema),
    defaultValues: buildDefaultValues(configFormSchema),
  });
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onSubmit = async(data: ForgotUsernameRequestDto) => {
    let body: ForgotUsernameRequestDto = {
      username: data.username
    }
    const result: ApiResponse<any> | null = await handleRequestAxios(dispatch, () => forgotPasswordService(body), {
      showSpinner: true,
      showMessageApi: false
    });
    if(result?.success){
      notification.success({message: "Se solicito la contraseña temporal correctamente", placement: "top"})
      navigate(RoutePaths.LOGIN);
      return;
    }
  };

  return (
    <AuthLayout title="He olvidado mi contraseña" variant="login">
      <Form layout="vertical" onFinish={form.handleSubmit(onSubmit)}>
        <p className="text-center">Ingresa tu usuario y recibiras una contraseña temporal</p>
        {configFormSchema.map((field) => (
          <FormField 
            key={String(field.key)} 
            fieldConfig={field} control={form.control} 
            error={form.formState.errors[field.key]?.message as string}/>
        ))}
        <Button type="primary" htmlType="submit" block size="large">
          Iniciar Sesión
        </Button>
      </Form>
    </AuthLayout>
  );
};

export default RecoveryPage;
