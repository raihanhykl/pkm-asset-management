// // components/shared/status-badge.tsx

// import { Badge } from "@/components/ui/badge";
// import { cn } from "@/lib/utils";
// import {
//   ASET_STATUS_LABELS,
//   KONDISI_LABELS,
//   STATUS_PERMOHONAN_LABELS,
//   STATUS_ANGGARAN_LABELS,
//   STATUS_PEMINJAMAN_LABELS,
//   STATUS_MAINTENANCE_LABELS,
//   PRIORITAS_LABELS,
// } from "@/lib/constants";

// type StatusType =
//   | "aset"
//   | "kondisi"
//   | "permohonan"
//   | "anggaran"
//   | "peminjaman"
//   | "maintenance"
//   | "prioritas";

// interface StatusBadgeProps {
//   type: StatusType;
//   value: string;
//   className?: string;
// }

// const statusVariants: Record<StatusType, Record<string, string>> = {
//   aset: {
//     tersedia: "bg-green-100 text-green-800 hover:bg-green-100",
//     dipinjam: "bg-blue-100 text-blue-800 hover:bg-blue-100",
//     rusak: "bg-red-100 text-red-800 hover:bg-red-100",
//     maintenance: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
//     hilang: "bg-gray-100 text-gray-800 hover:bg-gray-100",
//   },
//   kondisi: {
//     baik: "bg-green-100 text-green-800 hover:bg-green-100",
//     cukup: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
//     rusak: "bg-red-100 text-red-800 hover:bg-red-100",
//   },
//   permohonan: {
//     diajukan: "bg-blue-100 text-blue-800 hover:bg-blue-100",
//     disetujui: "bg-green-100 text-green-800 hover:bg-green-100",
//     ditolak: "bg-red-100 text-red-800 hover:bg-red-100",
//     dipesan: "bg-purple-100 text-purple-800 hover:bg-purple-100",
//     diterima: "bg-teal-100 text-teal-800 hover:bg-teal-100",
//   },
//   anggaran: {
//     diajukan: "bg-blue-100 text-blue-800 hover:bg-blue-100",
//     disetujui: "bg-green-100 text-green-800 hover:bg-green-100",
//     ditolak: "bg-red-100 text-red-800 hover:bg-red-100",
//   },
//   peminjaman: {
//     dipinjam: "bg-blue-100 text-blue-800 hover:bg-blue-100",
//     dikembalikan: "bg-green-100 text-green-800 hover:bg-green-100",
//     terlambat: "bg-red-100 text-red-800 hover:bg-red-100",
//   },
//   maintenance: {
//     dalam_perbaikan: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
//     selesai: "bg-green-100 text-green-800 hover:bg-green-100",
//   },
//   prioritas: {
//     rendah: "bg-gray-100 text-gray-800 hover:bg-gray-100",
//     sedang: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
//     tinggi: "bg-red-100 text-red-800 hover:bg-red-100",
//   },
// };

// const statusLabels: Record<StatusType, Record<string, string>> = {
//   aset: ASET_STATUS_LABELS,
//   kondisi: KONDISI_LABELS,
//   permohonan: STATUS_PERMOHONAN_LABELS,
//   anggaran: STATUS_ANGGARAN_LABELS,
//   peminjaman: STATUS_PEMINJAMAN_LABELS,
//   maintenance: STATUS_MAINTENANCE_LABELS,
//   prioritas: PRIORITAS_LABELS,
// };

// export function StatusBadge({ type, value, className }: StatusBadgeProps) {
//   const label = statusLabels[type][value] || value;
//   const variant = statusVariants[type][value] || "bg-gray-100 text-gray-800";

//   return (
//     <Badge
//       className={cn(variant, "font-medium", className)}
//       variant="secondary"
//     >
//       {label}
//     </Badge>
//   );
// }

//  ========== V2 =============

// components/shared/status-badge.tsx

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  ASSET_STATUS_LABELS,
  CONDITION_LABELS,
  REQUEST_STATUS_LABELS,
  BUDGET_STATUS_LABELS,
  LOAN_STATUS_LABELS,
  MAINTENANCE_STATUS_LABELS,
  PRIORITAS_LABELS,
} from "@/lib/constants";

type StatusType =
  | "asset"
  | "condition"
  | "request"
  | "budget"
  | "loan"
  | "maintenance"
  | "prioritas";

interface StatusBadgeProps {
  type: StatusType;
  value: string;
  className?: string;
}

const statusVariants: Record<StatusType, Record<string, string>> = {
  asset: {
    available: "bg-green-100 text-green-800 hover:bg-green-100",
    borrowed: "bg-blue-100 text-blue-800 hover:bg-blue-100",
    maintenance: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
    damaged: "bg-red-100 text-red-800 hover:bg-red-100",
    lost: "bg-gray-100 text-gray-800 hover:bg-gray-100",
    retired: "bg-slate-100 text-slate-800 hover:bg-slate-100",
  },
  condition: {
    new: "bg-emerald-100 text-emerald-800 hover:bg-emerald-100",
    good: "bg-green-100 text-green-800 hover:bg-green-100",
    minor_damage: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
    major_damage: "bg-orange-100 text-orange-800 hover:bg-orange-100",
    lost: "bg-gray-100 text-gray-800 hover:bg-gray-100",
  },
  request: {
    draft: "bg-gray-100 text-gray-800 hover:bg-gray-100",
    submitted: "bg-blue-100 text-blue-800 hover:bg-blue-100",
    approved: "bg-green-100 text-green-800 hover:bg-green-100",
    rejected: "bg-red-100 text-red-800 hover:bg-red-100",
    cancelled: "bg-slate-100 text-slate-800 hover:bg-slate-100",
  },
  budget: {
    draft: "bg-gray-100 text-gray-800 hover:bg-gray-100",
    submitted: "bg-blue-100 text-blue-800 hover:bg-blue-100",
    approved: "bg-green-100 text-green-800 hover:bg-green-100",
    rejected: "bg-red-100 text-red-800 hover:bg-red-100",
    realized: "bg-teal-100 text-teal-800 hover:bg-teal-100",
  },
  loan: {
    pending: "bg-gray-100 text-gray-800 hover:bg-gray-100",
    approved: "bg-green-100 text-green-800 hover:bg-green-100",
    issued: "bg-blue-100 text-blue-800 hover:bg-blue-100",
    returned: "bg-teal-100 text-teal-800 hover:bg-teal-100",
    overdue: "bg-red-100 text-red-800 hover:bg-red-100",
    rejected: "bg-slate-100 text-slate-800 hover:bg-slate-100",
  },
  maintenance: {
    reported: "bg-blue-100 text-blue-800 hover:bg-blue-100",
    in_progress: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
    completed: "bg-green-100 text-green-800 hover:bg-green-100",
    cancelled: "bg-gray-100 text-gray-800 hover:bg-gray-100",
  },
  prioritas: {
    rendah: "bg-gray-100 text-gray-800 hover:bg-gray-100",
    sedang: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
    tinggi: "bg-red-100 text-red-800 hover:bg-red-100",
  },
};

const statusLabels: Record<StatusType, Record<string, string>> = {
  asset: ASSET_STATUS_LABELS,
  condition: CONDITION_LABELS,
  request: REQUEST_STATUS_LABELS,
  budget: BUDGET_STATUS_LABELS,
  loan: LOAN_STATUS_LABELS,
  maintenance: MAINTENANCE_STATUS_LABELS,
  prioritas: PRIORITAS_LABELS,
};

export function StatusBadge({ type, value, className }: StatusBadgeProps) {
  const label = statusLabels[type][value] || value;
  const variant = statusVariants[type][value] || "bg-gray-100 text-gray-800";

  return (
    <Badge
      className={cn(variant, "font-medium", className)}
      variant="secondary"
    >
      {label}
    </Badge>
  );
}
