import { FieldConfig } from "../../interfaces";
import { formatCardNumber, formatCVC, formatExpiry } from "../utils/cartUtils";

const CARD_VALIDATION_PATTERNS = {
  // Проверяет номер карты: только цифры и пробелы, от 16 до 23 символов
  CARD_NUMBER: /^[\d\s]{16,23}$/,

  // Проверяет имя владельца: только буквы (латиница и кириллица) и пробелы
  CARD_HOLDER: /^[A-Za-zА-Яа-яЁё\s]+$/,

  // Проверяет срок действия в формате ММ/ГГ
  // Месяц: 01-12, год: любые две цифры
  EXPIRY_DATE: /^(0[1-9]|1[0-2])\/\d{2}$/,

  // Проверяет CVV/CVC код: 3 или 4 цифры
  CVV_CODE: /^\d{3,4}$/,
} as const;

const ERROR_MESSAGES = {
  CARD_NUMBER_REQUIRED: "Введите номер карты",
  CARD_NUMBER_INVALID: "Некорректный номер карты",
  CARD_HOLDER_REQUIRED: "Введите имя владельца карты",
  CARD_HOLDER_INVALID: "Имя должно содержать только буквы",
  EXPIRY_DATE_REQUIRED: "Введите срок действия",
  EXPIRY_DATE_INVALID: "Формат ММ/ГГ",
  CVV_REQUIRED: "Введите CVV",
  CVV_INVALID: "Некорректный CVV",
} as const;

export const FIELDS: FieldConfig[] = [
  {
    name: "number",
    label: "Номер карты",
    type: "tel",
    rules: {
      required: ERROR_MESSAGES.CARD_NUMBER_REQUIRED,
      pattern: {
        value: CARD_VALIDATION_PATTERNS.CARD_NUMBER,
        message: ERROR_MESSAGES.CARD_NUMBER_INVALID,
      },
    },
    formatValue: formatCardNumber,
    inputProps: { inputMode: "numeric" },
  },
  {
    name: "name",
    label: "Имя владельца",
    rules: {
      required: ERROR_MESSAGES.CARD_HOLDER_REQUIRED,
      pattern: {
        value: CARD_VALIDATION_PATTERNS.CARD_HOLDER,
        message: ERROR_MESSAGES.CARD_HOLDER_INVALID,
      },
    },
  },
  {
    name: "expiry",
    label: "Срок (ММ/ГГ)",
    rules: {
      required: ERROR_MESSAGES.EXPIRY_DATE_REQUIRED,
      pattern: {
        value: CARD_VALIDATION_PATTERNS.EXPIRY_DATE,
        message: ERROR_MESSAGES.EXPIRY_DATE_INVALID,
      },
    },
    formatValue: formatExpiry,
  },
  {
    name: "cvc",
    label: "CVV",
    type: "tel",
    rules: {
      required: ERROR_MESSAGES.CVV_REQUIRED,
      pattern: {
        value: CARD_VALIDATION_PATTERNS.CVV_CODE,
        message: ERROR_MESSAGES.CVV_INVALID,
      },
    },
    formatValue: formatCVC,
    inputProps: { maxLength: 4, inputMode: "numeric" },
  },
];
