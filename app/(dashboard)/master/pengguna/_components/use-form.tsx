/* eslint-disable @typescript-eslint/no-explicit-any */
// app/(dashboard)/master/pengguna/_components/user-form.tsx
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
  CheckboxField,
} from "@/components/shared/form-field-wrapper";
import { useRoles } from "@/lib/hooks/use-user";
import {
  createUserSchema,
  updateUserSchema,
  UserFormData,
} from "@/lib/schemas/user.schema";
import { User } from "@/types";

interface UserFormProps {
  initialData?: User;
  onSubmit: (data: UserFormData) => void;
  isLoading?: boolean;
}

export function UserForm({ initialData, onSubmit, isLoading }: UserFormProps) {
  const router = useRouter();
  const { data: roles } = useRoles();

  const schema = initialData ? updateUserSchema : createUserSchema;

  const form = useForm<UserFormData>({
    resolver: zodResolver(schema as any),
    defaultValues: {
      username: "",
      full_name: "",
      email: "",
      phone: "",
      role_id: undefined,
      password: "",
      is_active: true,
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        username: initialData.username,
        full_name: initialData.full_name,
        email: initialData.email || "",
        phone: initialData.phone || "",
        role_id: initialData.role_id,
        password: "",
        is_active: initialData.is_active,
      });
    }
  }, [initialData, form]);

  const roleOptions =
    roles?.map((r) => ({
      label: r.name,
      value: r.id.toString(),
    })) || [];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Informasi Pengguna</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <TextField
                control={form.control}
                name="username"
                label="Username"
                placeholder="username123"
                disabled={!!initialData}
              />

              <TextField
                control={form.control}
                name="full_name"
                label="Nama Lengkap"
                placeholder="John Doe"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <TextField
                control={form.control}
                name="email"
                label="Email"
                type="email"
                placeholder="email@example.com"
              />

              <TextField
                control={form.control}
                name="phone"
                label="Telepon"
                placeholder="08123456789"
              />
            </div>

            <SelectField
              control={form.control}
              name="role_id"
              label="Role"
              placeholder="Pilih role"
              options={roleOptions}
            />

            <TextField
              control={form.control}
              name="password"
              label={initialData ? "Password Baru" : "Password"}
              type="password"
              placeholder={
                initialData
                  ? "Kosongkan jika tidak ingin mengubah"
                  : "Minimal 6 karakter"
              }
              description={
                initialData
                  ? "Kosongkan jika tidak ingin mengubah password"
                  : undefined
              }
            />

            <CheckboxField
              control={form.control}
              name="is_active"
              label="Status Aktif"
              checkboxLabel="Pengguna aktif dan dapat login"
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
            {initialData ? "Simpan Perubahan" : "Tambah Pengguna"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
