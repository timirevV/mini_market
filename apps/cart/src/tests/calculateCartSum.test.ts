import { CartItem } from "../interfaces";
import { calculateCartSum } from "../shared/utils/calculateCartSum";

const items: CartItem[] = [
  { id: 1, name: "item1", cost: 100, quantity: 1 },
  { id: 2, name: "item2", cost: 200, quantity: 2 },
];

describe("calculateCartSum", () => {
  it("returns 0 for empty cart", () => {
    expect(calculateCartSum([])).toBe(0);
  });

  it("returns correct sum for one item", () => {
    const items: CartItem[] = [{ id: 1, name: "item", cost: 10, quantity: 3 }];
    expect(calculateCartSum(items)).toBe(30);
  });

  it("returns correct sum for multiple items", () => {
    expect(calculateCartSum(items)).toBe(500);
  });
});
