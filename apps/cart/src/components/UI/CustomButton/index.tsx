import React from "react";
import { primaryStyle } from "./style";

interface CustomButtonProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  disabled?: boolean;
  onClick?: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children = "Кнопка",
  style,
  disabled = false,
  onClick,
}) => {
  return (
    <button
      style={{ ...primaryStyle, ...style }}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default CustomButton;
