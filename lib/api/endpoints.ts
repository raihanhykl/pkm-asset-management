// // lib/api/endpoints.ts

// export const API_ENDPOINTS = {
//   // Auth
//   AUTH: {
//     LOGIN: "/auth/login",
//     LOGOUT: "/auth/logout",
//     REFRESH: "/auth/refresh",
//     ME: "/auth/me",
//   },

//   // Master Aset
//   ASET: {
//     LIST: "/aset",
//     DETAIL: (id: string) => `/aset/${id}`,
//     CREATE: "/aset",
//     UPDATE: (id: string) => `/aset/${id}`,
//     DELETE: (id: string) => `/aset/${id}`,
//     EXPORT: "/aset/export",
//     GENERATE_QR: (id: string) => `/aset/${id}/qr-code`,
//   },

//   // Master Kategori
//   KATEGORI: {
//     LIST: "/kategori",
//     DETAIL: (id: string) => `/kategori/${id}`,
//     CREATE: "/kategori",
//     UPDATE: (id: string) => `/kategori/${id}`,
//     DELETE: (id: string) => `/kategori/${id}`,
//   },

//   // Master Pengguna
//   PENGGUNA: {
//     LIST: "/pengguna",
//     DETAIL: (id: string) => `/pengguna/${id}`,
//     CREATE: "/pengguna",
//     UPDATE: (id: string) => `/pengguna/${id}`,
//     DELETE: (id: string) => `/pengguna/${id}`,
//   },

//   // Master Vendor
//   VENDOR: {
//     LIST: "/vendor",
//     DETAIL: (id: string) => `/vendor/${id}`,
//     CREATE: "/vendor",
//     UPDATE: (id: string) => `/vendor/${id}`,
//     DELETE: (id: string) => `/vendor/${id}`,
//   },

//   // Permohonan Aset
//   PERMOHONAN: {
//     LIST: "/permohonan-aset",
//     DETAIL: (id: string) => `/permohonan-aset/${id}`,
//     CREATE: "/permohonan-aset",
//     UPDATE: (id: string) => `/permohonan-aset/${id}`,
//     DELETE: (id: string) => `/permohonan-aset/${id}`,
//     APPROVE: (id: string) => `/permohonan-aset/${id}/approve`,
//     REJECT: (id: string) => `/permohonan-aset/${id}/reject`,
//   },

//   // Anggaran
//   ANGGARAN: {
//     LIST: "/anggaran",
//     DETAIL: (id: string) => `/anggaran/${id}`,
//     CREATE: "/anggaran",
//     UPDATE: (id: string) => `/anggaran/${id}`,
//     DELETE: (id: string) => `/anggaran/${id}`,
//     APPROVE: (id: string) => `/anggaran/${id}/approve`,
//     REJECT: (id: string) => `/anggaran/${id}/reject`,
//   },

//   // Penerimaan Aset
//   PENERIMAAN: {
//     LIST: "/penerimaan-aset",
//     DETAIL: (id: string) => `/penerimaan-aset/${id}`,
//     CREATE: "/penerimaan-aset",
//     UPDATE: (id: string) => `/penerimaan-aset/${id}`,
//     DELETE: (id: string) => `/penerimaan-aset/${id}`,
//   },

//   // Peminjaman
//   PEMINJAMAN: {
//     LIST: "/peminjaman",
//     DETAIL: (id: string) => `/peminjaman/${id}`,
//     CREATE: "/peminjaman",
//     UPDATE: (id: string) => `/peminjaman/${id}`,
//     DELETE: (id: string) => `/peminjaman/${id}`,
//     RETURN: (id: string) => `/peminjaman/${id}/return`,
//   },

//   // Maintenance
//   MAINTENANCE: {
//     LIST: "/maintenance",
//     DETAIL: (id: string) => `/maintenance/${id}`,
//     CREATE: "/maintenance",
//     UPDATE: (id: string) => `/maintenance/${id}`,
//     DELETE: (id: string) => `/maintenance/${id}`,
//     COMPLETE: (id: string) => `/maintenance/${id}/complete`,
//   },

//   // Laporan
//   LAPORAN: {
//     DASHBOARD: "/laporan/dashboard",
//     ASET: "/laporan/aset",
//     PERMOHONAN: "/laporan/permohonan",
//     PEMINJAMAN: "/laporan/peminjaman",
//     MAINTENANCE: "/laporan/maintenance",
//   },
// };

// ========== V2 ============

// lib/api/endpoints.ts

export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
    ME: "/auth/me",
  },

  // Master Assets
  ASSETS: {
    LIST: "/assets",
    DETAIL: (id: number) => `/assets/${id}`,
    CREATE: "/assets",
    UPDATE: (id: number) => `/assets/${id}`,
    DELETE: (id: number) => `/assets/${id}`,
    EXPORT: "/assets/export",
    HISTORY: (id: number) => `/assets/${id}/history`,
  },

  // Master Asset Categories
  ASSET_CATEGORIES: {
    LIST: "/asset-categories",
    DETAIL: (id: number) => `/asset-categories/${id}`,
    CREATE: "/asset-categories",
    UPDATE: (id: number) => `/asset-categories/${id}`,
    DELETE: (id: number) => `/asset-categories/${id}`,
  },

  // Master Locations
  LOCATIONS: {
    LIST: "/locations",
    DETAIL: (id: number) => `/locations/${id}`,
    CREATE: "/locations",
    UPDATE: (id: number) => `/locations/${id}`,
    DELETE: (id: number) => `/locations/${id}`,
  },

  // Master Classrooms
  CLASSROOMS: {
    LIST: "/classrooms",
    DETAIL: (id: number) => `/classrooms/${id}`,
    CREATE: "/classrooms",
    UPDATE: (id: number) => `/classrooms/${id}`,
    DELETE: (id: number) => `/classrooms/${id}`,
  },

  // Master Users
  USERS: {
    LIST: "/users",
    DETAIL: (id: number) => `/users/${id}`,
    CREATE: "/users",
    UPDATE: (id: number) => `/users/${id}`,
    DELETE: (id: number) => `/users/${id}`,
  },

  // Master Roles
  ROLES: {
    LIST: "/roles",
    DETAIL: (id: number) => `/roles/${id}`,
  },

  // Master Vendors
  VENDORS: {
    LIST: "/vendors",
    DETAIL: (id: number) => `/vendors/${id}`,
    CREATE: "/vendors",
    UPDATE: (id: number) => `/vendors/${id}`,
    DELETE: (id: number) => `/vendors/${id}`,
  },

  // Asset Requests (Permohonan Aset)
  ASSET_REQUESTS: {
    LIST: "/asset-requests",
    DETAIL: (id: number) => `/asset-requests/${id}`,
    CREATE: "/asset-requests",
    UPDATE: (id: number) => `/asset-requests/${id}`,
    DELETE: (id: number) => `/asset-requests/${id}`,
    SUBMIT: (id: number) => `/asset-requests/${id}/submit`,
    APPROVE: (id: number) => `/asset-requests/${id}/approve`,
    REJECT: (id: number) => `/asset-requests/${id}/reject`,
    CANCEL: (id: number) => `/asset-requests/${id}/cancel`,
    // Items
    ADD_ITEM: (id: number) => `/asset-requests/${id}/items`,
    UPDATE_ITEM: (requestId: number, itemId: number) =>
      `/asset-requests/${requestId}/items/${itemId}`,
    DELETE_ITEM: (requestId: number, itemId: number) =>
      `/asset-requests/${requestId}/items/${itemId}`,
  },

  // Budget Requests (Anggaran)
  BUDGET_REQUESTS: {
    LIST: "/budget-requests",
    DETAIL: (id: number) => `/budget-requests/${id}`,
    CREATE: "/budget-requests",
    UPDATE: (id: number) => `/budget-requests/${id}`,
    DELETE: (id: number) => `/budget-requests/${id}`,
    SUBMIT: (id: number) => `/budget-requests/${id}/submit`,
    APPROVE: (id: number) => `/budget-requests/${id}/approve`,
    REJECT: (id: number) => `/budget-requests/${id}/reject`,
    REALIZE: (id: number) => `/budget-requests/${id}/realize`,
  },

  // Purchases (Penerimaan Aset)
  PURCHASES: {
    LIST: "/purchases",
    DETAIL: (id: number) => `/purchases/${id}`,
    CREATE: "/purchases",
    UPDATE: (id: number) => `/purchases/${id}`,
    DELETE: (id: number) => `/purchases/${id}`,
    // Items
    ADD_ITEM: (id: number) => `/purchases/${id}/items`,
    UPDATE_ITEM: (purchaseId: number, itemId: number) =>
      `/purchases/${purchaseId}/items/${itemId}`,
    DELETE_ITEM: (purchaseId: number, itemId: number) =>
      `/purchases/${purchaseId}/items/${itemId}`,
    // Generate assets from purchase
    GENERATE_ASSETS: (id: number) => `/purchases/${id}/generate-assets`,
  },

  // Asset Loans (Peminjaman)
  ASSET_LOANS: {
    LIST: "/asset-loans",
    DETAIL: (id: number) => `/asset-loans/${id}`,
    CREATE: "/asset-loans",
    UPDATE: (id: number) => `/asset-loans/${id}`,
    DELETE: (id: number) => `/asset-loans/${id}`,
    APPROVE: (id: number) => `/asset-loans/${id}/approve`,
    REJECT: (id: number) => `/asset-loans/${id}/reject`,
    ISSUE: (id: number) => `/asset-loans/${id}/issue`,
    RETURN: (id: number) => `/asset-loans/${id}/return`,
    // Items
    ADD_ITEM: (id: number) => `/asset-loans/${id}/items`,
    UPDATE_ITEM: (loanId: number, itemId: number) =>
      `/asset-loans/${loanId}/items/${itemId}`,
    DELETE_ITEM: (loanId: number, itemId: number) =>
      `/asset-loans/${loanId}/items/${itemId}`,
    RETURN_ITEM: (loanId: number, itemId: number) =>
      `/asset-loans/${loanId}/items/${itemId}/return`,
  },

  // Asset Maintenances (Perawatan)
  ASSET_MAINTENANCES: {
    LIST: "/asset-maintenances",
    DETAIL: (id: number) => `/asset-maintenances/${id}`,
    CREATE: "/asset-maintenances",
    UPDATE: (id: number) => `/asset-maintenances/${id}`,
    DELETE: (id: number) => `/asset-maintenances/${id}`,
    START: (id: number) => `/asset-maintenances/${id}/start`,
    COMPLETE: (id: number) => `/asset-maintenances/${id}/complete`,
    CANCEL: (id: number) => `/asset-maintenances/${id}/cancel`,
    // Logs
    ADD_LOG: (id: number) => `/asset-maintenances/${id}/logs`,
    LOGS: (id: number) => `/asset-maintenances/${id}/logs`,
  },

  // Attachments
  ATTACHMENTS: {
    LIST: "/attachments",
    UPLOAD: "/attachments",
    DOWNLOAD: (id: number) => `/attachments/${id}/download`,
    DELETE: (id: number) => `/attachments/${id}`,
  },

  // Reports / Laporan
  REPORTS: {
    DASHBOARD: "/reports/dashboard",
    ASSETS: "/reports/assets",
    ASSET_REQUESTS: "/reports/asset-requests",
    ASSET_LOANS: "/reports/asset-loans",
    MAINTENANCES: "/reports/maintenances",
    BUDGET: "/reports/budget",
  },
};
