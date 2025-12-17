/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// app/(dashboard)/penerimaan-aset/create/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/use-auth";
import { PackageCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader } from "@/components/shared/page-header";
import { dummyPurchaseOrders, dummyReceipts } from "@/lib/dummy-data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatCurrency } from "@/lib/utils/formatters";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table';
import { CONDITION_LABELS } from "@/lib/constants";
import { toast } from "sonner";

interface ReceiptItem {
  po_item_id: number;
  item_name: string;
  ordered_quantity: number;
  received_quantity: number;
  condition: string;
  notes: string;
}

export default function CreatePenerimaanPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [poId, setPoId] = useState("");
  const [receivedDate, setReceivedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [notes, setNotes] = useState("");
  const [items, setItems] = useState<ReceiptItem[]>([]);

  // Filter POs that haven't been received
  const pendingPOs = dummyPurchaseOrders.filter(
    (po) =>
      po.status === "ordered" && !dummyReceipts.find((r) => r.po_id === po.id)
  );

  const selectedPO = pendingPOs.find((po) => po.id === Number(poId));

  const handlePOChange = (value: string) => {
    setPoId(value);
    const po = pendingPOs.find((p) => p.id === Number(value));

    if (po && po.items) {
      // Initialize receipt items with PO data
      setItems(
        po.items.map((item) => ({
          po_item_id: item.id,
          item_name: item.item_name,
          ordered_quantity: item.quantity,
          received_quantity: item.quantity, // Default to ordered quantity
          condition: "good",
          notes: "",
        }))
      );
    }
  };

  const updateItem = (index: number, field: keyof ReceiptItem, value: any) => {
    setItems(
      items.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!poId || !receivedDate) {
      toast.error("Gagal", {
        description: "Semua field wajib diisi",
      });
      return;
    }

    // Validate received quantities
    const invalidItems = items.filter(
      (item) =>
        item.received_quantity < 0 ||
        item.received_quantity > item.ordered_quantity
    );

    if (invalidItems.length > 0) {
      toast.error("Gagal", {
        description: "Jumlah diterima tidak valid",
      });
      return;
    }

    console.log("Creating receipt:", {
      poId,
      receivedDate,
      notes,
      items,
    });

    // Count total assets to be created
    const totalAssets = items.reduce(
      (sum, item) => sum + item.received_quantity,
      0
    );

    toast("Berhasil", {
      description: `Penerimaan berhasil dicatat. ${totalAssets} aset akan ditambahkan ke inventory.`,
    });

    router.push("/penerimaan-aset");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Terima Barang"
        description="Catat penerimaan barang dan tambahkan ke inventory"
        showBack
        backUrl="/penerimaan-aset"
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Informasi Penerimaan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="po">Purchase Order</Label>
              <Select value={poId} onValueChange={handlePOChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih PO yang akan diterima" />
                </SelectTrigger>
                <SelectContent>
                  {pendingPOs.length === 0 ? (
                    <div className="p-2 text-sm text-muted-foreground">
                      Tidak ada PO yang menunggu penerimaan
                    </div>
                  ) : (
                    pendingPOs.map((po) => (
                      <SelectItem key={po.id} value={po.id.toString()}>
                        {po.po_number} - {po.vendor?.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            {selectedPO && (
              <div className="rounded-lg border bg-muted/50 p-4 space-y-2">
                <p className="text-sm">
                  <span className="font-medium">Vendor:</span>{" "}
                  {selectedPO.vendor?.name}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Tanggal PO:</span>{" "}
                  {selectedPO.po_date}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Total:</span>{" "}
                  {formatCurrency(selectedPO.total_amount)}
                </p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="received_date">Tanggal Penerimaan</Label>
              <Input
                id="received_date"
                type="date"
                value={receivedDate}
                onChange={(e) => setReceivedDate(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Catatan</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Catatan penerimaan (opsional)"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {items.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Detail Penerimaan Item</CardTitle>
              <p className="text-sm text-muted-foreground mt-2">
                <PackageCheck className="inline h-4 w-4 mr-1" />
                Item yang diterima akan otomatis ditambahkan ke daftar aset
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {items.map((item, index) => (
                  <Card key={index} className="border-2">
                    <CardContent className="pt-6 space-y-4">
                      <div>
                        <p className="font-medium">{item.item_name}</p>
                      </div>

                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="space-y-2">
                          <Label>Jumlah Dipesan</Label>
                          <Input
                            type="number"
                            value={item.ordered_quantity}
                            disabled
                            className="bg-muted"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Jumlah Diterima *</Label>
                          <Input
                            type="number"
                            min="0"
                            max={item.ordered_quantity}
                            value={item.received_quantity}
                            onChange={(e) =>
                              updateItem(
                                index,
                                "received_quantity",
                                parseInt(e.target.value) || 0
                              )
                            }
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Kondisi</Label>
                          <Select
                            value={item.condition}
                            onValueChange={(value) =>
                              updateItem(index, "condition", value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.entries(CONDITION_LABELS).map(
                                ([value, label]) => (
                                  <SelectItem key={value} value={value}>
                                    {label}
                                  </SelectItem>
                                )
                              )}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Catatan Item</Label>
                        <Input
                          value={item.notes}
                          onChange={(e) =>
                            updateItem(index, "notes", e.target.value)
                          }
                          placeholder="Catatan kondisi atau keterangan lainnya"
                        />
                      </div>

                      {item.received_quantity !== item.ordered_quantity && (
                        <div className="rounded-lg bg-yellow-50 border border-yellow-200 p-3">
                          <p className="text-sm text-yellow-800">
                            ⚠️ Jumlah diterima berbeda dengan pesanan (
                            {item.received_quantity} dari{" "}
                            {item.ordered_quantity})
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}

                <div className="rounded-lg bg-blue-50 border border-blue-200 p-4">
                  <p className="text-sm font-medium text-blue-900">
                    💡 Total{" "}
                    {items.reduce(
                      (sum, item) => sum + item.received_quantity,
                      0
                    )}{" "}
                    unit aset akan ditambahkan ke inventory setelah penerimaan
                    dicatat
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Batal
          </Button>
          <Button type="submit" disabled={!selectedPO || items.length === 0}>
            Catat Penerimaan
          </Button>
        </div>
      </form>
    </div>
  );
}
