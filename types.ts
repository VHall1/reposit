// TODO: convert to proper types (i.e. number and dates)

export interface Property {
  id: string;
  address: string;
  postcode: string;
  monthlyRentPence: string;
  region: string;
  capacity: string;
  tenancyEndDate: string;
}

export interface Tenant {
  id: string;
  propertyId: string;
  name: string;
}
