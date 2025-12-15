// // app/(dashboard)/master/aset/page.tsx
// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { ColumnDef } from "@tanstack/react-table";
// import { Plus, FileDown } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { DataTable } from "@/components/shared/data-table";
// import { PageHeader } from "@/components/shared/page-header";
// import { StatusBadge } from "@/components/shared/status-badge";
// import { DataTableActions } from "@/components/shared/data-table-action";
// import { LoadingPage } from "@/components/shared/loading-spinner";
// import { EmptyState } from "@/components/shared/empty-state";
// import { useAsets, useDeleteAset } from "@/lib/hooks/use-aset";
// import { Aset } from "@/types";
// import { formatCurrency } from "@/lib/utils/formatters";

// export default function AsetListPage() {
//   const router = useRouter();
//   const [filters, setFilters] = useState({
//     page: 1,
//     per_page: 10,
//   });

//   const { data, isLoading } = useAsets(filters);
//   const deleteMutation = useDeleteAset();

//   const columns: ColumnDef<Aset>[] = [
//     {
//       accessorKey: "kode_aset",
//       header: "Kode Aset",
//     },
//     {
//       accessorKey: "nama",
//       header: "Nama Aset",
//     },
//     {
//       accessorKey: "kategori.nama",
//       header: "Kategori",
//       cell: ({ row }) => row.original.kategori?.nama || "-",
//     },
//     {
//       accessorKey: "lokasi",
//       header: "Lokasi",
//     },
//     {
//       accessorKey: "kondisi",
//       header: "Kondisi",
//       cell: ({ row }) => (
//         <StatusBadge type="kondisi" value={row.original.kondisi} />
//       ),
//     },
//     {
//       accessorKey: "status",
//       header: "Status",
//       cell: ({ row }) => (
//         <StatusBadge type="aset" value={row.original.status} />
//       ),
//     },
//     {
//       accessorKey: "tahun_perolehan",
//       header: "Tahun",
//     },
//     {
//       accessorKey: "harga_perolehan",
//       header: "Harga",
//       cell: ({ row }) => formatCurrency(row.original.harga_perolehan),
//     },
//     {
//       id: "actions",
//       cell: ({ row }) => (
//         <DataTableActions
//           onView={() => router.push(`/master/aset/${row.original.id}`)}
//           onEdit={() => router.push(`/master/aset/${row.original.id}/edit`)}
//           onDelete={() => deleteMutation.mutate(row.original.id)}
//           isDeleting={deleteMutation.isPending}
//         />
//       ),
//     },
//   ];

//   if (isLoading) {
//     return <LoadingPage text="Memuat data aset..." />;
//   }

//   return (
//     <div className="space-y-6">
//       <PageHeader title="Master Aset" description="Kelola data aset organisasi">
//         <Button variant="outline" size="sm">
//           <FileDown className="mr-2 h-4 w-4" />
//           Export
//         </Button>
//         <Button onClick={() => router.push("/master/aset/create")}>
//           <Plus className="mr-2 h-4 w-4" />
//           Tambah Aset
//         </Button>
//       </PageHeader>

//       {data?.data && data.data.length > 0 ? (
//         <DataTable
//           columns={columns}
//           data={data.data}
//           searchKey="nama"
//           searchPlaceholder="Cari nama aset..."
//         />
//       ) : (
//         <EmptyState
//           icon={Plus}
//           title="Belum ada aset"
//           description="Mulai tambahkan aset pertama Anda"
//           actionLabel="Tambah Aset"
//           onAction={() => router.push("/master/aset/create")}
//         />
//       )}
//     </div>
//   );
// }

// ========== V2 =============

// app/(dashboard)/master/aset/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { Plus, FileDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/shared/data-table";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { DataTableActions } from "@/components/shared/data-table-action";
import { LoadingPage } from "@/components/shared/loading-spinner";
import { EmptyState } from "@/components/shared/empty-state";
import { useAssets, useDeleteAsset } from "@/lib/hooks/use-aset";
import { Asset } from "@/types";
import { formatCurrency, formatDate } from "@/lib/utils/formatters";

export default function AsetListPage() {
  const router = useRouter();
  const [filters, setFilters] = useState({
    page: 1,
    per_page: 10,
  });

  const { data, isLoading } = useAssets(filters);
  const deleteMutation = useDeleteAsset();

  const columns: ColumnDef<Asset>[] = [
    {
      accessorKey: "asset_code",
      header: "Kode Aset",
    },
    {
      accessorKey: "name",
      header: "Nama Aset",
    },
    {
      accessorKey: "category.name",
      header: "Kategori",
      cell: ({ row }) => row.original.category?.name || "-",
    },
    {
      accessorKey: "location.name",
      header: "Lokasi",
      cell: ({ row }) => row.original.location?.name || "-",
    },
    {
      accessorKey: "condition",
      header: "Kondisi",
      cell: ({ row }) => (
        <StatusBadge type="condition" value={row.original.condition} />
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <StatusBadge type="asset" value={row.original.status} />
      ),
    },
    {
      accessorKey: "purchase_date",
      header: "Tanggal Beli",
      cell: ({ row }) =>
        row.original.purchase_date
          ? formatDate(row.original.purchase_date)
          : "-",
    },
    {
      accessorKey: "purchase_price",
      header: "Harga",
      cell: ({ row }) =>
        row.original.purchase_price
          ? formatCurrency(row.original.purchase_price)
          : "-",
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DataTableActions
          onView={() => router.push(`/master/aset/${row.original.id}`)}
          onEdit={() => router.push(`/master/aset/${row.original.id}/edit`)}
          onDelete={() => deleteMutation.mutate(row.original.id)}
          isDeleting={deleteMutation.isPending}
        />
      ),
    },
  ];

  if (isLoading) {
    return <LoadingPage text="Memuat data aset..." />;
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Master Aset" description="Kelola data aset organisasi">
        <Button variant="outline" size="sm">
          <FileDown className="mr-2 h-4 w-4" />
          Export
        </Button>
        <Button onClick={() => router.push("/master/aset/create")}>
          <Plus className="mr-2 h-4 w-4" />
          Tambah Aset
        </Button>
      </PageHeader>

      {data?.data && data.data.length > 0 ? (
        <DataTable
          columns={columns}
          data={data.data}
          searchKey="name"
          searchPlaceholder="Cari nama aset..."
        />
      ) : (
        <EmptyState
          icon={Plus}
          title="Belum ada aset"
          description="Mulai tambahkan aset pertama Anda"
          actionLabel="Tambah Aset"
          onAction={() => router.push("/master/aset/create")}
        />
      )}
    </div>
  );
}
