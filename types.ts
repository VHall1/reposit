export interface Property {
  id: string;
  address: string;
  postcode: string;
  monthlyRentPence: number;
  region: string;
  capacity: number;
  tenancyEndDate: string;
}

export interface Tenant {
  id: string;
  propertyId: string;
  name: string;
}
