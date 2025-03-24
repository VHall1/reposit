import {
  InMemoryPropertyStore,
  InMemoryTenantStore,
  type PropertyStore,
  type TenantStore,
} from "../store";
import type { Property, Tenant } from "../types";
import { readFromCSV } from "../util/csv";
import { getPropertyStatus, PropertyStatus } from "./get-status";

describe("getPropertyStatus", () => {
  let propertyStore: PropertyStore;
  let tenantStore: TenantStore;

  beforeAll(async () => {
    const [properties, tenants] = await Promise.all([
      readFromCSV<Property>(
        "data/technical-challenge-properties-september-2024.csv"
      ),
      readFromCSV<Tenant>(
        "data/technical-challenge-tenants-september-2024.csv"
      ),
    ]);

    propertyStore = new InMemoryPropertyStore(properties);
    tenantStore = new InMemoryTenantStore(tenants);
  });

  test.each<{ desc: string; id: string; expected: PropertyStatus }>([
    { desc: "overdue", id: "p_1002", expected: "PROPERTY_OVERDUE" },
    { desc: "partiall vacant", id: "p_1003", expected: "PARTIALLY_VACANT" },
    { desc: "vacant", id: "p_1029", expected: "PROPERTY_VACANT" },
    { desc: "active", id: "p_1004", expected: "PROPERTY_ACTIVE" },
  ])("handles $desc property", ({ id, expected }) => {
    expect(getPropertyStatus(propertyStore, tenantStore, id)).toBe(expected);
  });

  test("doesn't show property as overdue on the last day of tenancy", () => {
    jest.useFakeTimers();

    const mockDate = new Date(2025, 2, 24, 10, 31);
    jest.setSystemTime(mockDate);

    const property: Property = {
      id: "p_1004",
      address: "124 Maple Crescent",
      postcode: "EH96 9EF",
      monthlyRentPence: 212500,
      region: "WALES",
      capacity: 1,
      tenancyEndDate: "2025-03-24",
    };

    const propertyStore = new InMemoryPropertyStore([property]);
    const status = getPropertyStatus(propertyStore, tenantStore, "p_1004");

    expect(status).toBe<PropertyStatus>("PROPERTY_ACTIVE");

    // restore real timers after test!
    jest.useRealTimers();
  });
});
