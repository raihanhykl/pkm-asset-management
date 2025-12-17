// lib/dummy-data.ts
// Dummy data provider untuk MVP demo

import {
  Asset,
  AssetCategory,
  Location,
  Vendor,
  User,
  Role,
  AssetRequest,
  //   AssetRequestItem,
  AssetLoan,
  //   AssetLoanItem,
  Classroom,
} from "@/types";

// ==================== Roles ====================
export const dummyRoles: Role[] = [
  { id: 1, name: "admin", description: "Administrator" },
  { id: 2, name: "sarpras", description: "Sarana Prasarana" },
  { id: 3, name: "bendahara", description: "Bendahara" },
  { id: 4, name: "guru", description: "Guru" },
  { id: 5, name: "siswa", description: "Siswa" },
];

// ==================== Users ====================
export const dummyUsers: User[] = [
  {
    id: 1,
    role_id: 1,
    role: dummyRoles[0],
    username: "admin",
    full_name: "Administrator System",
    email: "admin@pkm.ac.id",
    phone: "08123456789",
    is_active: true,
    created_at: "2024-01-01T08:00:00Z",
  },
  {
    id: 2,
    role_id: 2,
    role: dummyRoles[1],
    username: "sarpras01",
    full_name: "Budi Santoso",
    email: "budi@pkm.ac.id",
    phone: "08123456790",
    is_active: true,
    created_at: "2024-01-02T08:00:00Z",
  },
  {
    id: 3,
    role_id: 4,
    role: dummyRoles[3],
    username: "guru01",
    full_name: "Siti Nurhaliza",
    email: "siti@pkm.ac.id",
    phone: "08123456791",
    is_active: true,
    created_at: "2024-01-03T08:00:00Z",
  },
];

// ==================== Asset Categories ====================
export const dummyCategories: AssetCategory[] = [
  { id: 1, name: "Elektronik", description: "Peralatan elektronik" },
  { id: 2, name: "Furniture", description: "Mebel dan perabotan" },
  { id: 3, name: "Kendaraan", description: "Kendaraan operasional" },
  { id: 4, name: "Komputer", description: "Perangkat komputer dan laptop" },
  { id: 5, name: "Alat Laboratorium", description: "Peralatan lab" },
];

// ==================== Locations ====================
export const dummyLocations: Location[] = [
  { id: 1, name: "Gedung A Lantai 1", description: "Ruang administrasi" },
  { id: 2, name: "Gedung A Lantai 2", description: "Ruang kelas" },
  { id: 3, name: "Gedung B Lantai 1", description: "Laboratorium" },
  { id: 4, name: "Gedung B Lantai 2", description: "Ruang multimedia" },
  { id: 5, name: "Parkir", description: "Area parkir" },
];

// ==================== Classrooms ====================
export const dummyClassrooms: Classroom[] = [
  {
    id: 1,
    code: "A101",
    name: "Ruang Kelas A101",
    location_id: 2,
    location: dummyLocations[1],
  },
  {
    id: 2,
    code: "A102",
    name: "Ruang Kelas A102",
    location_id: 2,
    location: dummyLocations[1],
  },
  {
    id: 3,
    code: "LAB01",
    name: "Lab Komputer 1",
    location_id: 3,
    location: dummyLocations[2],
  },
];

// ==================== Vendors ====================
export const dummyVendors: Vendor[] = [
  {
    id: 1,
    name: "PT Maju Bersama",
    contact_person: "John Doe",
    phone: "021-12345678",
    email: "info@majubersama.com",
    address: "Jl. Sudirman No. 123, Jakarta",
    created_at: "2024-01-01T08:00:00Z",
  },
  {
    id: 2,
    name: "CV Teknologi Nusantara",
    contact_person: "Jane Smith",
    phone: "021-87654321",
    email: "sales@teknologi.com",
    address: "Jl. Gatot Subroto No. 45, Jakarta",
    created_at: "2024-01-05T08:00:00Z",
  },
];

// ==================== Assets ====================
export const dummyAssets: Asset[] = [
  {
    id: 1,
    asset_code: "AST-2024-0001",
    name: "Laptop Dell XPS 15",
    category_id: 4,
    category: dummyCategories[3],
    vendor_id: 2,
    vendor: dummyVendors[1],
    purchase_date: "2024-01-15",
    purchase_price: 15000000,
    condition: "good",
    status: "available",
    location_id: 3,
    location: dummyLocations[2],
    serial_number: "DELLXPS-2024-001",
    notes: "Laptop untuk lab komputer",
    created_at: "2024-01-15T10:00:00Z",
  },
  {
    id: 2,
    asset_code: "AST-2024-0002",
    name: "Proyektor Epson EB-X05",
    category_id: 1,
    category: dummyCategories[0],
    vendor_id: 1,
    vendor: dummyVendors[0],
    purchase_date: "2024-01-20",
    purchase_price: 5000000,
    condition: "good",
    status: "borrowed",
    location_id: 2,
    location: dummyLocations[1],
    serial_number: "EPSON-EB-X05-001",
    created_at: "2024-01-20T10:00:00Z",
  },
  {
    id: 3,
    asset_code: "AST-2024-0003",
    name: "Meja Guru",
    category_id: 2,
    category: dummyCategories[1],
    purchase_date: "2024-02-01",
    purchase_price: 1500000,
    condition: "good",
    status: "available",
    location_id: 2,
    location: dummyLocations[1],
    created_at: "2024-02-01T10:00:00Z",
  },
  {
    id: 4,
    asset_code: "AST-2024-0004",
    name: "AC LG 1.5 PK",
    category_id: 1,
    category: dummyCategories[0],
    purchase_date: "2024-02-10",
    purchase_price: 4000000,
    condition: "minor_damage",
    status: "maintenance",
    location_id: 3,
    location: dummyLocations[2],
    notes: "Sedang diperbaiki bocor freon",
    created_at: "2024-02-10T10:00:00Z",
  },
];

// ==================== Asset Requests ====================
export const dummyAssetRequests: AssetRequest[] = [
  {
    id: 1,
    request_number: "REQ-2024-001",
    requester_id: 3,
    requester: dummyUsers[2],
    department: "Lab Komputer",
    purpose: "Kebutuhan praktikum siswa",
    status: "submitted",
    created_at: "2024-12-01T09:00:00Z",
    items: [
      {
        id: 1,
        asset_request_id: 1,
        item_name: "Laptop HP Pavilion",
        specification: "Core i5, RAM 8GB, SSD 512GB",
        quantity: 10,
        estimated_price: 7000000,
      },
      {
        id: 2,
        asset_request_id: 1,
        item_name: "Mouse Wireless Logitech",
        specification: "Logitech M185",
        quantity: 10,
        estimated_price: 150000,
      },
    ],
  },
  {
    id: 2,
    request_number: "REQ-2024-002",
    requester_id: 2,
    requester: dummyUsers[1],
    department: "Ruang Multimedia",
    purpose: "Upgrade peralatan multimedia",
    status: "approved",
    reviewer_id: 1,
    review_note: "Disetujui, prioritas tinggi",
    created_at: "2024-12-05T10:00:00Z",
    items: [
      {
        id: 3,
        asset_request_id: 2,
        item_name: "Proyektor Infocus",
        specification: "Full HD, 3500 lumens",
        quantity: 2,
        estimated_price: 6000000,
      },
    ],
  },
];

// ==================== Asset Loans ====================
export const dummyAssetLoans: AssetLoan[] = [
  {
    id: 1,
    loan_number: "LOAN-2024-001",
    borrower_id: 3,
    borrower: dummyUsers[2],
    borrower_is_student: false,
    responsible_teacher_id: 3,
    responsible_teacher: dummyUsers[2],
    classroom_id: 2,
    classroom: dummyClassrooms[1],
    requested_at: "2024-12-10T08:00:00Z",
    status: "issued",
    expected_return_date: "2024-12-17",
    purpose: "Kegiatan belajar mengajar",
    items: [
      {
        id: 1,
        asset_loan_id: 1,
        asset_id: 2,
        asset: dummyAssets[1],
        condition_on_loan: "good",
        returned: false,
      },
    ],
    created_at: "2024-12-10T08:00:00Z",
  },
  {
    id: 2,
    loan_number: "LOAN-2024-002",
    borrower_name: "Ahmad Rizki (Siswa)",
    borrower_is_student: true,
    responsible_teacher_id: 3,
    responsible_teacher: dummyUsers[2],
    classroom_id: 1,
    classroom: dummyClassrooms[0],
    requested_at: "2024-12-12T09:00:00Z",
    status: "returned",
    expected_return_date: "2024-12-14",
    actual_return_date: "2024-12-14",
    purpose: "Tugas kelompok",
    items: [
      {
        id: 2,
        asset_loan_id: 2,
        asset_id: 1,
        asset: dummyAssets[0],
        condition_on_loan: "good",
        condition_on_return: "good",
        returned: true,
        returned_at: "2024-12-14T15:00:00Z",
      },
    ],
    created_at: "2024-12-12T09:00:00Z",
  },
];

// Helper to simulate delay
export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Helper for pagination
export function paginateData<T>(
  data: T[],
  page: number = 1,
  perPage: number = 10
) {
  const start = (page - 1) * perPage;
  const end = start + perPage;
  return {
    data: data.slice(start, end),
    meta: {
      current_page: page,
      per_page: perPage,
      total: data.length,
      total_pages: Math.ceil(data.length / perPage),
    },
  };
}
