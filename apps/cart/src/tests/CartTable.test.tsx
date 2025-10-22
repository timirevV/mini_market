import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import CartTable from "../components/CartTable";
import { CartItem } from "../interfaces";

const items: CartItem[] = [
  { id: 1, name: "Apple", cost: 100, quantity: 2 },
  { id: 2, name: "Banana", cost: 50, quantity: 1 },
];

test("clicking + and - buttons calls handlers", () => {
  const mockIncrease = jest.fn();
  const mockDecrease = jest.fn();

  render(
    <CartTable
      cartItems={items}
      cartSum={250}
      onIncrease={mockIncrease}
      onDecrease={mockDecrease}
      onRemove={jest.fn()}
    />
  );

  fireEvent.click(screen.getByTestId("increase-1"));
  expect(mockIncrease).toHaveBeenCalledWith(1);

  fireEvent.click(screen.getByTestId("decrease-1"));
  expect(mockDecrease).toHaveBeenCalledWith(1);

  expect(screen.getByTestId("decrease-2")).toBeDisabled();
});
