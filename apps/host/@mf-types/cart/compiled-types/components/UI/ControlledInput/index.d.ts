import { Control, FieldValues, Path, RegisterOptions } from "react-hook-form";
import type { TextFieldProps } from "@mui/material";
interface ControlledInputProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    label: string;
    type?: string;
    rules?: Omit<RegisterOptions<T, Path<T>>, "setValueAs" | "disabled" | "valueAsNumber" | "valueAsDate">;
    onValueChange?: (value: string) => void;
    onFocus?: () => void;
    formatValue?: (value: string) => string;
    inputProps?: TextFieldProps["inputProps"];
}
declare function ControlledInput<T extends FieldValues>({ name, control, label, type, rules, onValueChange, onFocus, formatValue, inputProps, }: ControlledInputProps<T>): import("react/jsx-runtime").JSX.Element;
export default ControlledInput;
