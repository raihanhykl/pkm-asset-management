/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/hooks/use-user.ts

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/api/client";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import {
  User,
  Role,
  ApiResponse,
  PaginatedResponse,
  TableFilter,
} from "@/types";
import { toast } from "sonner";

const QUERY_KEY = "users";
const ROLES_QUERY_KEY = "roles";

// Get all users
export function useUsers(filters?: TableFilter) {
  return useQuery({
    queryKey: [QUERY_KEY, filters],
    queryFn: async () => {
      const response = await apiClient.get<PaginatedResponse<User>>(
        API_ENDPOINTS.USERS.LIST,
        { params: filters }
      );
      return response.data;
    },
  });
}

// Get single user
export function useUser(id: number | string) {
  return useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<User>>(
        API_ENDPOINTS.USERS.DETAIL(Number(id))
      );
      return response.data.data;
    },
    enabled: !!id,
  });
}

// Create user
export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<User>) => {
      const response = await apiClient.post<ApiResponse<User>>(
        API_ENDPOINTS.USERS.CREATE,
        data
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      toast("Berhasil", {
        description: "Pengguna berhasil ditambahkan",
      });
    },
    onError: (error: any) => {
      toast.warning("Gagal", {
        description: error.response?.data?.message || "Terjadi kesalahan",
      });
    },
  });
}

// Update user
export function useUpdateUser(id: number | string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<User>) => {
      const response = await apiClient.put<ApiResponse<User>>(
        API_ENDPOINTS.USERS.UPDATE(Number(id)),
        data
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, id] });
      toast("Berhasil", {
        description: "Pengguna berhasil diperbarui",
      });
    },
    onError: (error: any) => {
      toast.warning("Gagal", {
        description: error.response?.data?.message || "Terjadi kesalahan",
      });
    },
  });
}

// Delete user
export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number | string) => {
      const response = await apiClient.delete<ApiResponse>(
        API_ENDPOINTS.USERS.DELETE(Number(id))
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      toast("Berhasil", {
        description: "Pengguna berhasil dihapus",
      });
    },
    onError: (error: any) => {
      toast.warning("Gagal", {
        description: error.response?.data?.message || "Terjadi kesalahan",
      });
    },
  });
}

// Get all roles (for dropdown)
export function useRoles() {
  return useQuery({
    queryKey: [ROLES_QUERY_KEY],
    queryFn: async () => {
      const response = await apiClient.get<PaginatedResponse<Role>>(
        API_ENDPOINTS.ROLES.LIST
      );
      return response.data.data;
    },
  });
}
