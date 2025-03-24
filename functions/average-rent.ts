import type { Property } from "../types";

export function calculateRegionAverageRent(
  properties: Property[],
  region: string
): number {
  let regionRentSum = 0;
  let regionFilteredProperties = 0;

  // could have used a filter and a reduce here, but that would require two loops
  for (const property of properties) {
    if (property.region === region) {
      regionFilteredProperties++;
      regionRentSum += property.monthlyRentPence;
    }
  }

  if (regionFilteredProperties === 0) {
    throw new Error(`no properties found for region: ${region}`);
  }

  return Math.floor(regionRentSum / regionFilteredProperties);
}
