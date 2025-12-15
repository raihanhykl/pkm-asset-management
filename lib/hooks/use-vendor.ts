/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/hooks/use-vendor.ts

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/api/client";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import { Vendor, ApiResponse, PaginatedResponse, TableFilter } from "@/types";
import { toast } from "sonner";

const QUERY_KEY = "vendors";

// Get all vendors (for dropdown)
export function useVendorsList() {
  return useQuery({
    queryKey: [QUERY_KEY, "list"],
    queryFn: async () => {
      const response = await apiClient.get<PaginatedResponse<Vendor>>(
        API_ENDPOINTS.VENDORS.LIST,
        { params: { per_page: 1000 } }
      );
      return response.data.data;
    },
  });
}

// Get paginated vendors
export function useVendors(filters?: TableFilter) {
  return useQuery({
    queryKey: [QUERY_KEY, filters],
    queryFn: async () => {
      const response = await apiClient.get<PaginatedResponse<Vendor>>(
        API_ENDPOINTS.VENDORS.LIST,
        { params: filters }
      );
      return response.data;
    },
  });
}

// Get single vendor
export function useVendor(id: number | string) {
  return useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<Vendor>>(
        API_ENDPOINTS.VENDORS.DETAIL(Number(id))
      );
      return response.data.data;
    },
    enabled: !!id,
  });
}

// Create vendor
export function useCreateVendor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<Vendor>) => {
      const response = await apiClient.post<ApiResponse<Vendor>>(
        API_ENDPOINTS.VENDORS.CREATE,
        data
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      toast("Berhasil", {
        description: "Vendor berhasil ditambahkan",
      });
    },
    onError: (error: any) => {
      toast.warning("Gagal", {
        description: error.response?.data?.message || "Terjadi kesalahan",
      });
    },
  });
}

// Update vendor
export function useUpdateVendor(id: number | string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<Vendor>) => {
      const response = await apiClient.put<ApiResponse<Vendor>>(
        API_ENDPOINTS.VENDORS.UPDATE(Number(id)),
        data
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, id] });
      toast("Berhasil", {
        description: "Vendor berhasil diperbarui",
      });
    },
    onError: (error: any) => {
      toast.warning("Gagal", {
        description: error.response?.data?.message || "Terjadi kesalahan",
      });
    },
  });
}

// Delete vendor
export function useDeleteVendor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number | string) => {
      const response = await apiClient.delete<ApiResponse>(
        API_ENDPOINTS.VENDORS.DELETE(Number(id))
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      toast("Berhasil", {
        description: "Vendor berhasil dihapus",
      });
    },
    onError: (error: any) => {
      toast.warning("Gagal", {
        description: error.response?.data?.message || "Terjadi kesalahan",
      });
    },
  });
}
