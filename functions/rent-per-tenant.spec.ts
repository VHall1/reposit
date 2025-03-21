import { readFromCSV } from "../csv";
import { calculateRentPerTenant } from "./rent-per-tenant";

import type { Property, Tenant } from "../types";

describe("calculateRentPerTenant", () => {
  let properties: Property[];
  let tenants: Tenant[];

  beforeAll(async () => {
    properties = await readFromCSV<Property>(
      "data/technical-challenge-properties-september-2024.csv"
    );
    tenants = await readFromCSV<Tenant>(
      "data/technical-challenge-tenants-september-2024.csv"
    );
  });

  test("calculates monthly rent per tenant", () => {
    const rent = calculateRentPerTenant(properties, tenants, "p_1002");
    expect(rent).toEqual(794_00);
  });

  test("throws an error if no tenants are found", () => {
    expect(() => calculateRentPerTenant(properties, tenants, "p_1029")).toThrow(
      /no tenants found/i
    );
  });
});
