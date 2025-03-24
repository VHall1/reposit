import type { Property } from "../types";

export interface PropertyStore {
  all(): Property[];
  findById(id: Property["id"]): Property | undefined;
  getByRegion(region: string): Property[];
}

export class InMemoryPropertyStore implements PropertyStore {
  private properties: Property[];

  constructor(properties: Property[]) {
    this.properties = properties;
  }

  all(): Property[] {
    return this.properties;
  }

  findById(id: Property["id"]): Property | undefined {
    return this.properties.find((p) => p.id === id);
  }

  getByRegion(region: string): Property[] {
    return this.properties.filter((p) => p.region === region);
  }
}
