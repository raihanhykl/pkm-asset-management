// app/(dashboard)/approval-aset/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, CheckCircle, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/shared/data-table";
import { PageHeader } from "@/components/shared/page-header";
// import { StatusBadge } from "@/components/shared/status-badge";
import { EmptyState } from "@/components/shared/empty-state";
import { AssetRequest } from "@/types";
import { formatDate, formatCurrency } from "@/lib/utils/formatters";
import { dummyAssetRequests } from "@/lib/dummy-data";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { MoreHorizontal } from "lucide-react";

export default function ApprovalAsetPage() {
  const router = useRouter();

  // Filter only submitted requests for approval
  const [requests, setRequests] = useState<AssetRequest[]>(
    dummyAssetRequests.filter((r) => r.status === "submitted")
  );

  const handleApprove = (id: number) => {
    setRequests(
      requests
        .map((r) =>
          r.id === id
            ? { ...r, status: "approved" as const, review_note: "Disetujui" }
            : r
        )
        .filter((r) => r.status === "submitted")
    ); // Remove from list after approval

    toast("Berhasil", {
      description: "Permohonan berhasil disetujui",
    });
  };

  const handleReject = (id: number) => {
    setRequests(
      requests
        .map((r) =>
          r.id === id
            ? { ...r, status: "rejected" as const, review_note: "Ditolak" }
            : r
        )
        .filter((r) => r.status === "submitted")
    ); // Remove from list after rejection

    toast("Permohonan Ditolak", {
      description: "Permohonan telah ditolak",
    });
  };

  const calculateTotal = (request: AssetRequest) => {
    return (
      request.items?.reduce(
        (sum, item) => sum + (item.estimated_price || 0) * item.quantity,
        0
      ) || 0
    );
  };

  const columns: ColumnDef<AssetRequest>[] = [
    {
      accessorKey: "request_number",
      header: "No. Permohonan",
    },
    {
      accessorKey: "requester.full_name",
      header: "Pemohon",
      cell: ({ row }) => row.original.requester?.full_name || "-",
    },
    {
      accessorKey: "department",
      header: "Departemen",
      cell: ({ row }) => row.original.department || "-",
    },
    {
      accessorKey: "items",
      header: "Jumlah Item",
      cell: ({ row }) => (
        <Badge variant="secondary">
          {row.original.items?.length || 0} item
        </Badge>
      ),
    },
    {
      id: "total",
      header: "Total Estimasi",
      cell: ({ row }) => formatCurrency(calculateTotal(row.original)),
    },
    {
      accessorKey: "created_at",
      header: "Tanggal",
      cell: ({ row }) => formatDate(row.original.created_at),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => router.push(`/permohonan-aset/${row.original.id}`)}
          >
            <Eye className="mr-2 h-4 w-4" />
            Detail
          </Button>
          <Button size="sm" onClick={() => handleApprove(row.original.id)}>
            <CheckCircle className="mr-2 h-4 w-4" />
            Setujui
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => handleReject(row.original.id)}
          >
            <XCircle className="mr-2 h-4 w-4" />
            Tolak
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Approval Asset"
        description="Review dan approve permohonan aset yang masuk"
      />

      {requests.length > 0 ? (
        <DataTable
          columns={columns}
          data={requests}
          searchKey="request_number"
          searchPlaceholder="Cari nomor permohonan..."
        />
      ) : (
        <EmptyState
          icon={CheckCircle}
          title="Tidak ada permohonan pending"
          description="Semua permohonan sudah diproses"
        />
      )}
    </div>
  );
}
