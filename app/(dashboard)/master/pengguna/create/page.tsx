// app/(dashboard)/master/pengguna/create/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";

import { useCreateUser } from "@/lib/hooks/use-user";
import { UserFormData } from "@/lib/schemas/user.schema";
import { UserForm } from "../_components/use-form";

export default function CreateUserPage() {
  const router = useRouter();
  const createMutation = useCreateUser();

  const handleSubmit = async (data: UserFormData) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        router.push("/master/pengguna");
      },
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Tambah Pengguna Baru"
        description="Lengkapi form untuk menambahkan pengguna"
        showBack
        backUrl="/master/pengguna"
      />

      <UserForm onSubmit={handleSubmit} isLoading={createMutation.isPending} />
    </div>
  );
}
