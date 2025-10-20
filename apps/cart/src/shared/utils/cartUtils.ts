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
