import type { Tenant } from "../types";

export interface TenantStore {
  all(): Tenant[];
  getByPropertyId(propertyId: Tenant["propertyId"]): Tenant[];
}

export class InMemoryTenantStore implements TenantStore {
  private tenants: Tenant[];

  constructor(tenants: Tenant[]) {
    this.tenants = tenants;
  }

  all(): Tenant[] {
    return this.tenants;
  }

  getByPropertyId(propertyId: Tenant["propertyId"]): Tenant[] {
    return this.tenants.filter((t) => t.propertyId === propertyId);
  }
}
