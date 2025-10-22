import React from "react";
import {
  Controller,
  Control,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";
import type { TextFieldProps } from "@mui/material";
import { SubmitInput } from "./style";

interface ControlledInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  type?: string;
  rules?: Omit<
    RegisterOptions<T, Path<T>>,
    "setValueAs" | "disabled" | "valueAsNumber" | "valueAsDate"
  >;
  onValueChange?: (value: string) => void;
  onFocus?: () => void;
  formatValue?: (value: string) => string;
  inputProps?: TextFieldProps["inputProps"];
}

function ControlledInput<T extends FieldValues>({
  name,
  control,
  label,
  type = "text",
  rules,
  onValueChange,
  onFocus,
  formatValue,
  inputProps,
}: ControlledInputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <SubmitInput
          {...field}
          label={label}
          variant="outlined"
          type={type}
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
          onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const rawValue = e.target.value;
            const formatted = formatValue ? formatValue(rawValue) : rawValue;
            field.onChange(formatted);
            onValueChange?.(formatted);
          }}
          onFocus={() => onFocus?.()}
          inputProps={inputProps}
        />
      )}
    />
  );
}

export default ControlledInput;
