import type { PropertyStore, TenantStore } from "../store";
import type { Property } from "../types";

type RentUnit = "pence" | "pounds";

const penceToPounds = (pence: number) => pence / 100.0;

export function calculateRentPerTenant(
  propertyStore: PropertyStore,
  tenantStore: TenantStore,
  propertyId: Property["id"],
  options: { unit?: RentUnit } = {}
): number {
  const property = propertyStore.findById(propertyId);
  if (!property) {
    throw new Error(`property not found: ${propertyId}`);
  }

  const filteredTenants = tenantStore.getByPropertyId(propertyId);
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
