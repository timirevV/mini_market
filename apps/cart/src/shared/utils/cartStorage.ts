import { CartItem } from "../../interfaces";

const CART_ITEMS_KEY = "cartItems";
const CART_TOTAL_KEY = "cartTotal";

export const loadCart = (): { items: CartItem[]; total: number } => {
  const savedItems = localStorage.getItem(CART_ITEMS_KEY);
  const savedTotal = localStorage.getItem(CART_TOTAL_KEY);

  return {
    items: savedItems ? JSON.parse(savedItems) : [],
    total: savedTotal ? parseInt(savedTotal) : 0,
  };
};

export const saveCart = (items: CartItem[]) => {
  const total = items.reduce((sum, item) => sum + item.cost * item.quantity, 0);

  localStorage.setItem(CART_ITEMS_KEY, JSON.stringify(items));
  localStorage.setItem(CART_TOTAL_KEY, total.toString());
  window.dispatchEvent(new Event("cartUpdate"));
};
