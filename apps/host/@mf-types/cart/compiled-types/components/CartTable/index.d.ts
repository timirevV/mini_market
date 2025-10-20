import { CartItem } from "../../interfaces";
interface CartTableProps {
    cartItems: CartItem[];
    cartSum: number;
    onRemove: (id: number) => void;
    onIncrease: (id: number) => void;
    onDecrease: (id: number) => void;
}
declare const CartTable: ({ cartItems, cartSum, onRemove, onIncrease, onDecrease, }: CartTableProps) => import("react/jsx-runtime").JSX.Element;
export default CartTable;
