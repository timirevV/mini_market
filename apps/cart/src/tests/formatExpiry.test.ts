import { formatExpiry } from "../shared/utils/cartUtils";

describe("formatExpiry", () => {
  test("formats MMYY correctly", () => {
    expect(formatExpiry("1225")).toBe("12/25");
  });

  test("ignores non-digits", () => {
    expect(formatExpiry("12ab25")).toBe("12/25");
  });

  test("handles only month", () => {
    expect(formatExpiry("12")).toBe("12");
  });
});
