import { readFromCSV } from "../csv";
import { calculateAverageRent } from "./average-rent";

import type { Property } from "../types";

test("calculates average rent of an area", async () => {
  const properties = await readFromCSV<Property>(
    "data/technical-challenge-properties-september-2024.csv"
  );

  expect(calculateAverageRent(properties, "ENGLAND")).toEqual(1669_28);
});
