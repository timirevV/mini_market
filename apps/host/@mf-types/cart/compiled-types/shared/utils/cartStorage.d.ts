import { CartItem } from "../../interfaces";
export declare const loadCart: () => {
    items: CartItem[];
    total: number;
};
export declare const saveCart: (items: CartItem[]) => void;
