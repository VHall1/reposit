import type { PropertyStore } from "../store";

export function calculateRegionAverageRent(
  propertyStore: PropertyStore,
  region: string
): number {
  const properties = propertyStore.getByRegion(region);
  const regionRentSum = properties.reduce(
    (accum, property) => accum + property.monthlyRentPence,
    0
  );

  if (properties.length === 0) {
    throw new Error(`no properties found for region: ${region}`);
  }

  return Math.floor(regionRentSum / properties.length);
}
