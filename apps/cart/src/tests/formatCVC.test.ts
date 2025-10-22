import { formatCVC } from "../shared/utils/cartUtils";

describe("formatCVC", () => {
  test("removes non-digits", () => {
    expect(formatCVC("12a3")).toBe("123");
  });

  test("limits to 4 digits", () => {
    expect(formatCVC("12345")).toBe("1234");
  });
});
