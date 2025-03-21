import { calculateRentPerTenant, validatePostcode } from "./index";

describe("calculateRentPerTenant", () => {
  describe("it calculates rent per tenant", () => {
    test("in pence", async () => {
      const rentPerTenant = await calculateRentPerTenant("p_1002");
      expect(rentPerTenant).toBe(79400);
    });

    test("in pounds", async () => {
      const rentPerTenant = await calculateRentPerTenant("p_1002", {
        currencyUnit: "major",
      });
      expect(rentPerTenant).toBe(794.0);
    });
  });

  test("it throws an error if propery has no tenants", () => {
    expect(() => calculateRentPerTenant("p_1029")).rejects.toThrow(
      /no tenants/i
    );
  });
});

describe("validatePostcode", () => {
  test.each([
    { desc: "AA9 9AA", postcode: "CR2 6XH" },
    { desc: "AA99 9AA", postcode: "DN55 1PT" },
    { desc: "A9 9AA", postcode: "M1 1AE" },
    { desc: "A99 9AA", postcode: "B33 8TH" },
    { desc: "A9A 9AA", postcode: "W1A 0AX" },
    { desc: "AA9A 9AA", postcode: "EC1A 1BB" },
  ])("handles $desc postcode format", ({ postcode }) => {
    expect(validatePostcode(postcode)).toBe(true);
  });

  test("handles invalid postcode", () => {
    expect(validatePostcode("M60 1W")).toBe(false);
  });
});
