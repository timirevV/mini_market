import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { productsList } from "../../constants/productsList";
import {
  CardContainer,
  GridContainer,
  StyledButton,
  StyledCard,
} from "./style";

interface CartItem {
  id: number;
  name: string;
  cost: number;
  quantity: number;
}

const Catalog = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [productCounts, setProductCounts] = useState<{ [key: number]: number }>({});

  const totalSum = cartItems.reduce((sum, item) => sum + item.cost * item.quantity, 0);

  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      const parsedCart: CartItem[] = JSON.parse(savedCart);
      setCartItems(parsedCart);
      
      const counts: { [key: number]: number } = {};
      parsedCart.forEach(item => {
        counts[item.id] = item.quantity;
      });
      setProductCounts(counts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    localStorage.setItem("cartTotal", totalSum.toString());
    window.dispatchEvent(new Event("cartUpdate"));
  }, [cartItems, totalSum]);

  const addProduct = (id: number, cost: number, name: string) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === id);
      
      if (existingItem) {
        return prevItems.map(item => 
          item.id === id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { id, name, cost, quantity: 1 }];
      }
    });

    setProductCounts(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const deleteProduct = (id: number) => {
    setCartItems(prevItems => {
      return prevItems
        .map(item => 
          item.id === id 
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0);
    });

    setProductCounts(prev => ({
      ...prev,
      [id]: Math.max((prev[id] || 0) - 1, 0),
    }));
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <GridContainer container spacing={3}>
        {productsList.map((item) => (
          <CardContainer size={4} key={item.id}>
            <StyledCard data-testid={`product-card-${item.id}`}>{item.name}</StyledCard>
            <Typography data-testid={`product-name-${item.id}`}>{item.name}</Typography>
            <Typography>{item.cost} pуб</Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <StyledButton
                variant="contained"
                onClick={() => addProduct(item.id, item.cost, item.name)}
                data-testid={`add-button-${item.id}`}
              >
                добавить{" "}
                {(productCounts[item.id] || 0) > 0
                  ? productCounts[item.id]
                  : ""}
              </StyledButton>
              {(productCounts[item.id] || 0) > 0 && (
                <StyledButton
                  variant="contained"
                  onClick={() => deleteProduct(item.id)}
                  data-testid={`remove-button-${item.id}`}
                >
                  удалить
                </StyledButton>
              )}
            </Box>
          </CardContainer>
        ))}
      </GridContainer>
    </div>
  );
};

export default Catalog;