// components/NavigationButton.tsx
import React from "react";
import { Button } from "antd";
import type { ButtonCustomProps } from "../../interfaces/components.interface";

const ButtonCustom: React.FC<ButtonCustomProps> = ({ to, text, ...props }) => {
  return (
    <Button
      {...props} 
      size="large"
    >
      {text}
    </Button>
  );
};

export default ButtonCustom;
