/* eslint-disable @typescript-eslint/no-explicit-any */
// app/(dashboard)/permohonan-aset/create/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader } from "@/components/shared/page-header";
import { formatCurrency } from "@/lib/utils/formatters";
import { toast } from "sonner";

interface RequestItem {
  id: string;
  item_name: string;
  specification: string;
  quantity: number;
  estimated_price: number;
}

export default function CreatePermohonanPage() {
  const router = useRouter();

  const [department, setDepartment] = useState("");
  const [purpose, setPurpose] = useState("");
  const [items, setItems] = useState<RequestItem[]>([
    {
      id: "1",
      item_name: "",
      specification: "",
      quantity: 1,
      estimated_price: 0,
    },
  ]);

  const addItem = () => {
    setItems([
      ...items,
      {
        id: Date.now().toString(),
        item_name: "",
        specification: "",
        quantity: 1,
        estimated_price: 0,
      },
    ]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const updateItem = (id: string, field: keyof RequestItem, value: any) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const calculateTotal = () => {
    return items.reduce(
      (sum, item) => sum + item.estimated_price * item.quantity,
      0
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!department || !purpose) {
      toast.error("Gagal", {
        description: "Departemen dan tujuan wajib diisi",
      });
      return;
    }

    if (items.some((item) => !item.item_name)) {
      toast.error("Gagal", {
        description: "Semua item harus diisi",
      });
      return;
    }

    console.log("Creating request:", { department, purpose, items });

    toast("Berhasil", {
      description: "Permohonan berhasil dibuat",
    });

    router.push("/permohonan-aset");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Buat Permohonan Aset"
        description="Lengkapi form untuk membuat permohonan aset baru"
        showBack
        backUrl="/permohonan-aset"
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Informasi Permohonan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="department">Departemen</Label>
              <Input
                id="department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="Contoh: Lab Komputer"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="purpose">Tujuan/Alasan</Label>
              <Textarea
                id="purpose"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                placeholder="Jelaskan tujuan permohonan aset"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Daftar Item</CardTitle>
            <Button type="button" onClick={addItem} size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Tambah Item
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {items.map((item, index) => (
              <Card key={item.id} className="border-2">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <h4 className="font-medium">Item #{index + 1}</h4>
                      {items.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Nama Item</Label>
                      <Input
                        value={item.item_name}
                        onChange={(e) =>
                          updateItem(item.id, "item_name", e.target.value)
                        }
                        placeholder="Contoh: Laptop HP Pavilion"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Spesifikasi</Label>
                      <Textarea
                        value={item.specification}
                        onChange={(e) =>
                          updateItem(item.id, "specification", e.target.value)
                        }
                        placeholder="Spesifikasi detail item"
                        rows={2}
                      />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Jumlah</Label>
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            updateItem(
                              item.id,
                              "quantity",
                              parseInt(e.target.value) || 1
                            )
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Harga Estimasi (per unit)</Label>
                        <Input
                          type="number"
                          min="0"
                          value={item.estimated_price}
                          onChange={(e) =>
                            updateItem(
                              item.id,
                              "estimated_price",
                              parseInt(e.target.value) || 0
                            )
                          }
                          placeholder="0"
                        />
                      </div>
                    </div>

                    <div className="flex justify-between pt-2 border-t">
                      <span className="text-sm text-muted-foreground">
                        Subtotal:
                      </span>
                      <span className="font-medium">
                        {formatCurrency(item.estimated_price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
              <span className="font-semibold">Total Estimasi:</span>
              <span className="text-xl font-bold text-primary">
                {formatCurrency(calculateTotal())}
              </span>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Batal
          </Button>
          <Button type="submit">Buat Permohonan</Button>
        </div>
      </form>
    </div>
  );
}
