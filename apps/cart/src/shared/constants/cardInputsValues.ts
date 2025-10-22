import { FieldConfig } from "../../interfaces";
import { formatCardNumber, formatCVC, formatExpiry } from "../utils/cartUtils";

export const FIELDS: FieldConfig[] = [
  {
    name: "number",
    label: "Номер карты",
    type: "tel",
    rules: {
      required: "Введите номер карты",
      pattern: {
        value: /^[\d\s]{16,23}$/,
        message: "Некорректный номер карты",
      },
    },
    formatValue: formatCardNumber,
    inputProps: { inputMode: "numeric" },
  },
  {
    name: "name",
    label: "Имя владельца",
    rules: {
      required: "Введите имя владельца карты",
      pattern: {
        value: /^[A-Za-zА-Яа-яЁё\s]+$/,
        message: "Имя должно содержать только буквы",
      },
    },
  },
  {
    name: "expiry",
    label: "Срок (ММ/ГГ)",
    rules: {
      required: "Введите срок действия",
      pattern: {
        value: /^(0[1-9]|1[0-2])\/\d{2}$/,
        message: "Формат ММ/ГГ",
      },
    },
    formatValue: formatExpiry,
  },
  {
    name: "cvc",
    label: "CVV",
    type: "tel",
    rules: {
      required: "Введите CVV",
      pattern: { value: /^\d{3,4}$/, message: "Некорректный CVV" },
    },
    formatValue: formatCVC,
    inputProps: { maxLength: 4, inputMode: "numeric" },
  },
];
