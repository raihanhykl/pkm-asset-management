// // app/(dashboard)/master/aset/[id]/page.tsx
// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Pencil, Trash2, QrCode, Download } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // import { Badge } from '@/components/ui/badge';
// import { Separator } from "@/components/ui/separator";
// import { PageHeader } from "@/components/shared/page-header";
// import { StatusBadge } from "@/components/shared/status-badge";
// import { LoadingPage } from "@/components/shared/loading-spinner";
// import { ConfirmDialog } from "@/components/shared/confirm-dialog";
// import { useAset, useDeleteAset } from "@/lib/hooks/use-aset";
// import { formatCurrency, formatDate } from "@/lib/utils/formatters";
// import Image from "next/image";

// export default function AsetDetailPage({ params }: { params: { id: string } }) {
//   const router = useRouter();
//   const { data: aset, isLoading } = useAset(params.id);
//   const deleteMutation = useDeleteAset();
//   const [showDeleteDialog, setShowDeleteDialog] = useState(false);

//   const handleDelete = () => {
//     deleteMutation.mutate(params.id, {
//       onSuccess: () => {
//         router.push("/master/aset");
//       },
//     });
//   };

//   if (isLoading) {
//     return <LoadingPage text="Memuat detail aset..." />;
//   }

//   if (!aset) {
//     return (
//       <div className="flex min-h-[400px] items-center justify-center">
//         <p className="text-muted-foreground">Aset tidak ditemukan</p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <PageHeader title="Detail Aset" showBack backUrl="/master/aset">
//         <Button variant="outline" size="sm">
//           <QrCode className="mr-2 h-4 w-4" />
//           QR Code
//         </Button>
//         <Button
//           variant="outline"
//           size="sm"
//           onClick={() => router.push(`/master/aset/${params.id}/edit`)}
//         >
//           <Pencil className="mr-2 h-4 w-4" />
//           Edit
//         </Button>
//         <Button
//           variant="destructive"
//           size="sm"
//           onClick={() => setShowDeleteDialog(true)}
//         >
//           <Trash2 className="mr-2 h-4 w-4" />
//           Hapus
//         </Button>
//       </PageHeader>

//       <div className="grid gap-6 lg:grid-cols-3">
//         {/* Main Info */}
//         <div className="lg:col-span-2 space-y-6">
//           <Card>
//             <CardHeader>
//               <CardTitle>Informasi Umum</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="grid gap-4 md:grid-cols-2">
//                 <div>
//                   <p className="text-sm text-muted-foreground">Kode Aset</p>
//                   <p className="font-medium">{aset.kode_aset}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground">Nama Aset</p>
//                   <p className="font-medium">{aset.nama}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground">Kategori</p>
//                   <p className="font-medium">{aset.kategori?.nama || "-"}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground">Lokasi</p>
//                   <p className="font-medium">{aset.lokasi}</p>
//                 </div>
//               </div>

//               <Separator />

//               <div>
//                 <p className="text-sm text-muted-foreground mb-2">Deskripsi</p>
//                 <p className="text-sm">
//                   {aset.deskripsi || "Tidak ada deskripsi"}
//                 </p>
//               </div>

//               <Separator />

//               <div className="grid gap-4 md:grid-cols-2">
//                 <div>
//                   <p className="text-sm text-muted-foreground">Kondisi</p>
//                   <div className="mt-1">
//                     <StatusBadge type="kondisi" value={aset.kondisi} />
//                   </div>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground">Status</p>
//                   <div className="mt-1">
//                     <StatusBadge type="aset" value={aset.status} />
//                   </div>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground">
//                     Tahun Perolehan
//                   </p>
//                   <p className="font-medium">{aset.tahun_perolehan}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground">
//                     Harga Perolehan
//                   </p>
//                   <p className="font-medium">
//                     {formatCurrency(aset.harga_perolehan)}
//                   </p>
//                 </div>
//               </div>

//               <Separator />

//               <div className="grid gap-4 md:grid-cols-2">
//                 <div>
//                   <p className="text-sm text-muted-foreground">Dibuat</p>
//                   <p className="text-sm">
//                     {formatDate(aset.created_at, "dd MMM yyyy, HH:mm")}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground">
//                     Terakhir Diubah
//                   </p>
//                   <p className="text-sm">
//                     {formatDate(aset.updated_at, "dd MMM yyyy, HH:mm")}
//                   </p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Sidebar */}
//         <div className="space-y-6">
//           {/* Foto */}
//           {aset.foto && (
//             <Card>
//               <CardHeader>
//                 <CardTitle>Foto Aset</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <Image
//                   src={aset.foto}
//                   alt={aset.nama}
//                   className="w-full rounded-lg object-cover"
//                 />
//                 <Button variant="outline" size="sm" className="mt-4 w-full">
//                   <Download className="mr-2 h-4 w-4" />
//                   Download Foto
//                 </Button>
//               </CardContent>
//             </Card>
//           )}

//           {/* QR Code */}
//           {aset.qr_code && (
//             <Card>
//               <CardHeader>
//                 <CardTitle>QR Code</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <Image
//                   src={aset.qr_code}
//                   alt="QR Code"
//                   className="w-full rounded-lg"
//                 />
//                 <Button variant="outline" size="sm" className="mt-4 w-full">
//                   <Download className="mr-2 h-4 w-4" />
//                   Download QR
//                 </Button>
//               </CardContent>
//             </Card>
//           )}
//         </div>
//       </div>

//       <ConfirmDialog
//         open={showDeleteDialog}
//         onOpenChange={setShowDeleteDialog}
//         title="Hapus Aset"
//         description="Apakah Anda yakin ingin menghapus aset ini? Tindakan ini tidak dapat dibatalkan."
//         confirmText="Hapus"
//         onConfirm={handleDelete}
//         variant="destructive"
//         isLoading={deleteMutation.isPending}
//       />
//     </div>
//   );
// }

// ========= V2 =============

// app/(dashboard)/master/aset/[id]/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, History, Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { LoadingPage } from "@/components/shared/loading-spinner";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { useAsset, useDeleteAsset } from "@/lib/hooks/use-aset";
import { formatCurrency, formatDate } from "@/lib/utils/formatters";
import Image from "next/image";

export default function AsetDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { data: asset, isLoading } = useAsset(params.id);
  const deleteMutation = useDeleteAsset();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDelete = () => {
    deleteMutation.mutate(params.id, {
      onSuccess: () => {
        router.push("/master/aset");
      },
    });
  };

  if (isLoading) {
    return <LoadingPage text="Memuat detail aset..." />;
  }

  if (!asset) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-muted-foreground">Aset tidak ditemukan</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Detail Aset" showBack backUrl="/master/aset">
        <Button variant="outline" size="sm">
          <History className="mr-2 h-4 w-4" />
          Riwayat
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push(`/master/aset/${params.id}/edit`)}
        >
          <Pencil className="mr-2 h-4 w-4" />
          Edit
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => setShowDeleteDialog(true)}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Hapus
        </Button>
      </PageHeader>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informasi Umum</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">Kode Aset</p>
                  <p className="font-medium">{asset.asset_code}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Nama Aset</p>
                  <p className="font-medium">{asset.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Kategori</p>
                  <p className="font-medium">{asset.category?.name || "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Lokasi</p>
                  <p className="font-medium">{asset.location?.name || "-"}</p>
                </div>
              </div>

              <Separator />

              <div>
                <p className="text-sm text-muted-foreground mb-2">Catatan</p>
                <p className="text-sm">{asset.notes || "Tidak ada catatan"}</p>
              </div>

              <Separator />

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">Kondisi</p>
                  <div className="mt-1">
                    <StatusBadge type="condition" value={asset.condition} />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <div className="mt-1">
                    <StatusBadge type="asset" value={asset.status} />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Nomor Seri</p>
                  <p className="font-medium">{asset.serial_number || "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Vendor</p>
                  <p className="font-medium">{asset.vendor?.name || "-"}</p>
                </div>
              </div>

              <Separator />

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Tanggal Pembelian
                  </p>
                  <p className="font-medium">
                    {asset.purchase_date
                      ? formatDate(asset.purchase_date)
                      : "-"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Harga Perolehan
                  </p>
                  <p className="font-medium">
                    {asset.purchase_price
                      ? formatCurrency(asset.purchase_price)
                      : "-"}
                  </p>
                </div>
              </div>

              <Separator />

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">Dibuat</p>
                  <p className="text-sm">
                    {formatDate(asset.created_at, "dd MMM yyyy, HH:mm")}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Terakhir Diubah
                  </p>
                  <p className="text-sm">
                    {asset.updated_at
                      ? formatDate(asset.updated_at, "dd MMM yyyy, HH:mm")
                      : "-"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Foto */}
          {asset.photo && (
            <Card>
              <CardHeader>
                <CardTitle>Foto Aset</CardTitle>
              </CardHeader>
              <CardContent>
                <Image
                  src={asset.photo}
                  alt={asset.name}
                  className="w-full rounded-lg object-cover"
                  width={500}
                  height={500}
                />
                <Button variant="outline" size="sm" className="mt-4 w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download Foto
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Quick Info */}
          <Card>
            <CardHeader>
              <CardTitle>Informasi Cepat</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">ID</span>
                <span className="font-medium">#{asset.id}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Purchase Item</span>
                <span className="font-medium">
                  {asset.purchase_item_id ? `#${asset.purchase_item_id}` : "-"}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <ConfirmDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        title="Hapus Aset"
        description="Apakah Anda yakin ingin menghapus aset ini? Tindakan ini tidak dapat dibatalkan."
        confirmText="Hapus"
        onConfirm={handleDelete}
        variant="destructive"
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}
