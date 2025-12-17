/* eslint-disable @typescript-eslint/no-explicit-any */
// app/(dashboard)/penerimaan-aset/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { Plus, Eye, PackageCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/shared/data-table";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { formatDate } from "@/lib/utils/formatters";
import { dummyReceipts, dummyPurchaseOrders } from "@/lib/dummy-data";
// import { Badge } from '@/components/ui/badge';

interface Receipt {
  id: number;
  receipt_number: string;
  po: any;
  received_date: string;
  receiver: any;
  created_at: string;
}

export default function PenerimaanAsetPage() {
  const router = useRouter();
  const [receipts] = useState<Receipt[]>(dummyReceipts);

  // Get POs that haven't been received yet
  const pendingPOs = dummyPurchaseOrders.filter(
    (po) => po.status === "ordered" && !receipts.find((r) => r.po === po.id)
  );

  const columns: ColumnDef<Receipt>[] = [
    {
      accessorKey: "receipt_number",
      header: "No. Penerimaan",
    },
    {
      accessorKey: "po.po_number",
      header: "No. PO",
      cell: ({ row }) => row.original.po?.po_number || "-",
    },
    {
      accessorKey: "po.vendor.name",
      header: "Vendor",
      cell: ({ row }) => row.original.po?.vendor?.name || "-",
    },
    {
      accessorKey: "received_date",
      header: "Tanggal Terima",
      cell: ({ row }) => formatDate(row.original.received_date),
    },
    {
      accessorKey: "receiver.full_name",
      header: "Diterima Oleh",
      cell: ({ row }) => row.original.receiver?.full_name || "-",
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <Button
          size="sm"
          variant="outline"
          onClick={() => router.push(`/penerimaan-aset/${row.original.id}`)}
        >
          <Eye className="mr-2 h-4 w-4" />
          Detail
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Penerimaan Asset"
        description="Catat penerimaan barang dari Purchase Order"
      >
        <Button
          onClick={() => router.push("/penerimaan-aset/create")}
          disabled={pendingPOs.length === 0}
        >
          <Plus className="mr-2 h-4 w-4" />
          Terima Barang
        </Button>
      </PageHeader>

      {pendingPOs.length > 0 && (
        <div className="rounded-lg border border-green-200 bg-green-50 p-4">
          <div className="flex items-center gap-2">
            <PackageCheck className="h-5 w-5 text-green-600" />
            <p className="text-sm font-medium text-green-900">
              {pendingPOs.length} PO menunggu penerimaan barang
            </p>
          </div>
        </div>
      )}

      {receipts.length > 0 ? (
        <DataTable
          columns={columns}
          data={receipts}
          searchKey="receipt_number"
          searchPlaceholder="Cari nomor penerimaan..."
        />
      ) : (
        <EmptyState
          icon={PackageCheck}
          title="Belum ada penerimaan"
          description={
            pendingPOs.length > 0
              ? "Klik 'Terima Barang' untuk mencatat penerimaan"
              : "Tidak ada PO yang menunggu penerimaan"
          }
          actionLabel={pendingPOs.length > 0 ? "Terima Barang" : undefined}
          onAction={
            pendingPOs.length > 0
              ? () => router.push("/penerimaan-aset/create")
              : undefined
          }
        />
      )}
    </div>
  );
}
