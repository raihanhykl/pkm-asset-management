// app/(dashboard)/master/vendor/page.tsx
"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Plus, FileDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/shared/data-table";
import { PageHeader } from "@/components/shared/page-header";
import { DataTableActions } from "@/components/shared/data-table-action";
import { EmptyState } from "@/components/shared/empty-state";
import { Vendor } from "@/types";
import { dummyVendors } from "@/lib/dummy-data";
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

export default function VendorListPage() {
  const [vendors, setVendors] = useState<Vendor[]>(dummyVendors);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingVendor, setEditingVendor] = useState<Vendor | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    contact_person: "",
    phone: "",
    email: "",
    address: "",
  });

  const columns: ColumnDef<Vendor>[] = [
    {
      accessorKey: "name",
      header: "Nama Vendor",
    },
    {
      accessorKey: "contact_person",
      header: "Contact Person",
      cell: ({ row }) => row.original.contact_person || "-",
    },
    {
      accessorKey: "phone",
      header: "Telepon",
      cell: ({ row }) => row.original.phone || "-",
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => row.original.email || "-",
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

  const handleEdit = (vendor: Vendor) => {
    setEditingVendor(vendor);
    setFormData({
      name: vendor.name,
      contact_person: vendor.contact_person || "",
      phone: vendor.phone || "",
      email: vendor.email || "",
      address: vendor.address || "",
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setVendors(vendors.filter((v) => v.id !== id));
    toast("Berhasil", {
      description: "Vendor berhasil dihapus",
    });
  };

  const handleSubmit = () => {
    if (!formData.name) {
      toast.error("Gagal", {
        description: "Nama vendor wajib diisi",
      });
      return;
    }

    if (editingVendor) {
      setVendors(
        vendors.map((v) =>
          v.id === editingVendor.id ? { ...v, ...formData } : v
        )
      );
      toast("Berhasil", {
        description: "Vendor berhasil diperbarui",
      });
    } else {
      const newVendor: Vendor = {
        id: Math.max(...vendors.map((v) => v.id)) + 1,
        ...formData,
        created_at: new Date().toISOString(),
      };
      setVendors([...vendors, newVendor]);
      toast("Berhasil", {
        description: "Vendor berhasil ditambahkan",
      });
    }

    setIsDialogOpen(false);
    setEditingVendor(null);
    setFormData({
      name: "",
      contact_person: "",
      phone: "",
      email: "",
      address: "",
    });
  };

  const openCreateDialog = () => {
    setEditingVendor(null);
    setFormData({
      name: "",
      contact_person: "",
      phone: "",
      email: "",
      address: "",
    });
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Vendor" description="Kelola data vendor/supplier">
        <Button variant="outline" size="sm">
          <FileDown className="mr-2 h-4 w-4" />
          Export
        </Button>
        <Button onClick={openCreateDialog}>
          <Plus className="mr-2 h-4 w-4" />
          Tambah Vendor
        </Button>
      </PageHeader>

      {vendors.length > 0 ? (
        <DataTable
          columns={columns}
          data={vendors}
          searchKey="name"
          searchPlaceholder="Cari vendor..."
        />
      ) : (
        <EmptyState
          icon={Plus}
          title="Belum ada vendor"
          description="Mulai tambahkan vendor pertama"
          actionLabel="Tambah Vendor"
          onAction={openCreateDialog}
        />
      )}

      {/* Dialog Form */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingVendor ? "Edit Vendor" : "Tambah Vendor"}
            </DialogTitle>
            <DialogDescription>
              Lengkapi form untuk {editingVendor ? "mengubah" : "menambahkan"}{" "}
              vendor
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nama Vendor</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Contoh: PT Maju Bersama"
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="contact_person">Contact Person</Label>
                <Input
                  id="contact_person"
                  value={formData.contact_person}
                  onChange={(e) =>
                    setFormData({ ...formData, contact_person: e.target.value })
                  }
                  placeholder="Nama kontak"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telepon</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="021-12345678"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="email@vendor.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Alamat</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                placeholder="Alamat lengkap vendor"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleSubmit}>
              {editingVendor ? "Simpan Perubahan" : "Tambah"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
