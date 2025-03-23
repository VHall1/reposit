import type { Property, Tenant } from "../types";

export function calculateRentPerTenant(
  properties: Property[],
  tenants: Tenant[],
  propertyId: Property["id"],
  options: { unit?: "pence" | "pounds" } = {}
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
    return rentPerTenant / 100.0;
  }

  return rentPerTenant;
}
