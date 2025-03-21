import type { Property, Tenant } from "../types";

export function calculateRentPerTenant(
  properties: Property[],
  tenants: Tenant[],
  propertyId: Property["id"]
): number {
  const property = properties.find((p) => p.id === propertyId);
  if (!property) throw new Error("property not found");

  const filteredTenants = tenants.filter((t) => t.propertyId === propertyId);
  if (filteredTenants.length === 0) {
    throw new Error("no tenants found");
  }

  return Math.floor(Number(property.monthlyRentPence) / filteredTenants.length);
}
