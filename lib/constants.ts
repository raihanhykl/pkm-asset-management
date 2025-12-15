// // lib/constants.ts

// export const APP_NAME =
//   process.env.NEXT_PUBLIC_APP_NAME || "PKM Asset Management";
// export const API_URL =
//   process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
// export const TOKEN_KEY =
//   process.env.NEXT_PUBLIC_TOKEN_KEY || "pkm_access_token";
// export const REFRESH_TOKEN_KEY =
//   process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY || "pkm_refresh_token";

// // User Roles
// export const USER_ROLES = {
//   ADMIN: "admin",
//   GURU: "guru",
//   SISWA: "siswa",
//   SARPRAS: "sarpras",
//   BENDAHARA: "bendahara",
// } as const;

// export const ROLE_LABELS: Record<string, string> = {
//   admin: "Administrator",
//   guru: "Guru",
//   siswa: "Siswa",
//   sarpras: "Sarana Prasarana",
//   bendahara: "Bendahara",
// };

// // Aset Status & Kondisi
// export const ASET_STATUS = {
//   TERSEDIA: "tersedia",
//   DIPINJAM: "dipinjam",
//   RUSAK: "rusak",
//   MAINTENANCE: "maintenance",
//   HILANG: "hilang",
// } as const;

// export const ASET_STATUS_LABELS: Record<string, string> = {
//   tersedia: "Tersedia",
//   dipinjam: "Dipinjam",
//   rusak: "Rusak",
//   maintenance: "Dalam Perawatan",
//   hilang: "Hilang",
// };

// export const KONDISI_ASET = {
//   BAIK: "baik",
//   CUKUP: "cukup",
//   RUSAK: "rusak",
// } as const;

// export const KONDISI_LABELS: Record<string, string> = {
//   baik: "Baik",
//   cukup: "Cukup",
//   rusak: "Rusak",
// };

// // Status Permohonan
// export const STATUS_PERMOHONAN = {
//   DIAJUKAN: "diajukan",
//   DISETUJUI: "disetujui",
//   DITOLAK: "ditolak",
//   DIPESAN: "dipesan",
//   DITERIMA: "diterima",
// } as const;

// export const STATUS_PERMOHONAN_LABELS: Record<string, string> = {
//   diajukan: "Diajukan",
//   disetujui: "Disetujui",
//   ditolak: "Ditolak",
//   dipesan: "Dipesan",
//   diterima: "Diterima",
// };

// // Status Anggaran
// export const STATUS_ANGGARAN = {
//   DIAJUKAN: "diajukan",
//   DISETUJUI: "disetujui",
//   DITOLAK: "ditolak",
// } as const;

// export const STATUS_ANGGARAN_LABELS: Record<string, string> = {
//   diajukan: "Diajukan",
//   disetujui: "Disetujui",
//   ditolak: "Ditolak",
// };

// // Status Peminjaman
// export const STATUS_PEMINJAMAN = {
//   DIPINJAM: "dipinjam",
//   DIKEMBALIKAN: "dikembalikan",
//   TERLAMBAT: "terlambat",
// } as const;

// export const STATUS_PEMINJAMAN_LABELS: Record<string, string> = {
//   dipinjam: "Dipinjam",
//   dikembalikan: "Dikembalikan",
//   terlambat: "Terlambat",
// };

// // Status Maintenance
// export const STATUS_MAINTENANCE = {
//   DALAM_PERBAIKAN: "dalam_perbaikan",
//   SELESAI: "selesai",
// } as const;

// export const STATUS_MAINTENANCE_LABELS: Record<string, string> = {
//   dalam_perbaikan: "Dalam Perbaikan",
//   selesai: "Selesai",
// };

// // Prioritas
// export const PRIORITAS = {
//   RENDAH: "rendah",
//   SEDANG: "sedang",
//   TINGGI: "tinggi",
// } as const;

// export const PRIORITAS_LABELS: Record<string, string> = {
//   rendah: "Rendah",
//   sedang: "Sedang",
//   tinggi: "Tinggi",
// };

// // Pagination
// export const DEFAULT_PAGE_SIZE = 10;
// export const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

// // Date Format
// export const DATE_FORMAT = "dd/MM/yyyy";
// export const DATETIME_FORMAT = "dd/MM/yyyy HH:mm";

// // File Upload
// export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
// export const ALLOWED_IMAGE_TYPES = [
//   "image/jpeg",
//   "image/jpg",
//   "image/png",
//   "image/webp",
// ];
// export const ALLOWED_DOCUMENT_TYPES = [
//   "application/pdf",
//   "image/jpeg",
//   "image/jpg",
//   "image/png",
// ];

// =========== V2 ===============

// lib/constants.ts

export const APP_NAME =
  process.env.NEXT_PUBLIC_APP_NAME || "PKM Asset Management";
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
export const TOKEN_KEY =
  process.env.NEXT_PUBLIC_TOKEN_KEY || "pkm_access_token";
export const REFRESH_TOKEN_KEY =
  process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY || "pkm_refresh_token";

// User Roles
export const USER_ROLES = {
  ADMIN: "admin",
  SARPRAS: "sarpras",
  BENDAHARA: "bendahara",
  GURU: "guru",
  SISWA: "siswa",
} as const;

export const ROLE_LABELS: Record<string, string> = {
  admin: "Administrator",
  sarpras: "Sarana Prasarana",
  bendahara: "Bendahara",
  guru: "Guru",
  siswa: "Siswa",
};

// Asset Condition (Kondisi Aset)
export const ASSET_CONDITION = {
  NEW: "new",
  GOOD: "good",
  MINOR_DAMAGE: "minor_damage",
  MAJOR_DAMAGE: "major_damage",
  LOST: "lost",
} as const;

export const CONDITION_LABELS: Record<string, string> = {
  new: "Baru",
  good: "Baik",
  minor_damage: "Rusak Ringan",
  major_damage: "Rusak Berat",
  lost: "Hilang",
};

// Asset Status
export const ASSET_STATUS = {
  AVAILABLE: "available",
  BORROWED: "borrowed",
  MAINTENANCE: "maintenance",
  DAMAGED: "damaged",
  LOST: "lost",
  RETIRED: "retired",
} as const;

export const ASSET_STATUS_LABELS: Record<string, string> = {
  available: "Tersedia",
  borrowed: "Dipinjam",
  maintenance: "Dalam Perawatan",
  damaged: "Rusak",
  lost: "Hilang",
  retired: "Tidak Digunakan",
};

// Request Status (Status Permohonan)
export const REQUEST_STATUS = {
  DRAFT: "draft",
  SUBMITTED: "submitted",
  APPROVED: "approved",
  REJECTED: "rejected",
  CANCELLED: "cancelled",
} as const;

export const REQUEST_STATUS_LABELS: Record<string, string> = {
  draft: "Draft",
  submitted: "Diajukan",
  approved: "Disetujui",
  rejected: "Ditolak",
  cancelled: "Dibatalkan",
};

// Budget Status
export const BUDGET_STATUS = {
  DRAFT: "draft",
  SUBMITTED: "submitted",
  APPROVED: "approved",
  REJECTED: "rejected",
  REALIZED: "realized",
} as const;

export const BUDGET_STATUS_LABELS: Record<string, string> = {
  draft: "Draft",
  submitted: "Diajukan",
  approved: "Disetujui",
  rejected: "Ditolak",
  realized: "Terealisasi",
};

// Loan Status (Status Peminjaman)
export const LOAN_STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  ISSUED: "issued",
  RETURNED: "returned",
  OVERDUE: "overdue",
  REJECTED: "rejected",
} as const;

export const LOAN_STATUS_LABELS: Record<string, string> = {
  pending: "Menunggu",
  approved: "Disetujui",
  issued: "Dipinjamkan",
  returned: "Dikembalikan",
  overdue: "Terlambat",
  rejected: "Ditolak",
};

// Maintenance Status
export const MAINTENANCE_STATUS = {
  REPORTED: "reported",
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
} as const;

export const MAINTENANCE_STATUS_LABELS: Record<string, string> = {
  reported: "Dilaporkan",
  in_progress: "Dalam Perbaikan",
  completed: "Selesai",
  cancelled: "Dibatalkan",
};

// Prioritas (untuk backward compatibility jika diperlukan)
export const PRIORITAS = {
  RENDAH: "rendah",
  SEDANG: "sedang",
  TINGGI: "tinggi",
} as const;

export const PRIORITAS_LABELS: Record<string, string> = {
  rendah: "Rendah",
  sedang: "Sedang",
  tinggi: "Tinggi",
};

// Pagination
export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

// Date Format
export const DATE_FORMAT = "dd/MM/yyyy";
export const DATETIME_FORMAT = "dd/MM/yyyy HH:mm";

// File Upload
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
export const ALLOWED_DOCUMENT_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/jpg",
  "image/png",
];
