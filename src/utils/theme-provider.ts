// ThemeProvider.tsx
import { theme } from "antd";
import { useEffect } from "react";

export const ThemeVariables = () => {
  const { token } = theme.useToken();

  useEffect(() => {
    const root = document.documentElement;

    const variables: Record<string, string | number> = {
      "--color-primary-antd": token.colorPrimary,
      "--color-danger-antd": token.colorError,
      "--color-warning-antd": token.colorWarning,
      "--color-success-antd": token.colorSuccess,
      "--color-bg-antd": token.colorBgBase,
      "--color-text-antd": token.colorTextBase,
      "--font-size-antd": `${token.fontSize}px`,
      "--border-radius-antd": `${token.borderRadius}px`,
    };

    Object.entries(variables).forEach(([key, value]) => {
      root.style.setProperty(key, String(value));
    });
  }, [token]);

  return null;
};
