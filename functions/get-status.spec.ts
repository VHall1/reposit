import { readFromCSV } from "../csv";
import { getPropertyStatus, PropertyStatus } from "./get-status";

import type { Property, Tenant } from "../types";

test("gets the 'status' of a property", async () => {
  const [properties, tenants] = await Promise.all([
    readFromCSV<Property>(
      "data/technical-challenge-properties-september-2024.csv"
    ),
    readFromCSV<Tenant>("data/technical-challenge-tenants-september-2024.csv"),
  ]);

  expect(getPropertyStatus(properties, tenants, "p_1002")).toBe<PropertyStatus>(
    "PROPERTY_OVERDUE"
  );
  expect(getPropertyStatus(properties, tenants, "p_1003")).toBe<PropertyStatus>(
    "PARTIALLY_VACANT"
  );
  expect(getPropertyStatus(properties, tenants, "p_1029")).toBe<PropertyStatus>(
    "PROPERTY_VACANT"
  );
  expect(getPropertyStatus(properties, tenants, "p_1004")).toBe<PropertyStatus>(
    "PROPERTY_ACTIVE"
  );
});
