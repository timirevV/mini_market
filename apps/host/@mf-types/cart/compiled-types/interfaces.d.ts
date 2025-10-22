import { TextFieldProps } from "@mui/material";
import { Path, RegisterOptions } from "react-hook-form";
export interface CartItem {
    id: number;
    name: string;
    cost: number;
    quantity: number;
}
export type CardData = {
    number: string;
    name: string;
    expiry: string;
    cvc: string;
};
export type FieldConfig = {
    name: Path<CardData>;
    label: string;
    type?: string;
    rules?: Omit<RegisterOptions<CardData, Path<CardData>>, "setValueAs" | "disabled" | "valueAsNumber" | "valueAsDate">;
    formatValue?: (v: string) => string;
    inputProps?: TextFieldProps["inputProps"];
};
