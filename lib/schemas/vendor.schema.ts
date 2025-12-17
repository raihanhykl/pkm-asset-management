// lib/schemas/vendor.schema.ts

import { z } from "zod";

export const vendorSchema = z.object({
  name: z
    .string()
    .min(1, "Nama vendor wajib diisi")
    .max(200, "Nama terlalu panjang"),
  contact_person: z.string().max(150).optional().nullable(),
  phone: z.string().max(50).optional().nullable(),
  email: z
    .string()
    .email("Format email tidak valid")
    .optional()
    .nullable()
    .or(z.literal("")),
  address: z.string().optional().nullable(),
});

export type VendorFormData = z.infer<typeof vendorSchema>;

export const vendorFilterSchema = z.object({
  search: z.string().optional(),
});

export type VendorFilterData = z.infer<typeof vendorFilterSchema>;
