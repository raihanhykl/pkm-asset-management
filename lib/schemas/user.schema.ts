// lib/schemas/user.schema.ts

import { z } from "zod";

export const userSchema = z.object({
  username: z
    .string()
    .min(3, "Username minimal 3 karakter")
    .max(100, "Username maksimal 100 karakter")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username hanya boleh berisi huruf, angka, dan underscore"
    ),
  full_name: z
    .string()
    .min(1, "Nama lengkap wajib diisi")
    .max(200, "Nama terlalu panjang"),
  email: z.string().email("Format email tidak valid").optional(),
  phone: z.string().max(50, "Nomor telepon terlalu panjang").optional(),
  role_id: z.number("Role wajib dipilih").int().positive(),
  password: z
    .string()
    .min(6, "Password minimal 6 karakter")
    .optional()
    .nullable(),
  is_active: z.boolean().default(true),
});

export type UserFormData = z.infer<typeof userSchema>;

export const createUserSchema = userSchema.extend({
  password: z.string().min(6, "Password minimal 6 karakter"),
});

export const updateUserSchema = userSchema.extend({
  password: z
    .string()
    .min(6, "Password minimal 6 karakter")
    .optional()
    .nullable(),
});

export const userFilterSchema = z.object({
  search: z.string().optional(),
  role_id: z.number().optional(),
  is_active: z.boolean().optional(),
});

export type UserFilterData = z.infer<typeof userFilterSchema>;
