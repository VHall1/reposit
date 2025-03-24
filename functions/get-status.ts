import type { PropertyStore, TenantStore } from "../store";
import type { Property } from "../types";

export type PropertyStatus =
  | "PROPERTY_VACANT"
  | "PARTIALLY_VACANT"
  | "PROPERTY_ACTIVE"
  | "PROPERTY_OVERDUE";

export function getPropertyStatus(
  propertyStore: PropertyStore,
  tenantStore: TenantStore,
  propertyId: Property["id"]
): PropertyStatus {
  const property = propertyStore.findById(propertyId);
  if (!property) {
    throw new Error(`property not found: ${propertyId}`);
  }

  const tenants = tenantStore.getByPropertyId(propertyId);
  if (tenants.length === 0) {
    return "PROPERTY_VACANT";
  }

  const today = new Date();
  // resetting time, so the last day of the tenancy doesn't show up as overdue
  today.setHours(0, 0, 0, 0);

  const tenancyEndDate = new Date(property.tenancyEndDate);

  if (today > tenancyEndDate) {
    return "PROPERTY_OVERDUE";
  }

  if (property.capacity > tenants.length) {
    return "PARTIALLY_VACANT";
  }

  return "PROPERTY_ACTIVE";
}
