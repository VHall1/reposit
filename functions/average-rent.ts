import type { Property } from "../types";

export function calculateAverageRent(
  properties: Property[],
  region: string
): number {
  let regionRentSum = 0;
  let regionFilteredProperties = 0;

  for (const property of properties) {
    if (property.region === region) {
      regionFilteredProperties++;
      regionRentSum = regionRentSum + Number(property.monthlyRentPence);
    }
  }

  return Math.floor(regionRentSum / regionFilteredProperties);
}
