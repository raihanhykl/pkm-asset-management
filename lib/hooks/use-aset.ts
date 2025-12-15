/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// // lib/hooks/use-aset.ts

// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import apiClient from "@/lib/api/client";
// import { API_ENDPOINTS } from "@/lib/api/endpoints";
// import { Aset, ApiResponse, PaginatedResponse, TableFilter } from "@/types";
// import { toast } from "sonner";
// // import { useToast } from '@/components/ui/use-toast';

// const QUERY_KEY = "aset";

// // Get all aset with filters
// export function useAsets(filters?: TableFilter) {
//   return useQuery({
//     queryKey: [QUERY_KEY, filters],
//     queryFn: async () => {
//       const response = await apiClient.get<PaginatedResponse<Aset>>(
//         API_ENDPOINTS.ASET.LIST,
//         { params: filters }
//       );
//       return response.data;
//     },
//   });
// }

// // Get single aset
// export function useAset(id: string) {
//   return useQuery({
//     queryKey: [QUERY_KEY, id],
//     queryFn: async () => {
//       const response = await apiClient.get<ApiResponse<Aset>>(
//         API_ENDPOINTS.ASET.DETAIL(id)
//       );
//       return response.data.data;
//     },
//     enabled: !!id,
//   });
// }

// // Create aset
// export function useCreateAset() {
//   const queryClient = useQueryClient();
//   // const { toast } = useToast();

//   return useMutation({
//     mutationFn: async (data: FormData) => {
//       const response = await apiClient.post<ApiResponse<Aset>>(
//         API_ENDPOINTS.ASET.CREATE,
//         data,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//         }
//       );
//       return response.data;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
//       toast.success("Berhasil", {
//         description: "Aset berhasil ditambahkan",
//       });
//     },
//     onError: (error: any) => {
//       toast.error("Gagal", {
//         // variant: "destructive",
//         // title: "Gagal",
//         description: error.response?.data?.message || "Terjadi kesalahan",
//       });
//     },
//   });
// }

// // Update aset
// export function useUpdateAset(id: string) {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (data: FormData) => {
//       const response = await apiClient.post<ApiResponse<Aset>>(
//         API_ENDPOINTS.ASET.UPDATE(id),
//         data,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//         }
//       );
//       return response.data;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
//       queryClient.invalidateQueries({ queryKey: [QUERY_KEY, id] });
//       toast("Berhasil", {
//         description: "Aset berhasil diperbarui",
//       });
//     },
//     onError: (error: any) => {
//       toast.error("Gagal", {
//         description: error.response?.data?.message || "Terjadi kesalahan",
//       });
//     },
//   });
// }

// // Delete aset
// export function useDeleteAset() {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (id: string) => {
//       const response = await apiClient.delete<ApiResponse>(
//         API_ENDPOINTS.ASET.DELETE(id)
//       );
//       return response.data;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
//       toast.success("Berhasil", {
//         description: "Aset berhasil dihapus",
//       });
//     },
//     onError: (error: any) => {
//       toast("Gagal", {
//         description: error.response?.data?.message || "Terjadi kesalahan",
//       });
//     },
//   });
// }

//  ============= V2 ================

// lib/hooks/use-aset.ts

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/api/client";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import { Asset, ApiResponse, PaginatedResponse, TableFilter } from "@/types";
import { toast } from "sonner";
// import { useToast } from '@/components/ui/use-toast';

const QUERY_KEY = "assets";

// Get all assets with filters
export function useAssets(filters?: TableFilter) {
  return useQuery({
    queryKey: [QUERY_KEY, filters],
    queryFn: async () => {
      const response = await apiClient.get<PaginatedResponse<Asset>>(
        API_ENDPOINTS.ASSETS.LIST,
        { params: filters }
      );
      return response.data;
    },
  });
}

// Get single asset
export function useAsset(id: number | string) {
  return useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<Asset>>(
        API_ENDPOINTS.ASSETS.DETAIL(Number(id))
      );
      return response.data.data;
    },
    enabled: !!id,
  });
}

// Create asset
export function useCreateAsset() {
  const queryClient = useQueryClient();
  // const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: FormData) => {
      const response = await apiClient.post<ApiResponse<Asset>>(
        API_ENDPOINTS.ASSETS.CREATE,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      toast.success("Berhasil", {
        description: "Aset berhasil ditambahkan",
      });
    },
    onError: (error: any) => {
      toast.error("Gagal", {
        description: error.response?.data?.message || "Terjadi kesalahan",
      });
    },
  });
}

// Update asset
export function useUpdateAsset(id: number | string) {
  const queryClient = useQueryClient();
  // const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: FormData) => {
      const response = await apiClient.post<ApiResponse<Asset>>(
        API_ENDPOINTS.ASSETS.UPDATE(Number(id)),
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, id] });
      toast.success("Berhasil", {
        description: "Aset berhasil diperbarui",
      });
    },
    onError: (error: any) => {
      toast.error("Gagal", {
        description: error.response?.data?.message || "Terjadi kesalahan",
      });
    },
  });
}

// Delete asset
export function useDeleteAsset() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number | string) => {
      const response = await apiClient.delete<ApiResponse>(
        API_ENDPOINTS.ASSETS.DELETE(Number(id))
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      toast.success("Berhasil", {
        description: "Aset berhasil dihapus",
      });
    },
    onError: (error: any) => {
      toast.success("Gagal", {
        description: error.response?.data?.message || "Terjadi kesalahan",
      });
    },
  });
}

// Get asset history
export function useAssetHistory(id: number | string) {
  return useQuery({
    queryKey: [QUERY_KEY, id, "history"],
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<any[]>>(
        API_ENDPOINTS.ASSETS.HISTORY(Number(id))
      );
      return response.data.data;
    },
    enabled: !!id,
  });
}
