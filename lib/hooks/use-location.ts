/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/hooks/use-location.ts

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/api/client";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import { Location, ApiResponse, PaginatedResponse, TableFilter } from "@/types";
import { toast } from "sonner";

const QUERY_KEY = "locations";

// Get all locations (for dropdown)
export function useLocationsList() {
  return useQuery({
    queryKey: [QUERY_KEY, "list"],
    queryFn: async () => {
      const response = await apiClient.get<PaginatedResponse<Location>>(
        API_ENDPOINTS.LOCATIONS.LIST,
        { params: { per_page: 1000 } }
      );
      return response.data.data;
    },
  });
}

// Get paginated locations
export function useLocations(filters?: TableFilter) {
  return useQuery({
    queryKey: [QUERY_KEY, filters],
    queryFn: async () => {
      const response = await apiClient.get<PaginatedResponse<Location>>(
        API_ENDPOINTS.LOCATIONS.LIST,
        { params: filters }
      );
      return response.data;
    },
  });
}

// Get single location
export function useLocation(id: number | string) {
  return useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<Location>>(
        API_ENDPOINTS.LOCATIONS.DETAIL(Number(id))
      );
      return response.data.data;
    },
    enabled: !!id,
  });
}

// Create location
export function useCreateLocation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<Location>) => {
      const response = await apiClient.post<ApiResponse<Location>>(
        API_ENDPOINTS.LOCATIONS.CREATE,
        data
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      toast("Berhasil", {
        description: "Lokasi berhasil ditambahkan",
      });
    },
    onError: (error: any) => {
      toast.warning("Gagal", {
        description: error.response?.data?.message || "Terjadi kesalahan",
      });
    },
  });
}

// Update location
export function useUpdateLocation(id: number | string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<Location>) => {
      const response = await apiClient.put<ApiResponse<Location>>(
        API_ENDPOINTS.LOCATIONS.UPDATE(Number(id)),
        data
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, id] });
      toast("Berhasil", {
        description: "Lokasi berhasil diperbarui",
      });
    },
    onError: (error: any) => {
      toast.warning("Gagal", {
        description: error.response?.data?.message || "Terjadi kesalahan",
      });
    },
  });
}

// Delete location
export function useDeleteLocation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number | string) => {
      const response = await apiClient.delete<ApiResponse>(
        API_ENDPOINTS.LOCATIONS.DELETE(Number(id))
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      toast("Berhasil", {
        description: "Lokasi berhasil dihapus",
      });
    },
    onError: (error: any) => {
      toast.warning("Gagal", {
        description: error.response?.data?.message || "Terjadi kesalahan",
      });
    },
  });
}
