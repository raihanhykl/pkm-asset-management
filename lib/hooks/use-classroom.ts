/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/hooks/use-classroom.ts

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/api/client";
import { API_ENDPOINTS } from "../api/endpoints";
import {
  Classroom,
  ApiResponse,
  PaginatedResponse,
  TableFilter,
} from "@/types";
import { toast } from "sonner";

const QUERY_KEY = "classrooms";

// Get all classrooms (for dropdown)
export function useClassroomsList() {
  return useQuery({
    queryKey: [QUERY_KEY, "list"],
    queryFn: async () => {
      //   const response = await apiClient.get<PaginatedResponse<Classroom>>(
      const response = await apiClient.get<PaginatedResponse<Classroom>>(
        API_ENDPOINTS.CLASSROOMS.LIST,
        { params: { per_page: 1000 } }
      );
      return response.data.data;
    },
  });
}

// Get paginated classrooms
export function useClassrooms(filters?: TableFilter) {
  return useQuery({
    queryKey: [QUERY_KEY, filters],
    queryFn: async () => {
      const response = await apiClient.get<PaginatedResponse<Classroom>>(
        API_ENDPOINTS.CLASSROOMS.LIST,
        { params: filters }
      );
      return response.data;
    },
  });
}

// Get single classroom
export function useClassroom(id: number | string) {
  return useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<Classroom>>(
        API_ENDPOINTS.CLASSROOMS.DETAIL(Number(id))
      );
      return response.data.data;
    },
    enabled: !!id,
  });
}

// Create classroom
export function useCreateClassroom() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<Classroom>) => {
      const response = await apiClient.post<ApiResponse<Classroom>>(
        API_ENDPOINTS.CLASSROOMS.CREATE,
        data
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      toast("Berhasil", {
        description: "Ruang kelas berhasil ditambahkan",
      });
    },
    onError: (error: any) => {
      toast.error("Gagal", {
        description: error.response?.data?.message || "Terjadi kesalahan",
      });
    },
  });
}

// Update classroom
export function useUpdateClassroom(id: number | string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<Classroom>) => {
      const response = await apiClient.put<ApiResponse<Classroom>>(
        API_ENDPOINTS.CLASSROOMS.UPDATE(Number(id)),
        data
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, id] });
      toast("Berhasil", {
        description: "Ruang kelas berhasil diperbarui",
      });
    },
    onError: (error: any) => {
      toast.error("Gagal", {
        description: error.response?.data?.message || "Terjadi kesalahan",
      });
    },
  });
}

// Delete classroom
export function useDeleteClassroom() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number | string) => {
      const response = await apiClient.delete<ApiResponse>(
        API_ENDPOINTS.CLASSROOMS.DELETE(Number(id))
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      toast("Berhasil", {
        description: "Ruang kelas berhasil dihapus",
      });
    },
    onError: (error: any) => {
      toast.error("Gagal", {
        description: error.response?.data?.message || "Terjadi kesalahan",
      });
    },
  });
}
