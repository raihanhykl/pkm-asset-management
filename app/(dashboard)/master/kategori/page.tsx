// app/(dashboard)/master/kategori/page.tsx
"use client";

import { useState } from "react";
// import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { Plus, FileDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/shared/data-table";
import { PageHeader } from "@/components/shared/page-header";
import { DataTableActions } from "@/components/shared/data-table-action";
import { EmptyState } from "@/components/shared/empty-state";
import { AssetCategory } from "@/types";
import { dummyCategories } from "@/lib/dummy-data";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function KategoriListPage() {
  //   const router = useRouter();
  const [categories, setCategories] =
    useState<AssetCategory[]>(dummyCategories);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<AssetCategory | null>(
    null
  );
  const [formData, setFormData] = useState({ name: "", description: "" });

  const columns: ColumnDef<AssetCategory>[] = [
    {
      accessorKey: "name",
      header: "Nama Kategori",
    },
    {
      accessorKey: "description",
      header: "Deskripsi",
      cell: ({ row }) => row.original.description || "-",
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DataTableActions
          onEdit={() => handleEdit(row.original)}
          onDelete={() => handleDelete(row.original.id)}
        />
      ),
    },
  ];

  const handleEdit = (category: AssetCategory) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description || "",
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setCategories(categories.filter((c) => c.id !== id));
    toast("Berhasil", {
      description: "Kategori berhasil dihapus",
    });
  };

  const handleSubmit = () => {
    if (!formData.name) {
      toast.error("Gagal", {
        description: "Nama kategori wajib diisi",
      });
      return;
    }

    if (editingCategory) {
      setCategories(
        categories.map((c) =>
          c.id === editingCategory.id ? { ...c, ...formData } : c
        )
      );
      toast("Berhasil", {
        description: "Kategori berhasil diperbarui",
      });
    } else {
      const newCategory: AssetCategory = {
        id: Math.max(...categories.map((c) => c.id)) + 1,
        ...formData,
      };
      setCategories([...categories, newCategory]);
      toast("Berhasil", {
        description: "Kategori berhasil ditambahkan",
      });
    }

    setIsDialogOpen(false);
    setEditingCategory(null);
    setFormData({ name: "", description: "" });
  };

  const openCreateDialog = () => {
    setEditingCategory(null);
    setFormData({ name: "", description: "" });
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Kategori Aset"
        description="Kelola kategori aset organisasi"
      >
        <Button variant="outline" size="sm">
          <FileDown className="mr-2 h-4 w-4" />
          Export
        </Button>
        <Button onClick={openCreateDialog}>
          <Plus className="mr-2 h-4 w-4" />
          Tambah Kategori
        </Button>
      </PageHeader>

      {categories.length > 0 ? (
        <DataTable
          columns={columns}
          data={categories}
          searchKey="name"
          searchPlaceholder="Cari kategori..."
        />
      ) : (
        <EmptyState
          icon={Plus}
          title="Belum ada kategori"
          description="Mulai tambahkan kategori pertama"
          actionLabel="Tambah Kategori"
          onAction={openCreateDialog}
        />
      )}

      {/* Dialog Form */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingCategory ? "Edit Kategori" : "Tambah Kategori"}
            </DialogTitle>
            <DialogDescription>
              Lengkapi form untuk {editingCategory ? "mengubah" : "menambahkan"}{" "}
              kategori
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nama Kategori</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Contoh: Elektronik"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Deskripsi</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Deskripsi kategori (opsional)"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleSubmit}>
              {editingCategory ? "Simpan Perubahan" : "Tambah"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
