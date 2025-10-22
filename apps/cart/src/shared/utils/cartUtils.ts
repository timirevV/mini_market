import { CartItem } from "../../interfaces";

export const updateQuantity = (
  items: CartItem[],
  id: number,
  delta: number
): CartItem[] =>
  items
    .map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(0, item.quantity + delta) }
        : item
    )
    .filter((item) => item.quantity > 0);

export const formatCardNumber = (val: string) =>
  val
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();

export const formatExpiry = (val: string) =>
  val
    .replace(/\D/g, "")
    .slice(0, 4)
    .replace(/(\d{2})(\d{1,2})?/, (_, mm, yy) => (yy ? `${mm}/${yy}` : mm));

export const formatCVC = (val: string) => val.replace(/\D/g, "").slice(0, 4);
