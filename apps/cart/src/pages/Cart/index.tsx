import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { ConfirmButton } from "./style";
import { CartItem } from "../../interfaces";
import { calculateCartSum } from "../../shared/utils/calculateCartSum";
import { loadCart, saveCart } from "../../shared/utils/cartStorage";
import { updateQuantity } from "../../shared/utils/cartUtils";
import CartTable from "../../components/CartTable";
import CardForm from "../../components/CardForm";
import BasicModal from "../../components/UI/Modal";

const Cart = () => {
  const [cartSum, setCartSum] = useState<number>(0);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handlePaymentSuccess = () => {
    handleCloseModal();
    setCartItems([]);
    setCartSum(0);
    saveCart([]);
  };

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
        onClick={handleOpenModal}
      >
        Оформить
      </ConfirmButton>

      <BasicModal
        open={isModalOpen}
        onClose={handleCloseModal}
        title="Оплата заказа"
      >
        <CardForm onSuccess={handlePaymentSuccess} cartSum={cartSum}/>
      </BasicModal>
    </Box>
  );
};

export default Cart;
