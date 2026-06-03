/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/hooks/use-asset-request.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/api/client";
import { toast } from "sonner";

const QUERY_KEY = "asset-requests";

interface CreateAssetRequestData {
  department: string;
  purpose: string;
  items: {
    item_name: string;
    specification: string;
    quantity: number;
    estimated_price: number;
  }[];
}

// Create asset request
export function useCreateAssetRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateAssetRequestData) => {
      const response = await apiClient.post("/asset-requests", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      toast.success("Berhasil", {
        description: "Permohonan aset berhasil dibuat",
      });
    },
    onError: (error: any) => {
      toast.error("Gagal", {
        description: error.response?.data?.message || "Terjadi kesalahan saat membuat permohonan",
      });
    },
  });
}
