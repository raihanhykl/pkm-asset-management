/* eslint-disable @typescript-eslint/no-explicit-any */
// app/(dashboard)/order-aset/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
// import { ColumnDef } from '@antml/react-table';
import { Plus, Eye, ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/shared/data-table";
import { PageHeader } from "@/components/shared/page-header";
// import { StatusBadge } from '@/components/shared/status-badge';
import { EmptyState } from "@/components/shared/empty-state";
import { formatDate, formatCurrency } from "@/lib/utils/formatters";
import { dummyPurchaseOrders, dummyAssetRequests } from "@/lib/dummy-data";
import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";

interface PurchaseOrder {
  id: number;
  po_number: string;
  request_id: number;
  request: any;
  vendor: any;
  po_date: string;
  status: string;
  total_amount: number;
  created_at: string;
}

export default function OrderAsetPage() {
  const router = useRouter();
  const [purchaseOrders] = useState<PurchaseOrder[]>(dummyPurchaseOrders);

  // Get approved requests that don't have PO yet
  const approvedRequests = dummyAssetRequests.filter(
    (r) =>
      r.status === "approved" &&
      !purchaseOrders.find((po) => po.request_id === r.id)
  );

  const columns: ColumnDef<PurchaseOrder>[] = [
    {
      accessorKey: "po_number",
      header: "No. PO",
    },
    {
      accessorKey: "request.request_number",
      header: "No. Permohonan",
      cell: ({ row }) => row.original.request?.request_number || "-",
    },
    {
      accessorKey: "vendor.name",
      header: "Vendor",
      cell: ({ row }) => row.original.vendor?.name || "-",
    },
    {
      accessorKey: "po_date",
      header: "Tanggal PO",
      cell: ({ row }) => formatDate(row.original.po_date),
    },
    {
      accessorKey: "total_amount",
      header: "Total",
      cell: ({ row }) => formatCurrency(row.original.total_amount),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const statusMap: Record<string, string> = {
          ordered: "Dipesan",
          received: "Diterima",
          cancelled: "Dibatalkan",
        };
        return (
          <Badge
            variant={
              row.original.status === "received" ? "default" : "secondary"
            }
          >
            {statusMap[row.original.status] || row.original.status}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <Button
          size="sm"
          variant="outline"
          onClick={() => router.push(`/order-aset/${row.original.id}`)}
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
        title="Order Asset (PO)"
        description="Buat Purchase Order dari permohonan yang disetujui"
      >
        <Button
          onClick={() => router.push("/order-aset/create")}
          disabled={approvedRequests.length === 0}
        >
          <Plus className="mr-2 h-4 w-4" />
          Buat PO Baru
        </Button>
      </PageHeader>

      {approvedRequests.length > 0 && (
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-blue-600" />
            <p className="text-sm font-medium text-blue-900">
              {approvedRequests.length} permohonan disetujui menunggu PO
            </p>
          </div>
        </div>
      )}

      {purchaseOrders.length > 0 ? (
        <DataTable
          columns={columns}
          data={purchaseOrders}
          searchKey="po_number"
          searchPlaceholder="Cari nomor PO..."
        />
      ) : (
        <EmptyState
          icon={ShoppingCart}
          title="Belum ada Purchase Order"
          description={
            approvedRequests.length > 0
              ? "Klik 'Buat PO Baru' untuk membuat purchase order"
              : "Tidak ada permohonan yang disetujui"
          }
          actionLabel={approvedRequests.length > 0 ? "Buat PO Baru" : undefined}
          onAction={
            approvedRequests.length > 0
              ? () => router.push("/order-aset/create")
              : undefined
          }
        />
      )}
    </div>
  );
}
