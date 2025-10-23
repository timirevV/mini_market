import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Catalog from "../pages/Catalog";
import { productsList } from "../constants/productsList";

describe("Catalog component", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("renders all products", () => {
    render(<Catalog />);
    productsList.forEach((product) => {
      expect(
        screen.getByTestId(`product-name-${product.id}`)
      ).toHaveTextContent(product.name);
    });
  });

  test("adds and removes product from cart", async () => {
    const user = userEvent.setup();
    render(<Catalog />);

    const firstProduct = productsList[0];
    const addButton = screen.getByTestId(`add-button-${firstProduct.id}`);

    await user.click(addButton);
    expect(addButton).toHaveTextContent("1");

    const removeButton = screen.getByTestId(`remove-button-${firstProduct.id}`);
    expect(removeButton).toBeInTheDocument();

    await user.click(removeButton);
    expect(
      screen.queryByTestId(`remove-button-${firstProduct.id}`)
    ).not.toBeInTheDocument();
  });
});
