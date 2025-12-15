// app/(dashboard)/master/aset/create/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { AsetForm } from "../_components/aset-form";
import { useCreateAsset } from "@/lib/hooks/use-aset";

export default function CreateAsetPage() {
  const router = useRouter();
  const createMutation = useCreateAsset();

  const handleSubmit = async (data: FormData) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        router.push("/master/aset");
      },
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Tambah Aset Baru"
        description="Lengkapi form untuk menambahkan aset"
        showBack
        backUrl="/master/aset"
      />

      <AsetForm onSubmit={handleSubmit} isLoading={createMutation.isPending} />
    </div>
  );
}
