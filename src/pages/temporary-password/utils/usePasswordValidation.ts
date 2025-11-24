import { useState, useEffect } from "react";
import { validatePasswordInRealTime, type PasswordValidation } from "./password-validations";

export const usePasswordValidation = (password: string, passwordConfirm: string) => {
  const [validations, setValidations] = useState<PasswordValidation[]>([]);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const result = validatePasswordInRealTime(password, passwordConfirm);
    setValidations(result.validations);
    setIsValid(result.isValid);
  }, [password, passwordConfirm]);

  return { validations, isValid };
};