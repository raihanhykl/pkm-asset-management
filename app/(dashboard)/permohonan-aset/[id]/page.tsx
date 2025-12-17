// app/(dashboard)/permohonan-aset/[id]/page.tsx
"use client";

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
import { CheckCircle, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
// import { LoadingPage } from '@/components/shared/loading-spinner';
import { formatDate, formatCurrency } from "@/lib/utils/formatters";
import { dummyAssetRequests } from "@/lib/dummy-data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function PermohonanDetailPage({
  params,
}: {
  params: { id: string };
}) {
  //   const router = useRouter();
  const request = dummyAssetRequests.find((r) => r.id === parseInt(params.id));

  if (!request) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-muted-foreground">Permohonan tidak ditemukan</p>
      </div>
    );
  }

  const calculateTotal = () => {
    return (
      request.items?.reduce(
        (sum, item) => sum + (item.estimated_price || 0) * item.quantity,
        0
      ) || 0
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Detail Permohonan Aset"
        showBack
        backUrl="/permohonan-aset"
      >
        {request.status === "submitted" && (
          <>
            <Button variant="outline" size="sm">
              <XCircle className="mr-2 h-4 w-4" />
              Tolak
            </Button>
            <Button size="sm">
              <CheckCircle className="mr-2 h-4 w-4" />
              Setujui
            </Button>
          </>
        )}
      </PageHeader>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informasi Permohonan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">
                    No. Permohonan
                  </p>
                  <p className="font-medium">{request.request_number}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <div className="mt-1">
                    <StatusBadge type="request" value={request.status} />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pemohon</p>
                  <p className="font-medium">
                    {request.requester?.full_name || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Departemen</p>
                  <p className="font-medium">{request.department || "-"}</p>
                </div>
              </div>

              <Separator />

              <div>
                <p className="text-sm text-muted-foreground mb-2">Tujuan</p>
                <p className="text-sm">
                  {request.purpose || "Tidak ada keterangan"}
                </p>
              </div>

              {request.review_note && (
                <>
                  <Separator />
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Catatan Review
                    </p>
                    <p className="text-sm">{request.review_note}</p>
                  </div>
                </>
              )}

              <Separator />

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Tanggal Dibuat
                  </p>
                  <p className="text-sm">
                    {formatDate(request.created_at, "dd MMM yyyy, HH:mm")}
                  </p>
                </div>
                {request.updated_at && (
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Terakhir Diubah
                    </p>
                    <p className="text-sm">
                      {formatDate(request.updated_at, "dd MMM yyyy, HH:mm")}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Daftar Item</CardTitle>
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
                  {request.items?.map((item) => (
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
                <span className="font-semibold">Total Estimasi:</span>
                <span className="text-xl font-bold text-primary">
                  {formatCurrency(calculateTotal())}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informasi Cepat</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">ID</span>
                <span className="font-medium">#{request.id}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Jumlah Item</span>
                <span className="font-medium">
                  {request.items?.length || 0} item
                </span>
              </div>
              <Separator />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Estimasi</span>
                <span className="font-medium">
                  {formatCurrency(calculateTotal())}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
