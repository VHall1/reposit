import { readFromCSV } from "../csv";
import { getPropertyStatus, PropertyStatus } from "./get-status";

import type { Property, Tenant } from "../types";

describe("getPropertyStatus", () => {
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

  test.each<{ desc: string; id: string; expected: PropertyStatus }>([
    { desc: "overdue", id: "p_1002", expected: "PROPERTY_OVERDUE" },
    { desc: "partiall vacant", id: "p_1003", expected: "PARTIALLY_VACANT" },
    { desc: "vacant", id: "p_1029", expected: "PROPERTY_VACANT" },
    { desc: "active", id: "p_1004", expected: "PROPERTY_ACTIVE" },
  ])("handles $desc property", ({ id, expected }) => {
    expect(getPropertyStatus(properties, tenants, id)).toBe(expected);
  });
});
