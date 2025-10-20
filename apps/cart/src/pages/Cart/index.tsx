import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { ConfirmButton } from "./style";
import { CartItem } from "../../interfaces";
import { calculateCartSum } from "../../shared/utils/calculateCartSum";
import { loadCart, saveCart } from "../../shared/utils/cartStorage";
import { updateQuantity } from "../../shared/utils/cartUtils";
import CartTable from "../../components/CartTable";

const Cart = () => {
  const [cartSum, setCartSum] = useState<number>(0);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isReadyBuy, setIsReadyBuy] = useState<boolean>(false);

  useEffect(() => {
    const { items, total } = loadCart();
    setCartItems(items);
    setCartSum(total);

    const handleCartUpdate = () => {
      const { items, total } = loadCart();
      setCartItems(items);
      setCartSum(total);
    };

    window.addEventListener("cartUpdate", handleCartUpdate);
    return () => window.removeEventListener("cartUpdate", handleCartUpdate);
  }, []);

  const handleRemoveItem = (id: number) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedItems);
    const newSum = calculateCartSum(updatedItems);
    setCartSum(newSum);
    saveCart(updatedItems);
  };

  const handleIncreaseQuantity = (id: number) => {
    const updatedItems = updateQuantity(cartItems, id, 1);
    setCartItems(updatedItems);
    const newSum = calculateCartSum(updatedItems);
    setCartSum(newSum);
    saveCart(updatedItems);
  };

  const handleDecreaseQuantity = (id: number) => {
    const updatedItems = updateQuantity(cartItems, id, -1);
    setCartItems(updatedItems);
    const newSum = calculateCartSum(updatedItems);
    setCartSum(newSum);
    saveCart(updatedItems);
  };

  const handleStateBuy = () => setIsReadyBuy(true);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <CartTable
        cartItems={cartItems}
        cartSum={cartSum}
        onRemove={handleRemoveItem}
        onIncrease={handleIncreaseQuantity}
        onDecrease={handleDecreaseQuantity}
      />

      <ConfirmButton
        variant="contained"
        disabled={cartSum === 0}
        onClick={handleStateBuy}
      >
        Оформить
      </ConfirmButton>

      {isReadyBuy && <Typography>Ready</Typography>}
    </Box>
  );
};

export default Cart;
