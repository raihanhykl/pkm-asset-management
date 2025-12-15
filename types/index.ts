/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// // types/index.ts

// // ==================== Common Types ====================
// export interface ApiResponse<T = any> {
//   success: boolean;
//   message: string;
//   data: T;
// }

// export interface PaginatedResponse<T = any> {
//   success: boolean;
//   message: string;
//   data: T[];
//   meta: {
//     current_page: number;
//     per_page: number;
//     total: number;
//     total_pages: number;
//   };
// }

// export interface ApiError {
//   success: false;
//   message: string;
//   errors?: Record<string, string[]>;
// }

// // ==================== User & Auth Types ====================
// export type UserRole = "admin" | "guru" | "siswa" | "sarpras" | "bendahara";

// export interface User {
//   id: string;
//   name: string;
//   email: string;
//   role: UserRole;
//   phone?: string;
//   avatar?: string;
//   created_at: string;
//   updated_at: string;
// }

// export interface LoginCredentials {
//   email: string;
//   password: string;
// }

// export interface AuthResponse {
//   user: User;
//   access_token: string;
//   refresh_token?: string;
//   expires_in: number;
// }

// // ==================== Aset Types ====================
// export type AsetStatus =
//   | "tersedia"
//   | "dipinjam"
//   | "rusak"
//   | "maintenance"
//   | "hilang";
// export type KondisiAset = "baik" | "cukup" | "rusak";

// export interface Aset {
//   id: string;
//   kode_aset: string;
//   nama: string;
//   kategori_id: string;
//   kategori?: Kategori;
//   deskripsi?: string;
//   lokasi: string;
//   kondisi: KondisiAset;
//   status: AsetStatus;
//   tahun_perolehan: number;
//   harga_perolehan: number;
//   qr_code?: string;
//   foto?: string;
//   created_at: string;
//   updated_at: string;
// }

// export interface CreateAsetInput {
//   nama: string;
//   kategori_id: string;
//   deskripsi?: string;
//   lokasi: string;
//   kondisi: KondisiAset;
//   tahun_perolehan: number;
//   harga_perolehan: number;
//   foto?: File;
// }

// // ==================== Kategori Types ====================
// export interface Kategori {
//   id: string;
//   nama: string;
//   kode: string;
//   deskripsi?: string;
//   jumlah_aset?: number;
//   created_at: string;
//   updated_at: string;
// }

// // ==================== Vendor Types ====================
// export interface Vendor {
//   id: string;
//   nama: string;
//   alamat: string;
//   telepon: string;
//   email?: string;
//   contact_person?: string;
//   created_at: string;
//   updated_at: string;
// }

// // ==================== Permohonan Aset Types ====================
// export type StatusPermohonan =
//   | "diajukan"
//   | "disetujui"
//   | "ditolak"
//   | "dipesan"
//   | "diterima";

// export interface PermohonanAset {
//   id: string;
//   nama_aset: string;
//   kategori_id: string;
//   kategori?: Kategori;
//   user_id: string;
//   user?: User;
//   jumlah: number;
//   alasan: string;
//   prioritas: "rendah" | "sedang" | "tinggi";
//   estimasi_harga: number;
//   status: StatusPermohonan;
//   catatan_admin?: string;
//   tanggal_disetujui?: string;
//   approved_by?: string;
//   created_at: string;
//   updated_at: string;
// }

// // ==================== Anggaran Types ====================
// export type StatusAnggaran = "diajukan" | "disetujui" | "ditolak";

// export interface Anggaran {
//   id: string;
//   permohonan_id: string;
//   permohonan?: PermohonanAset;
//   jumlah: number;
//   tahun_anggaran: number;
//   status: StatusAnggaran;
//   catatan_bendahara?: string;
//   tanggal_realisasi?: string;
//   created_at: string;
//   updated_at: string;
// }

// // ==================== Penerimaan Aset Types ====================
// export interface PenerimaanAset {
//   id: string;
//   permohonan_id?: string;
//   permohonan?: PermohonanAset;
//   vendor_id: string;
//   vendor?: Vendor;
//   nama_aset: string;
//   kategori_id: string;
//   jumlah: number;
//   harga_satuan: number;
//   total_harga: number;
//   tanggal_terima: string;
//   bukti_nota?: string;
//   foto?: string;
//   keterangan?: string;
//   received_by: string;
//   created_at: string;
//   updated_at: string;
// }

// // ==================== Peminjaman Types ====================
// export type StatusPeminjaman = "dipinjam" | "dikembalikan" | "terlambat";

// export interface Peminjaman {
//   id: string;
//   aset_id: string;
//   aset?: Aset;
//   user_id: string;
//   user?: User;
//   tanggal_pinjam: string;
//   tanggal_kembali_rencana: string;
//   tanggal_kembali_aktual?: string;
//   status: StatusPeminjaman;
//   keperluan: string;
//   kondisi_pinjam: KondisiAset;
//   kondisi_kembali?: KondisiAset;
//   catatan?: string;
//   created_at: string;
//   updated_at: string;
// }

// // ==================== Maintenance Types ====================
// export type StatusMaintenance = "dalam_perbaikan" | "selesai";

// export interface Maintenance {
//   id: string;
//   aset_id: string;
//   aset?: Aset;
//   tanggal_mulai: string;
//   tanggal_selesai?: string;
//   deskripsi_masalah: string;
//   tindakan: string;
//   biaya?: number;
//   vendor_id?: string;
//   vendor?: Vendor;
//   status: StatusMaintenance;
//   teknisi?: string;
//   created_at: string;
//   updated_at: string;
// }

// // ==================== Table Types ====================
// export interface TableFilter {
//   search?: string;
//   page?: number;
//   per_page?: number;
//   sort_by?: string;
//   sort_order?: "asc" | "desc";
//   [key: string]: any;
// }

// // ==================== Form Types ====================
// export interface FormState<T = any> {
//   data: T | null;
//   errors: Record<string, string>;
//   isSubmitting: boolean;
//   isSuccess: boolean;
// }

// ================== V2 =====================

// types/index.ts

// ==================== Common Types ====================
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaginatedResponse<T = any> {
  success: boolean;
  message: string;
  data: T[];
  meta: {
    current_page: number;
    per_page: number;
    total: number;
    total_pages: number;
  };
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

// ==================== User & Auth Types ====================
export type UserRole = "admin" | "sarpras" | "bendahara" | "guru" | "siswa";

export interface Role {
  id: number;
  name: string;
  description?: string;
}

export interface User {
  id: number;
  role_id: number;
  role?: Role;
  username: string;
  full_name: string;
  email?: string;
  phone?: string;
  is_active: boolean;
  created_at: string;
  updated_at?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  access_token: string;
  refresh_token?: string;
  expires_in: number;
}

// ==================== Aset Types ====================
export type AssetCondition =
  | "new"
  | "good"
  | "minor_damage"
  | "major_damage"
  | "lost";
export type AssetStatus =
  | "available"
  | "borrowed"
  | "maintenance"
  | "damaged"
  | "lost"
  | "retired";

export interface Asset {
  id: number;
  asset_code: string;
  name: string;
  category_id?: number;
  category?: AssetCategory;
  vendor_id?: number;
  vendor?: Vendor;
  purchase_date?: string;
  purchase_price?: number;
  condition: AssetCondition;
  status: AssetStatus;
  location_id?: number;
  location?: Location;
  serial_number?: string;
  notes?: string;
  purchase_item_id?: number;
  created_at: string;
  updated_at?: string;
  // nambahin ini
  photo?: string;
}

export interface CreateAssetInput {
  name: string;
  category_id?: number;
  vendor_id?: number;
  purchase_date?: string;
  purchase_price?: number;
  condition: AssetCondition;
  location_id?: number;
  serial_number?: string;
  notes?: string;
  photo?: File;
}

// ==================== Category, Location, Classroom Types ====================
export interface AssetCategory {
  id: number;
  name: string;
  description?: string;
}

export interface Location {
  id: number;
  name: string;
  description?: string;
}

export interface Classroom {
  id: number;
  code: string;
  name: string;
  location_id?: number;
  location?: Location;
}

// ==================== Vendor Types ====================
export interface Vendor {
  id: number;
  name: string;
  contact_person?: string;
  phone?: string;
  email?: string;
  address?: string;
  created_at: string;
}

// ==================== Asset Request Types ====================
export type RequestStatus =
  | "draft"
  | "submitted"
  | "approved"
  | "rejected"
  | "cancelled";

export interface AssetRequest {
  id: number;
  request_number: string;
  requester_id?: number;
  requester?: User;
  department?: string;
  purpose?: string;
  status: RequestStatus;
  reviewer_id?: number;
  reviewer?: User;
  review_note?: string;
  items?: AssetRequestItem[];
  created_at: string;
  updated_at?: string;
}

export interface AssetRequestItem {
  id: number;
  asset_request_id: number;
  item_name: string;
  specification?: string;
  quantity: number;
  estimated_price?: number;
  note?: string;
}

// ==================== Budget Request Types ====================
export type BudgetStatus =
  | "draft"
  | "submitted"
  | "approved"
  | "rejected"
  | "realized";

export interface BudgetRequest {
  id: number;
  budget_number: string;
  asset_request_id?: number;
  asset_request?: AssetRequest;
  requester_id?: number;
  requester?: User;
  amount: number;
  purpose?: string;
  status: BudgetStatus;
  approved_by?: number;
  approver?: User;
  approved_at?: string;
  realized_at?: string;
  created_at: string;
}

// ==================== Purchase / Penerimaan Types ====================
export interface Purchase {
  id: number;
  purchase_number: string;
  vendor_id?: number;
  vendor?: Vendor;
  related_asset_request_id?: number;
  related_asset_request?: AssetRequest;
  invoice_number?: string;
  purchase_date: string;
  total_amount: number;
  received_by?: number;
  receiver?: User;
  notes?: string;
  items?: PurchaseItem[];
  created_at: string;
}

export interface PurchaseItem {
  id: number;
  purchase_id: number;
  item_name: string;
  quantity: number;
  unit_price?: number;
  subtotal?: number;
  asset_category_id?: number;
  asset_category?: AssetCategory;
  note?: string;
}

// ==================== Asset Loan Types ====================
export type LoanStatus =
  | "pending"
  | "approved"
  | "issued"
  | "returned"
  | "overdue"
  | "rejected";

export interface AssetLoan {
  id: number;
  loan_number: string;
  borrower_id?: number;
  borrower?: User;
  borrower_name?: string;
  borrower_is_student: boolean;
  responsible_teacher_id?: number;
  responsible_teacher?: User;
  requested_by?: number;
  requester?: User;
  classroom_id?: number;
  classroom?: Classroom;
  requested_at: string;
  approved_by?: number;
  approver?: User;
  approved_at?: string;
  issued_by?: number;
  issuer?: User;
  issued_at?: string;
  returned_at?: string;
  status: LoanStatus;
  expected_return_date?: string;
  actual_return_date?: string;
  purpose?: string;
  note?: string;
  items?: AssetLoanItem[];
  created_at: string;
  updated_at?: string;
}

export interface AssetLoanItem {
  id: number;
  asset_loan_id: number;
  asset_id: number;
  asset?: Asset;
  condition_on_loan?: AssetCondition;
  condition_on_return?: AssetCondition;
  returned: boolean;
  returned_at?: string;
  return_note?: string;
}

// ==================== Maintenance Types ====================
export type MaintenanceStatus =
  | "reported"
  | "in_progress"
  | "completed"
  | "cancelled";

export interface AssetMaintenance {
  id: number;
  maintenance_number: string;
  asset_id: number;
  asset?: Asset;
  reported_by?: number;
  reporter?: User;
  assigned_to?: number;
  assignee?: User;
  description?: string;
  status: MaintenanceStatus;
  reported_at: string;
  start_at?: string;
  end_at?: string;
  cost: number;
  vendor_id?: number;
  vendor?: Vendor;
  note?: string;
  logs?: MaintenanceLog[];
  created_at: string;
  updated_at?: string;
}

export interface MaintenanceLog {
  id: number;
  maintenance_id: number;
  log_time: string;
  note?: string;
  performed_by?: number;
  performer?: User;
}

// ==================== Asset History Types ====================
export interface AssetHistory {
  id: number;
  asset_id?: number;
  asset?: Asset;
  event_type: string;
  event_time: string;
  actor_id?: number;
  actor?: User;
  details?: Record<string, any>;
}

// ==================== Attachment Types ====================
export interface Attachment {
  id: number;
  owner_table: string;
  owner_id: number;
  filename?: string;
  content_type?: string;
  file_path?: string;
  uploaded_by?: number;
  uploader?: User;
  uploaded_at: string;
}

// ==================== Table Types ====================
export interface TableFilter {
  search?: string;
  page?: number;
  per_page?: number;
  sort_by?: string;
  sort_order?: "asc" | "desc";
  [key: string]: any;
}

// ==================== Form Types ====================
export interface FormState<T = any> {
  data: T | null;
  errors: Record<string, string>;
  isSubmitting: boolean;
  isSuccess: boolean;
}
