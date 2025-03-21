import { calculateRentPerTenant } from "./index";

test("calculate rent per tenant", async () => {
  const rentPerTenant = await calculateRentPerTenant("p_1002");
  expect(rentPerTenant).toBe(79400);
});
