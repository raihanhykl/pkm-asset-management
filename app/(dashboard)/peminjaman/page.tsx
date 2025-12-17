// app/(dashboard)/peminjaman/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { Plus, FileDown, Eye, CheckCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/shared/data-table";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { EmptyState } from "@/components/shared/empty-state";
import { AssetLoan } from "@/types";
import { formatDate } from "@/lib/utils/formatters";
import { dummyAssetLoans } from "@/lib/dummy-data";
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

export default function PeminjamanPage() {
  const router = useRouter();
  const [loans, setLoans] = useState<AssetLoan[]>(dummyAssetLoans);

  const handleReturn = (id: number) => {
    setLoans(
      loans.map((l) =>
        l.id === id
          ? {
              ...l,
              status: "returned",
              actual_return_date: new Date().toISOString().split("T")[0],
              returned_at: new Date().toISOString(),
            }
          : l
      )
    );
    toast("Berhasil", {
      description: "Aset berhasil dikembalikan",
    });
  };

  const getBorrowerName = (loan: AssetLoan) => {
    if (loan.borrower_name) return loan.borrower_name;
    if (loan.borrower) return loan.borrower.full_name;
    return "-";
  };

  const columns: ColumnDef<AssetLoan>[] = [
    {
      accessorKey: "loan_number",
      header: "No. Peminjaman",
    },
    {
      id: "borrower",
      header: "Peminjam",
      cell: ({ row }) => (
        <div>
          <p className="font-medium">{getBorrowerName(row.original)}</p>
          {row.original.borrower_is_student && (
            <Badge variant="secondary" className="mt-1">
              Siswa
            </Badge>
          )}
        </div>
      ),
    },
    {
      accessorKey: "classroom.name",
      header: "Ruang Kelas",
      cell: ({ row }) => row.original.classroom?.name || "-",
    },
    {
      accessorKey: "items",
      header: "Jumlah Aset",
      cell: ({ row }) => (
        <Badge variant="secondary">
          {row.original.items?.length || 0} aset
        </Badge>
      ),
    },
    {
      accessorKey: "expected_return_date",
      header: "Tgl Kembali",
      cell: ({ row }) => formatDate(row.original.expected_return_date || ""),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <StatusBadge type="loan" value={row.original.status} />
      ),
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
              onClick={() => router.push(`/peminjaman/${row.original.id}`)}
            >
              <Eye className="mr-2 h-4 w-4" />
              Lihat Detail
            </DropdownMenuItem>
            {row.original.status === "issued" && (
              <DropdownMenuItem onClick={() => handleReturn(row.original.id)}>
                <CheckCircle className="mr-2 h-4 w-4" />
                Kembalikan
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Peminjaman Aset"
        description="Kelola peminjaman dan pengembalian aset"
      >
        <Button variant="outline" size="sm">
          <FileDown className="mr-2 h-4 w-4" />
          Export
        </Button>
        <Button onClick={() => router.push("/peminjaman/create")}>
          <Plus className="mr-2 h-4 w-4" />
          Buat Peminjaman
        </Button>
      </PageHeader>

      {loans.length > 0 ? (
        <DataTable
          columns={columns}
          data={loans}
          searchKey="loan_number"
          searchPlaceholder="Cari nomor peminjaman..."
        />
      ) : (
        <EmptyState
          icon={Plus}
          title="Belum ada peminjaman"
          description="Mulai buat peminjaman aset"
          actionLabel="Buat Peminjaman"
          onAction={() => router.push("/peminjaman/create")}
        />
      )}
    </div>
  );
}
