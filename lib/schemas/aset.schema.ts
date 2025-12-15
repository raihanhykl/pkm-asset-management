// // lib/schemas/aset.schema.ts

// import { z } from "zod";
// import { KONDISI_ASET } from "@/lib/constants";

// export const asetSchema = z.object({
//   nama: z
//     .string()
//     .min(1, "Nama aset wajib diisi")
//     .max(255, "Nama terlalu panjang"),
//   kategori_id: z.string().min(1, "Kategori wajib dipilih"),
//   deskripsi: z.string().optional(),
//   lokasi: z.string().min(1, "Lokasi wajib diisi"),
//   kondisi: z
//     .enum([KONDISI_ASET.BAIK, KONDISI_ASET.CUKUP, KONDISI_ASET.RUSAK])
//     .refine((val) => val !== undefined && val !== null, {
//       message: "Kondisi wajib dipilih",
//     }),
//   tahun_perolehan: z
//     .number({ message: "Tahun perolehan wajib diisi" })
//     .int()
//     .min(1900, "Tahun tidak valid")
//     .max(
//       new Date().getFullYear(),
//       "Tahun tidak boleh lebih dari tahun sekarang"
//     ),
//   harga_perolehan: z
//     .number({ message: "Harga perolehan wajib diisi" })
//     .min(0, "Harga tidak boleh negatif"),
//   foto: z.instanceof(File).optional().nullable(),
// });

// export type AsetFormData = z.infer<typeof asetSchema>;

// export const asetFilterSchema = z.object({
//   search: z.string().optional(),
//   kategori_id: z.string().optional(),
//   kondisi: z.string().optional(),
//   status: z.string().optional(),
//   lokasi: z.string().optional(),
//   tahun_perolehan: z.number().optional(),
// });

// export type AsetFilterData = z.infer<typeof asetFilterSchema>;

//  ========== V2 =============

// lib/schemas/aset.schema.ts

import { z } from "zod";
import { ASSET_CONDITION } from "@/lib/constants";

export const assetSchema = z.object({
  name: z
    .string()
    .min(1, "Nama aset wajib diisi")
    .max(250, "Nama terlalu panjang"),
  category_id: z.number({ message: "Kategori wajib dipilih" }).int().positive(),
  vendor_id: z.number().int().positive().optional().nullable(),
  purchase_date: z.string().optional().nullable(),
  purchase_price: z
    .number({ message: "Harga perolehan wajib diisi" })
    .min(0, "Harga tidak boleh negatif")
    .optional()
    .nullable(),
  condition: z
    .enum(
      [
        ASSET_CONDITION.NEW,
        ASSET_CONDITION.GOOD,
        ASSET_CONDITION.MINOR_DAMAGE,
        ASSET_CONDITION.MAJOR_DAMAGE,
        ASSET_CONDITION.LOST,
      ]
      // {
      //   required_error: "Kondisi wajib dipilih",
      // }
    )
    .refine((val) => val !== undefined && val !== null, {
      message: "Kondisi wajib dipilih",
    }),
  location_id: z.number().int().positive().optional().nullable(),
  serial_number: z.string().max(200).optional().nullable(),
  notes: z.string().optional().nullable(),
  photo: z.instanceof(File).optional().nullable(),
});

export type AssetFormData = z.infer<typeof assetSchema>;

export const assetFilterSchema = z.object({
  search: z.string().optional(),
  category_id: z.number().optional(),
  condition: z.string().optional(),
  status: z.string().optional(),
  location_id: z.number().optional(),
  vendor_id: z.number().optional(),
  purchase_date_from: z.string().optional(),
  purchase_date_to: z.string().optional(),
});

export type AssetFilterData = z.infer<typeof assetFilterSchema>;
