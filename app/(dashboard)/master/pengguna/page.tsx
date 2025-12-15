// app/(dashboard)/master/pengguna/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { Plus, FileDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/shared/data-table";
import { PageHeader } from "@/components/shared/page-header";
import { DataTableActions } from "@/components/shared/data-table-action";
import { LoadingPage } from "@/components/shared/loading-spinner";
import { EmptyState } from "@/components/shared/empty-state";
import { useUsers, useDeleteUser } from "@/lib/hooks/use-user";
import { useAuth } from "@/lib/hooks/use-auth";
import { User } from "@/types";
import { ROLE_LABELS } from "@/lib/constants";
import { formatDate } from "@/lib/utils/formatters";

export default function UserListPage() {
  const router = useRouter();
  const { user: currentUser } = useAuth();
  const [filters, setFilters] = useState({
    page: 1,
    per_page: 10,
  });

  const { data, isLoading } = useUsers(filters);
  const deleteMutation = useDeleteUser();

  // Check if current user is admin
  const isAdmin = currentUser?.role?.name === "admin";

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "username",
      header: "Username",
    },
    {
      accessorKey: "full_name",
      header: "Nama Lengkap",
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => row.original.email || "-",
    },
    {
      accessorKey: "phone",
      header: "Telepon",
      cell: ({ row }) => row.original.phone || "-",
    },
    {
      accessorKey: "role.name",
      header: "Role",
      cell: ({ row }) => {
        const roleName = row.original.role?.name;
        return roleName ? ROLE_LABELS[roleName] : "-";
      },
    },
    {
      accessorKey: "is_active",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant={row.original.is_active ? "default" : "secondary"}>
          {row.original.is_active ? "Aktif" : "Nonaktif"}
        </Badge>
      ),
    },
    {
      accessorKey: "created_at",
      header: "Dibuat",
      cell: ({ row }) => formatDate(row.original.created_at),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DataTableActions
          onView={() => router.push(`/master/pengguna/${row.original.id}`)}
          onEdit={() => router.push(`/master/pengguna/${row.original.id}/edit`)}
          onDelete={
            isAdmin ? () => deleteMutation.mutate(row.original.id) : undefined
          }
          isDeleting={deleteMutation.isPending}
        />
      ),
    },
  ];

  if (isLoading) {
    return <LoadingPage text="Memuat data pengguna..." />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Master Pengguna"
        description="Kelola data pengguna sistem"
      >
        <Button variant="outline" size="sm">
          <FileDown className="mr-2 h-4 w-4" />
          Export
        </Button>
        {isAdmin && (
          <Button onClick={() => router.push("/master/pengguna/create")}>
            <Plus className="mr-2 h-4 w-4" />
            Tambah Pengguna
          </Button>
        )}
      </PageHeader>

      {data?.data && data.data.length > 0 ? (
        <DataTable
          columns={columns}
          data={data.data}
          searchKey="username"
          searchPlaceholder="Cari username..."
        />
      ) : (
        <EmptyState
          icon={Plus}
          title="Belum ada pengguna"
          description="Mulai tambahkan pengguna pertama"
          actionLabel={isAdmin ? "Tambah Pengguna" : undefined}
          onAction={
            isAdmin ? () => router.push("/master/pengguna/create") : undefined
          }
        />
      )}
    </div>
  );
}
