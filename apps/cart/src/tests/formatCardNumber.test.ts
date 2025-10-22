import { formatCardNumber } from "../shared/utils/cartUtils";

describe("formatCardNumber", () => {
  test("formats correctly", () => {
    expect(formatCardNumber("1234123412341234")).toBe("1234 1234 1234 1234");
  });

  test("removes non-digit chars", () => {
    expect(formatCardNumber("1234abcd5678")).toBe("1234 5678");
  });

  test("truncates to 16 digits", () => {
    expect(formatCardNumber("12345678901234567890")).toBe(
      "1234 5678 9012 3456"
    );
  });
});
