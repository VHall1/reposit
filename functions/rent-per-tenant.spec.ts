import {
  InMemoryPropertyStore,
  InMemoryTenantStore,
  type PropertyStore,
  type TenantStore,
} from "../store";
import { PropertySchema, TenantSchema } from "../types";
import { readFromCSV } from "../util/csv";
import { calculateRentPerTenant } from "./rent-per-tenant";

describe("calculateRentPerTenant", () => {
  let propertyStore: PropertyStore;
  let tenantStore: TenantStore;

  beforeAll(async () => {
    const [properties, tenants] = await Promise.all([
      readFromCSV(
        "data/technical-challenge-properties-september-2024.csv",
        PropertySchema
      ),
      readFromCSV(
        "data/technical-challenge-tenants-september-2024.csv",
        TenantSchema
      ),
    ]);

    propertyStore = new InMemoryPropertyStore(properties);
    tenantStore = new InMemoryTenantStore(tenants);
  });

  test("calculates monthly rent per tenant in pence", () => {
    const rent = calculateRentPerTenant(propertyStore, tenantStore, "p_1002");
    expect(rent).toEqual(794_00);
  });

  test("calculates monthly rent per tenant in pounds", () => {
    const rent = calculateRentPerTenant(propertyStore, tenantStore, "p_1002", {
      unit: "pounds",
    });
    expect(rent).toBeCloseTo(794.0, 2);
  });

  test("throws an error property doesn't exist", () => {
    expect(() =>
      calculateRentPerTenant(propertyStore, tenantStore, "p_9999")
    ).toThrow(/property not found/i);
  });

  test("throws an error if no tenants are found", () => {
    expect(() =>
      calculateRentPerTenant(propertyStore, tenantStore, "p_1029")
    ).toThrow(/no tenants found/i);
  });
});
