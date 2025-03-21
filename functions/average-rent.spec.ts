import { readFromCSV } from "../csv";
import { calculateRegionAverageRent } from "./average-rent";

import type { Property } from "../types";

describe("calculateRegionAverageRent", () => {
  let properties: Property[] = [];

  beforeAll(async () => {
    properties = await readFromCSV<Property>(
      "data/technical-challenge-properties-september-2024.csv"
    );
  });

  test("calculates average rent of a given area", async () => {
    expect(calculateRegionAverageRent(properties, "ENGLAND")).toEqual(1669_28);
  });

  test("throws an error if a given region has no properties", async () => {
    expect(() => calculateRegionAverageRent(properties, "FAKE REGION")).toThrow(
      /no properties found/i
    );
  });
});
