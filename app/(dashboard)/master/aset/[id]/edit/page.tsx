// // app/(dashboard)/master/aset/[id]/edit/page.tsx
// "use client";

// import { useRouter } from "next/navigation";
// import { PageHeader } from "@/components/shared/page-header";
// import { LoadingPage } from "@/components/shared/loading-spinner";
// import { AsetForm } from "../../_components/aset-form";
// import { useAset, useUpdateAset } from "@/lib/hooks/use-aset";

// export default function EditAsetPage({ params }: { params: { id: string } }) {
//   const router = useRouter();
//   const { data: aset, isLoading } = useAset(params.id);
//   const updateMutation = useUpdateAset(params.id);

//   const handleSubmit = async (data: FormData) => {
//     updateMutation.mutate(data, {
//       onSuccess: () => {
//         router.push("/master/aset");
//       },
//     });
//   };

//   if (isLoading) {
//     return <LoadingPage text="Memuat data aset..." />;
//   }

//   if (!aset) {
//     return <div>Aset tidak ditemukan</div>;
//   }

//   return (
//     <div className="space-y-6">
//       <PageHeader
//         title="Edit Aset"
//         description="Perbarui informasi aset"
//         showBack
//         backUrl="/master/aset"
//       />

//       <AsetForm
//         initialData={aset}
//         onSubmit={handleSubmit}
//         isLoading={updateMutation.isPending}
//       />
//     </div>
//   );
// }

// ========== V2 =============

// app/(dashboard)/master/aset/[id]/edit/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { LoadingPage } from "@/components/shared/loading-spinner";
import { AsetForm } from "../../_components/aset-form";
import { useAsset, useUpdateAsset } from "@/lib/hooks/use-aset";

export default function EditAsetPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { data: asset, isLoading } = useAsset(params.id);
  const updateMutation = useUpdateAsset(params.id);

  const handleSubmit = async (data: FormData) => {
    updateMutation.mutate(data, {
      onSuccess: () => {
        router.push("/master/aset");
      },
    });
  };

  if (isLoading) {
    return <LoadingPage text="Memuat data aset..." />;
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
      <PageHeader
        title="Edit Aset"
        description="Perbarui informasi aset"
        showBack
        backUrl="/master/aset"
      />

      <AsetForm
        initialData={asset}
        onSubmit={handleSubmit}
        isLoading={updateMutation.isPending}
      />
    </div>
  );
}
