import { z } from "zod";

export const PropertySchema = z.object({
  id: z.string(),
  address: z.string(),
  postcode: z.string(),
  monthlyRentPence: z.number().int(),
  region: z.string(),
  capacity: z.number().int(),
  tenancyEndDate: z.string(),
});

export type Property = z.infer<typeof PropertySchema>;

export const TenantSchema = z.object({
  id: z.string(),
  propertyId: z.string(),
  name: z.string(),
});

export type Tenant = z.infer<typeof TenantSchema>;
