import React from "react";
interface CustomButtonProps {
    children?: React.ReactNode;
    style?: React.CSSProperties;
    disabled?: boolean;
    onClick?: () => void;
}
declare const CustomButton: React.FC<CustomButtonProps>;
export default CustomButton;
