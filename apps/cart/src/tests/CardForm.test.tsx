import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("react-credit-cards-2/dist/es/styles-compiled.css", () => ({}));

jest.mock("react-credit-cards-2", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-card" />,
}));

import CardForm from "../components/CardForm";

describe("CardForm", () => {
  const cartSum = 500;

  test("submit button is disabled initially", () => {
    render(<CardForm cartSum={cartSum} />);
    const button = screen.getByRole("button", { name: /Оплатить/i });
    expect(button).toBeDisabled();
  });

  test("fills form and calls onSuccess on submit", async () => {
    const user = userEvent.setup();
    const onSuccess = jest.fn();

    render(<CardForm cartSum={cartSum} onSuccess={onSuccess} />);

    const numberInput = screen.getByTestId("number");
    const nameInput = screen.getByTestId("name");
    const expiryInput = screen.getByTestId("expiry");
    const cvcInput = screen.getByTestId("cvc");

    await user.type(numberInput, "1234 5678 9012 3456");
    await user.type(nameInput, "John Doe");
    await user.type(expiryInput, "1225");
    await user.type(cvcInput, "123");

    const submitButton = screen.getByRole("button", { name: /Оплатить/i });
    expect(submitButton).toBeEnabled();

    await user.click(submitButton);

    expect(onSuccess).toHaveBeenCalledTimes(1);

    expect(numberInput).toHaveValue("");
    expect(nameInput).toHaveValue("");
    expect(expiryInput).toHaveValue("");
    expect(cvcInput).toHaveValue("");
  });
});
