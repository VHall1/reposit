import { InMemoryPropertyStore, type PropertyStore } from "../store";
import type { Property } from "../types";
import { readFromCSV } from "../util/csv";
import { calculateRegionAverageRent } from "./average-rent";

describe("calculateRegionAverageRent", () => {
  let propertyStore: PropertyStore;

  beforeAll(async () => {
    const properties = await readFromCSV<Property>(
      "data/technical-challenge-properties-september-2024.csv"
    );
    propertyStore = new InMemoryPropertyStore(properties);
  });

  test("calculates average rent of a given area", async () => {
    expect(calculateRegionAverageRent(propertyStore, "ENGLAND")).toEqual(
      1669_28
    );
  });

  test("throws an error if a given region has no properties", async () => {
    expect(() =>
      calculateRegionAverageRent(propertyStore, "FAKE REGION")
    ).toThrow(/no properties found/i);
  });
});
