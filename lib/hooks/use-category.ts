/* eslint-disable @typescript-eslint/no-explicit-any */
// // lib/hooks/use-kategori.ts

// import { useQuery } from "@tanstack/react-query";
// import apiClient from "@/lib/api/client";
// import { API_ENDPOINTS } from "@/lib/api/endpoints";
// import { Kategori, PaginatedResponse } from "@/types";

// const QUERY_KEY = "kategori";

// // Get all kategori (for dropdown)
// export function useKategoriList() {
//   return useQuery({
//     queryKey: [QUERY_KEY, "list"],
//     queryFn: async () => {
//       const response = await apiClient.get<PaginatedResponse<Kategori>>(
//         API_ENDPOINTS.KATEGORI.LIST,
//         { params: { per_page: 1000 } } // Get all for dropdown
//       );
//       return response.data.data;
//     },
//   });
// }

// =============== V2 ===============

// lib/hooks/use-kategori.ts

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/api/client";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import { AssetCategory, ApiResponse, PaginatedResponse } from "@/types";
import { toast } from "sonner";

const QUERY_KEY = "asset-categories";

// Get all categories (for dropdown)
export function useAssetCategoriesList() {
  return useQuery({
    queryKey: [QUERY_KEY, "list"],
    queryFn: async () => {
      const response = await apiClient.get<PaginatedResponse<AssetCategory>>(
        API_ENDPOINTS.ASSET_CATEGORIES.LIST,
        { params: { per_page: 1000 } } // Get all for dropdown
      );
      return response.data.data;
    },
  });
}

// Get paginated categories
export function useAssetCategories(params?: any) {
  return useQuery({
    queryKey: [QUERY_KEY, params],
    queryFn: async () => {
      const response = await apiClient.get<PaginatedResponse<AssetCategory>>(
        API_ENDPOINTS.ASSET_CATEGORIES.LIST,
        { params }
      );
      return response.data;
    },
  });
}

// Get single category
export function useAssetCategory(id: number | string) {
  return useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<AssetCategory>>(
        API_ENDPOINTS.ASSET_CATEGORIES.DETAIL(Number(id))
      );
      return response.data.data;
    },
    enabled: !!id,
  });
}

// Create category
export function useCreateAssetCategory() {
  const queryClient = useQueryClient();
  //   const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: Partial<AssetCategory>) => {
      const response = await apiClient.post<ApiResponse<AssetCategory>>(
        API_ENDPOINTS.ASSET_CATEGORIES.CREATE,
        data
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      toast.success("Berhasil", {
        description: "Kategori berhasil ditambahkan",
      });
    },
    onError: (error: any) => {
      toast.success("Gagal", {
        description: error.response?.data?.message || "Terjadi kesalahan",
      });
    },
  });
}

// Update category
export function useUpdateAssetCategory(id: number | string) {
  const queryClient = useQueryClient();
  //   const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: Partial<AssetCategory>) => {
      const response = await apiClient.put<ApiResponse<AssetCategory>>(
        API_ENDPOINTS.ASSET_CATEGORIES.UPDATE(Number(id)),
        data
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, id] });

      toast.success("Berhasil", {
        description: "Kategori berhasil diperbarui",
      });
    },
    onError: (error: any) => {
      toast.error("Gagal", {
        description: error.response?.data?.message || "Terjadi kesalahan",
      });
    },
  });
}

// Delete category
export function useDeleteAssetCategory() {
  const queryClient = useQueryClient();
  //   const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: number | string) => {
      const response = await apiClient.delete<ApiResponse>(
        API_ENDPOINTS.ASSET_CATEGORIES.DELETE(Number(id))
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      toast.success("Berhasil", {
        description: "Kategori berhasil dihapus",
      });
    },
    onError: (error: any) => {
      toast.error("Gagal", {
        description: error.response?.data?.message || "Terjadi kesalahan",
      });
    },
  });
}
