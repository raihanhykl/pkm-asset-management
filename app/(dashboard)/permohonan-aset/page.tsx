// app/(dashboard)/permohonan-aset/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { Plus, FileDown, Eye, CheckCircle, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/shared/data-table";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { EmptyState } from "@/components/shared/empty-state";
import { AssetRequest } from "@/types";
import { formatDate, formatCurrency } from "@/lib/utils/formatters";
import { dummyAssetRequests } from "@/lib/dummy-data";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";

export default function PermohonanAsetPage() {
  const router = useRouter();
  const [requests, setRequests] = useState<AssetRequest[]>(dummyAssetRequests);

  const handleApprove = (id: number) => {
    setRequests(
      requests.map((r) =>
        r.id === id ? { ...r, status: "approved", review_note: "Disetujui" } : r
      )
    );
    toast("Berhasil", {
      description: "Permohonan berhasil disetujui",
    });
  };

  const handleReject = (id: number) => {
    setRequests(
      requests.map((r) =>
        r.id === id ? { ...r, status: "rejected", review_note: "Ditolak" } : r
      )
    );
    toast("Berhasil", {
      description: "Permohonan ditolak",
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
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <StatusBadge type="request" value={row.original.status} />
      ),
    },
    {
      accessorKey: "created_at",
      header: "Tanggal",
      cell: ({ row }) => formatDate(row.original.created_at),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => router.push(`/permohonan-aset/${row.original.id}`)}
            >
              <Eye className="mr-2 h-4 w-4" />
              Lihat Detail
            </DropdownMenuItem>
            {row.original.status === "submitted" && (
              <>
                <DropdownMenuItem
                  onClick={() => handleApprove(row.original.id)}
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Setujui
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleReject(row.original.id)}
                  className="text-destructive focus:text-destructive"
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  Tolak
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Permohonan Aset"
        description="Kelola permohonan pengadaan aset baru"
      >
        <Button variant="outline" size="sm">
          <FileDown className="mr-2 h-4 w-4" />
          Export
        </Button>
        <Button onClick={() => router.push("/permohonan-aset/create")}>
          <Plus className="mr-2 h-4 w-4" />
          Buat Permohonan
        </Button>
      </PageHeader>

      {requests.length > 0 ? (
        <DataTable
          columns={columns}
          data={requests}
          searchKey="request_number"
          searchPlaceholder="Cari nomor permohonan..."
        />
      ) : (
        <EmptyState
          icon={Plus}
          title="Belum ada permohonan"
          description="Mulai buat permohonan aset baru"
          actionLabel="Buat Permohonan"
          onAction={() => router.push("/permohonan-aset/create")}
        />
      )}
    </div>
  );
}
