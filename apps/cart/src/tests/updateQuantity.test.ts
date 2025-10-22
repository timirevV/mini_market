import { updateQuantity } from "../shared/utils/cartUtils";

const items = [
  { id: 1, name: "Apple", cost: 100, quantity: 2 },
  { id: 2, name: "Banana", cost: 50, quantity: 1 },
];

describe("updateQuantity", () => {
  test("increases quantity", () => {
    const result = updateQuantity(items, 1, 3);
    expect(result.find((i) => i.id === 1)?.quantity).toBe(5);
  });

  test("decreases quantity", () => {
    const result = updateQuantity(items, 1, -1);
    expect(result.find((i) => i.id === 1)?.quantity).toBe(1);
  });

  test("does not go below 0", () => {
    const result = updateQuantity(items, 2, -5);
    expect(result.find((i) => i.id === 2)).toBeUndefined();
  });
});
