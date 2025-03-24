import type { Property, Tenant } from "../types";

export type PropertyStatus =
  | "PROPERTY_VACANT"
  | "PARTIALLY_VACANT"
  | "PROPERTY_ACTIVE"
  | "PROPERTY_OVERDUE";

export function getPropertyStatus(
  properties: Property[],
  tenants: Tenant[],
  propertyId: Property["id"]
): PropertyStatus {
  const property = properties.find((p) => p.id === propertyId);
  if (!property) {
    throw new Error(`property not found: ${propertyId}`);
  }

  const filteredTenants = tenants.filter((t) => t.propertyId === propertyId);
  if (filteredTenants.length === 0) {
    return "PROPERTY_VACANT";
  }

  const today = new Date();
  // resetting time, so the last day of the tenancy doesn't show up as overdue
  today.setHours(0, 0, 0, 0);

  const tenancyEndDate = new Date(property.tenancyEndDate);

  if (today > tenancyEndDate) {
    return "PROPERTY_OVERDUE";
  }

  if (property.capacity > filteredTenants.length) {
    return "PARTIALLY_VACANT";
  }

  return "PROPERTY_ACTIVE";
}
