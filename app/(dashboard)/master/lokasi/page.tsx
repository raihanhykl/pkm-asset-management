// app/(dashboard)/master/lokasi/page.tsx
"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Plus, FileDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/shared/data-table";
import { PageHeader } from "@/components/shared/page-header";
import { DataTableActions } from "@/components/shared/data-table-action";
import { EmptyState } from "@/components/shared/empty-state";
import { Location } from "@/types";
import { dummyLocations } from "@/lib/dummy-data";
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

export default function LokasiListPage() {
  const [locations, setLocations] = useState<Location[]>(dummyLocations);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  const [formData, setFormData] = useState({ name: "", description: "" });

  const columns: ColumnDef<Location>[] = [
    {
      accessorKey: "name",
      header: "Nama Lokasi",
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

  const handleEdit = (location: Location) => {
    setEditingLocation(location);
    setFormData({
      name: location.name,
      description: location.description || "",
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setLocations(locations.filter((l) => l.id !== id));
    toast("Berhasil", {
      description: "Lokasi berhasil dihapus",
    });
  };

  const handleSubmit = () => {
    if (!formData.name) {
      toast.error("Gagal", {
        description: "Nama lokasi wajib diisi",
      });
      return;
    }

    if (editingLocation) {
      setLocations(
        locations.map((l) =>
          l.id === editingLocation.id ? { ...l, ...formData } : l
        )
      );
      toast("Berhasil", {
        description: "Lokasi berhasil diperbarui",
      });
    } else {
      const newLocation: Location = {
        id: Math.max(...locations.map((l) => l.id)) + 1,
        ...formData,
      };
      setLocations([...locations, newLocation]);
      toast("Berhasil", {
        description: "Lokasi berhasil ditambahkan",
      });
    }

    setIsDialogOpen(false);
    setEditingLocation(null);
    setFormData({ name: "", description: "" });
  };

  const openCreateDialog = () => {
    setEditingLocation(null);
    setFormData({ name: "", description: "" });
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Lokasi"
        description="Kelola data lokasi penyimpanan aset"
      >
        <Button variant="outline" size="sm">
          <FileDown className="mr-2 h-4 w-4" />
          Export
        </Button>
        <Button onClick={openCreateDialog}>
          <Plus className="mr-2 h-4 w-4" />
          Tambah Lokasi
        </Button>
      </PageHeader>

      {locations.length > 0 ? (
        <DataTable
          columns={columns}
          data={locations}
          searchKey="name"
          searchPlaceholder="Cari lokasi..."
        />
      ) : (
        <EmptyState
          icon={Plus}
          title="Belum ada lokasi"
          description="Mulai tambahkan lokasi pertama"
          actionLabel="Tambah Lokasi"
          onAction={openCreateDialog}
        />
      )}

      {/* Dialog Form */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingLocation ? "Edit Lokasi" : "Tambah Lokasi"}
            </DialogTitle>
            <DialogDescription>
              Lengkapi form untuk {editingLocation ? "mengubah" : "menambahkan"}{" "}
              lokasi
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nama Lokasi</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Contoh: Gedung A Lantai 1"
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
                placeholder="Deskripsi lokasi (opsional)"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleSubmit}>
              {editingLocation ? "Simpan Perubahan" : "Tambah"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
