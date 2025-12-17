// app/(dashboard)/order-aset/create/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/use-auth";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader } from "@/components/shared/page-header";

import {
  dummyAssetRequests,
  dummyVendors,
  dummyPurchaseOrders,
} from "@/lib/dummy-data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatCurrency } from "@/lib/utils/formatters";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export default function CreateOrderAsetPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [requestId, setRequestId] = useState("");
  const [vendorId, setVendorId] = useState("");
  const [poDate, setPoDate] = useState(new Date().toISOString().split("T")[0]);
  const [expectedDeliveryDate, setExpectedDeliveryDate] = useState("");
  const [notes, setNotes] = useState("");

  // Filter approved requests (only current user's requests)
  const approvedRequests = dummyAssetRequests.filter(
    (r) =>
      r.status === "approved" &&
      r.requester_id === user?.id &&
      !dummyPurchaseOrders.find((po) => po.request_id === r.id)
  );

  const selectedRequest = approvedRequests.find(
    (r) => r.id === Number(requestId)
  );

  const calculateTotal = () => {
    if (!selectedRequest) return 0;
    return (
      selectedRequest.items?.reduce(
        (sum, item) => sum + (item.estimated_price || 0) * item.quantity,
        0
      ) || 0
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!requestId || !vendorId || !expectedDeliveryDate) {
      toast.error("Gagal", {
        description: "Semua field wajib diisi",
      });
      return;
    }

    console.log("Creating PO:", {
      requestId,
      vendorId,
      poDate,
      expectedDeliveryDate,
      notes,
      total: calculateTotal(),
    });

    toast.success("Berhasil", {
      description: "Purchase Order berhasil dibuat",
    });

    router.push("/order-aset");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Buat Purchase Order"
        description="Buat PO dari permohonan yang disetujui"
        showBack
        backUrl="/order-aset"
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Informasi PO</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="request">Permohonan Asset</Label>
              <Select value={requestId} onValueChange={setRequestId}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih permohonan yang disetujui" />
                </SelectTrigger>
                <SelectContent>
                  {approvedRequests.length === 0 ? (
                    <div className="p-2 text-sm text-muted-foreground">
                      Tidak ada permohonan yang disetujui
                    </div>
                  ) : (
                    approvedRequests.map((request) => (
                      <SelectItem
                        key={request.id}
                        value={request.id.toString()}
                      >
                        {request.request_number} - {request.department}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            {selectedRequest && (
              <div className="rounded-lg border bg-muted/50 p-4 space-y-2">
                <p className="text-sm">
                  <span className="font-medium">Departemen:</span>{" "}
                  {selectedRequest.department}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Tujuan:</span>{" "}
                  {selectedRequest.purpose}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Jumlah Item:</span>{" "}
                  {selectedRequest.items?.length || 0} item
                </p>
              </div>
            )}

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="vendor">Vendor</Label>
                <Select value={vendorId} onValueChange={setVendorId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih vendor" />
                  </SelectTrigger>
                  <SelectContent>
                    {dummyVendors.map((vendor) => (
                      <SelectItem key={vendor.id} value={vendor.id.toString()}>
                        {vendor.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="po_date">Tanggal PO</Label>
                <Input
                  id="po_date"
                  type="date"
                  value={poDate}
                  onChange={(e) => setPoDate(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="delivery_date">
                Tanggal Pengiriman Diharapkan
              </Label>
              <Input
                id="delivery_date"
                type="date"
                value={expectedDeliveryDate}
                onChange={(e) => setExpectedDeliveryDate(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Catatan</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Catatan tambahan (opsional)"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {selectedRequest && (
          <Card>
            <CardHeader>
              <CardTitle>Detail Item</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama Item</TableHead>
                    <TableHead>Spesifikasi</TableHead>
                    <TableHead className="text-right">Qty</TableHead>
                    <TableHead className="text-right">Harga Estimasi</TableHead>
                    <TableHead className="text-right">Subtotal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedRequest.items?.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">
                        {item.item_name}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {item.specification || "-"}
                      </TableCell>
                      <TableCell className="text-right">
                        {item.quantity}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(item.estimated_price || 0)}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {formatCurrency(
                          (item.estimated_price || 0) * item.quantity
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <Separator className="my-4" />

              <div className="flex justify-between items-center">
                <span className="font-semibold text-lg">Total PO:</span>
                <span className="text-2xl font-bold text-primary">
                  {formatCurrency(calculateTotal())}
                </span>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Batal
          </Button>
          <Button type="submit" disabled={!selectedRequest}>
            Buat Purchase Order
          </Button>
        </div>
      </form>
    </div>
  );
}
