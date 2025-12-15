// /* eslint-disable @typescript-eslint/no-explicit-any */
// // app/(dashboard)/master/aset/_components/aset-form.tsx
// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Loader2 } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Form } from "@/components/ui/form";
// import {
//   TextField,
//   SelectField,
//   TextareaField,
// } from "@/components/shared/form-field-wrapper";
// import { FileUpload } from "@/components/shared/file-upload";
// import { assetSchema, AsetFormData } from "@/lib/schemas/aset.schema";
// import { Aset } from "@/types";
// import { KONDISI_LABELS } from "@/lib/constants";
// import { useKategoriList } from "@/lib/hooks/use-category";

// interface AsetFormProps {
//   initialData?: Aset;
//   onSubmit: (data: FormData) => void;
//   isLoading?: boolean;
// }

// export function AsetForm({ initialData, onSubmit, isLoading }: AsetFormProps) {
//   const router = useRouter();
//   const { data: kategoriList } = useKategoriList();

//   const form = useForm<AsetFormData>({
//     resolver: zodResolver(asetSchema),
//     defaultValues: {
//       nama: "",
//       kategori_id: "",
//       deskripsi: "",
//       lokasi: "",
//       kondisi: "baik",
//       tahun_perolehan: new Date().getFullYear(),
//       harga_perolehan: 0,
//       foto: null,
//     },
//   });

//   useEffect(() => {
//     if (initialData) {
//       form.reset({
//         nama: initialData.nama,
//         kategori_id: initialData.kategori_id,
//         deskripsi: initialData.deskripsi || "",
//         lokasi: initialData.lokasi,
//         kondisi: initialData.kondisi,
//         tahun_perolehan: initialData.tahun_perolehan,
//         harga_perolehan: initialData.harga_perolehan,
//         foto: null,
//       });
//     }
//   }, [initialData, form]);

//   const handleSubmit = (data: AsetFormData) => {
//     const formData = new FormData();
//     formData.append("nama", data.nama);
//     formData.append("kategori_id", data.kategori_id);
//     if (data.deskripsi) formData.append("deskripsi", data.deskripsi);
//     formData.append("lokasi", data.lokasi);
//     formData.append("kondisi", data.kondisi);
//     formData.append("tahun_perolehan", data.tahun_perolehan.toString());
//     formData.append("harga_perolehan", data.harga_perolehan.toString());
//     if (data.foto) formData.append("foto", data.foto);

//     onSubmit(formData);
//   };

//   const kategoriOptions =
//     kategoriList?.map((k: any) => ({
//       label: k.nama,
//       value: k.id,
//     })) || [];

//   const kondisiOptions = Object.entries(KONDISI_LABELS).map(
//     ([value, label]) => ({
//       label,
//       value,
//     })
//   );

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
//         <Card>
//           <CardHeader>
//             <CardTitle>Informasi Aset</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <TextField
//               control={form.control}
//               name="nama"
//               label="Nama Aset"
//               placeholder="Contoh: Laptop Dell XPS 15"
//             />

//             <SelectField
//               control={form.control}
//               name="kategori_id"
//               label="Kategori"
//               placeholder="Pilih kategori"
//               options={kategoriOptions}
//             />

//             <TextareaField
//               control={form.control}
//               name="deskripsi"
//               label="Deskripsi"
//               placeholder="Deskripsi detail aset (opsional)"
//               rows={3}
//             />

//             <div className="grid gap-4 md:grid-cols-2">
//               <TextField
//                 control={form.control}
//                 name="lokasi"
//                 label="Lokasi"
//                 placeholder="Contoh: Ruang Lab Komputer"
//               />

//               <SelectField
//                 control={form.control}
//                 name="kondisi"
//                 label="Kondisi"
//                 options={kondisiOptions}
//               />
//             </div>

//             <div className="grid gap-4 md:grid-cols-2">
//               <TextField
//                 control={form.control}
//                 name="tahun_perolehan"
//                 label="Tahun Perolehan"
//                 type="number"
//                 placeholder="2024"
//               />

//               <TextField
//                 control={form.control}
//                 name="harga_perolehan"
//                 label="Harga Perolehan (Rp)"
//                 type="number"
//                 placeholder="10000000"
//               />
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Foto Aset</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <FileUpload
//               value={form.watch("foto") || initialData?.foto}
//               onChange={(file) => form.setValue("foto", file)}
//               accept="image/*"
//               label="Upload foto aset"
//             />
//           </CardContent>
//         </Card>

//         <div className="flex justify-end gap-4">
//           <Button
//             type="button"
//             variant="outline"
//             onClick={() => router.back()}
//             disabled={isLoading}
//           >
//             Batal
//           </Button>
//           <Button type="submit" disabled={isLoading}>
//             {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
//             {initialData ? "Simpan Perubahan" : "Tambah Aset"}
//           </Button>
//         </div>
//       </form>
//     </Form>
//   );
// }

// ========== V2 =============

// app/(dashboard)/master/aset/_components/aset-form.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import {
  TextField,
  SelectField,
  TextareaField,
} from "@/components/shared/form-field-wrapper";
import { FileUpload } from "@/components/shared/file-upload";
import { useAssetCategoriesList } from "@/lib/hooks/use-category";
import { assetSchema, AssetFormData } from "@/lib/schemas/aset.schema";
import { Asset } from "@/types";
import { CONDITION_LABELS } from "@/lib/constants";

interface AsetFormProps {
  initialData?: Asset;
  onSubmit: (data: FormData) => void;
  isLoading?: boolean;
}

export function AsetForm({ initialData, onSubmit, isLoading }: AsetFormProps) {
  const router = useRouter();
  const { data: categoryList } = useAssetCategoriesList();

  const form = useForm<AssetFormData>({
    resolver: zodResolver(assetSchema),
    defaultValues: {
      name: "",
      category_id: undefined,
      vendor_id: undefined,
      purchase_date: undefined,
      purchase_price: undefined,
      condition: "good",
      location_id: undefined,
      serial_number: "",
      notes: "",
      photo: null,
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        name: initialData.name,
        category_id: initialData.category_id,
        vendor_id: initialData.vendor_id || undefined,
        purchase_date: initialData.purchase_date || undefined,
        purchase_price: initialData.purchase_price || undefined,
        condition: initialData.condition,
        location_id: initialData.location_id || undefined,
        serial_number: initialData.serial_number || "",
        notes: initialData.notes || "",
        photo: null,
      });
    }
  }, [initialData, form]);

  const handleSubmit = (data: AssetFormData) => {
    const formData = new FormData();

    formData.append("name", data.name);
    if (data.category_id)
      formData.append("category_id", data.category_id.toString());
    if (data.vendor_id) formData.append("vendor_id", data.vendor_id.toString());
    if (data.purchase_date)
      formData.append("purchase_date", data.purchase_date);
    if (data.purchase_price)
      formData.append("purchase_price", data.purchase_price.toString());
    formData.append("condition", data.condition);
    if (data.location_id)
      formData.append("location_id", data.location_id.toString());
    if (data.serial_number)
      formData.append("serial_number", data.serial_number);
    if (data.notes) formData.append("notes", data.notes);
    if (data.photo) formData.append("photo", data.photo);

    onSubmit(formData);
  };

  const categoryOptions =
    categoryList?.map((c) => ({
      label: c.name,
      value: c.id.toString(),
    })) || [];

  const conditionOptions = Object.entries(CONDITION_LABELS).map(
    ([value, label]) => ({
      label,
      value,
    })
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Informasi Aset</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <TextField
              control={form.control}
              name="name"
              label="Nama Aset"
              placeholder="Contoh: Laptop Dell XPS 15"
            />

            <div className="grid gap-4 md:grid-cols-2">
              <SelectField
                control={form.control}
                name="category_id"
                label="Kategori"
                placeholder="Pilih kategori"
                options={categoryOptions}
              />

              <SelectField
                control={form.control}
                name="condition"
                label="Kondisi"
                options={conditionOptions}
              />
            </div>

            <TextareaField
              control={form.control}
              name="notes"
              label="Catatan"
              placeholder="Catatan atau deskripsi tambahan (opsional)"
              rows={3}
            />

            <div className="grid gap-4 md:grid-cols-2">
              <TextField
                control={form.control}
                name="serial_number"
                label="Nomor Seri"
                placeholder="SN123456789 (opsional)"
              />

              <TextField
                control={form.control}
                name="purchase_date"
                label="Tanggal Pembelian"
                type="date"
                placeholder="2024-01-15"
              />
            </div>

            <TextField
              control={form.control}
              name="purchase_price"
              label="Harga Perolehan (Rp)"
              type="number"
              placeholder="10000000"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Foto Aset</CardTitle>
          </CardHeader>
          <CardContent>
            <FileUpload
              // eslint-disable-next-line react-hooks/incompatible-library
              value={form.watch("photo") || initialData?.photo}
              onChange={(file) => form.setValue("photo", file)}
              accept="image/*"
              label="Upload foto aset"
            />
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isLoading}
          >
            Batal
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {initialData ? "Simpan Perubahan" : "Tambah Aset"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
