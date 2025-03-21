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
  test("it handles valid postcode", () => {
    expect(validatePostcode("CR2 6XH")).toBe(true);
  });

  test("it handles invalid postcode", () => {
    expect(validatePostcode("M60 1W")).toBe(false);
  });
});
