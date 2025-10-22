import { CartItem } from "../../interfaces";
export declare const updateQuantity: (items: CartItem[], id: number, delta: number) => CartItem[];
export declare const formatCardNumber: (val: string) => string;
export declare const formatExpiry: (val: string) => string;
export declare const formatCVC: (val: string) => string;
