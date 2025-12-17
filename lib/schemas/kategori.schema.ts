// lib/schemas/kategori.schema.ts

import { z } from "zod";

export const kategoriSchema = z.object({
  name: z
    .string()
    .min(1, "Nama kategori wajib diisi")
    .max(120, "Nama terlalu panjang"),
  description: z.string().optional(),
});

export type KategoriFormData = z.infer<typeof kategoriSchema>;

export const kategoriFilterSchema = z.object({
  search: z.string().optional(),
});

export type KategoriFilterData = z.infer<typeof kategoriFilterSchema>;
