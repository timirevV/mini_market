import { CartItem } from "../../interfaces";

export const calculateCartSum = (items: CartItem[]) =>
  items.reduce((total, item) => total + item.cost * item.quantity, 0);
