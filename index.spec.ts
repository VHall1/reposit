import { calculateRentPerTenant } from "./index";

describe("calculates rent per tenant", () => {
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
