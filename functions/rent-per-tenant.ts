import type { Property, Tenant } from "../types";

type RentUnit = "pence" | "pounds";

const penceToPounds = (pence: number) => pence / 100.0;

export function calculateRentPerTenant(
  properties: Property[],
  tenants: Tenant[],
  propertyId: Property["id"],
  options: { unit?: RentUnit } = {}
): number {
  const property = properties.find((p) => p.id === propertyId);
  if (!property) throw new Error(`property not found: ${propertyId}`);

  const filteredTenants = tenants.filter((t) => t.propertyId === propertyId);
  if (filteredTenants.length === 0) {
    throw new Error(`no tenants found for property: ${propertyId}`);
  }

  const rentPerTenant = Math.floor(
    property.monthlyRentPence / filteredTenants.length
  );

  if (options.unit === "pounds") {
    return penceToPounds(rentPerTenant);
  }

  return rentPerTenant;
}
