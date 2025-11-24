// utils/password-validations.utils.ts

export interface PasswordValidation {
  type: string;
  message: string;
  isValid: boolean;
}

export interface PasswordValidationResult {
  isValid: boolean;
  validations: PasswordValidation[];
}

export const validatePasswordInRealTime = (password: string, passwordConfirm?: string): PasswordValidationResult => {
  const validations: PasswordValidation[] = [
    {
      type: "length",
      message: "Debe ser 8 caracteres",
      isValid: password.length >= 8
    },
    {
      type: "specialChar",
      message: "Debe contener al menos un carácter especial",
      isValid: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    },
    {
      type: "number",
      message: "Debe contener al menos un número",
      isValid: /\d/.test(password)
    },
    {
      type: "uppercase",
      message: "Debe contener al menos una letra mayúscula",
      isValid: /[A-Z]/.test(password)
    },
    {
      type: "lowercase", 
      message: "Debe contener al menos una letra minúscula",
      isValid: /[a-z]/.test(password)
    },
    {
      type: "match", 
      message: "Ambas contraseñas deben ser iguales",
      isValid: password.length > 0 &&
      (passwordConfirm?.length ?? 0) > 0
      ? password === passwordConfirm
      : false
    },

  ];

  const isValid = validations.every(validation => validation.isValid);

  return {
    isValid,
    validations
  };
};