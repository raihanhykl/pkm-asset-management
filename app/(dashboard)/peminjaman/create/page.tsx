/* eslint-disable react-hooks/purity */
// app/(dashboard)/peminjaman/create/page.tsx
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
import { dummyAssets, dummyClassrooms, dummyUsers } from "@/lib/dummy-data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Asset } from "@/types";
import { StatusBadge } from "@/components/shared/status-badge";
import { toast } from "sonner";

interface LoanAsset {
  id: string;
  asset: Asset;
}

export default function CreatePeminjamanPage() {
  const router = useRouter();

  const [borrowerName, setBorrowerName] = useState("");
  const [isBorrowerStudent, setIsBorrowerStudent] = useState(false);
  const [responsibleTeacherId, setResponsibleTeacherId] = useState("");
  const [classroomId, setClassroomId] = useState("");
  const [expectedReturnDate, setExpectedReturnDate] = useState("");
  const [purpose, setPurpose] = useState("");
  const [selectedAssets, setSelectedAssets] = useState<LoanAsset[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Filter only available assets
  const availableAssets = dummyAssets.filter((a) => a.status === "available");
  const teachers = dummyUsers.filter((u) => u.role?.name === "guru");

  const addAsset = (asset: Asset) => {
    if (selectedAssets.find((a) => a.asset.id === asset.id)) {
      toast.error("Gagal", {
        description: "Aset sudah ditambahkan",
      });
      return;
    }

    setSelectedAssets([
      ...selectedAssets,
      { id: Date.now().toString(), asset },
    ]);
    setIsDialogOpen(false);
  };

  const removeAsset = (id: string) => {
    setSelectedAssets(selectedAssets.filter((a) => a.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !borrowerName ||
      !responsibleTeacherId ||
      !classroomId ||
      !expectedReturnDate ||
      !purpose
    ) {
      toast.error("Gagal", {
        description: "Semua field wajib diisi",
      });
      return;
    }

    if (selectedAssets.length === 0) {
      toast.error("Gagal", {
        description: "Minimal 1 aset harus dipilih",
      });
      return;
    }

    console.log("Creating loan:", {
      borrowerName,
      isBorrowerStudent,
      responsibleTeacherId,
      classroomId,
      expectedReturnDate,
      purpose,
      assets: selectedAssets,
    });

    toast("Berhasil", {
      description: "Peminjaman berhasil dibuat",
    });

    router.push("/peminjaman");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Buat Peminjaman Aset"
        description="Lengkapi form untuk membuat peminjaman aset"
        showBack
        backUrl="/peminjaman"
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Informasi Peminjam</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="borrower">Nama Peminjam</Label>
              <Input
                id="borrower"
                value={borrowerName}
                onChange={(e) => setBorrowerName(e.target.value)}
                placeholder="Nama lengkap peminjam"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="is_student"
                checked={isBorrowerStudent}
                onCheckedChange={(checked) =>
                  setIsBorrowerStudent(checked as boolean)
                }
              />
              <label
                htmlFor="is_student"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Peminjam adalah siswa
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="teacher">Guru Penanggung Jawab</Label>
                <Select
                  value={responsibleTeacherId}
                  onValueChange={setResponsibleTeacherId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih guru" />
                  </SelectTrigger>
                  <SelectContent>
                    {teachers.map((teacher) => (
                      <SelectItem
                        key={teacher.id}
                        value={teacher.id.toString()}
                      >
                        {teacher.full_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="classroom">Ruang Kelas</Label>
                <Select value={classroomId} onValueChange={setClassroomId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih ruang kelas" />
                  </SelectTrigger>
                  <SelectContent>
                    {dummyClassrooms.map((classroom) => (
                      <SelectItem
                        key={classroom.id}
                        value={classroom.id.toString()}
                      >
                        {classroom.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="return_date">Tanggal Rencana Kembali</Label>
              <Input
                id="return_date"
                type="date"
                value={expectedReturnDate}
                onChange={(e) => setExpectedReturnDate(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="purpose">Keperluan</Label>
              <Textarea
                id="purpose"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                placeholder="Jelaskan keperluan peminjaman"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Daftar Aset ({selectedAssets.length})</CardTitle>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button type="button" size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Pilih Aset
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>Pilih Aset</DialogTitle>
                  <DialogDescription>
                    Pilih aset yang tersedia untuk dipinjam
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-2 max-h-[400px] overflow-y-auto">
                  {availableAssets.map((asset) => (
                    <div
                      key={asset.id}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent cursor-pointer"
                      onClick={() => addAsset(asset)}
                    >
                      <div className="flex-1">
                        <p className="font-medium">{asset.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {asset.asset_code} • {asset.category?.name}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <StatusBadge type="condition" value={asset.condition} />
                        <Button type="button" size="sm">
                          Pilih
                        </Button>
                      </div>
                    </div>
                  ))}
                  {availableAssets.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">
                      Tidak ada aset yang tersedia
                    </p>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedAssets.length > 0 ? (
              selectedAssets.map((item) => (
                <Card key={item.id} className="border-2">
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex-1">
                      <p className="font-medium">{item.asset.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.asset.asset_code} • {item.asset.category?.name} •{" "}
                        {item.asset.location?.name}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <StatusBadge
                        type="condition"
                        value={item.asset.condition}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeAsset(item.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-center text-muted-foreground py-8">
                Belum ada aset dipilih. Klik &quot;Pilih Aset&quot; untuk
                menambahkan.
              </p>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Batal
          </Button>
          <Button type="submit">Buat Peminjaman</Button>
        </div>
      </form>
    </div>
  );
}
