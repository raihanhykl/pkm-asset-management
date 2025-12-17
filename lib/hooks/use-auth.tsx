/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/hooks/use-auth.tsx
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import apiClient from "@/lib/api/client";
import { User, LoginCredentials, AuthResponse, ApiResponse } from "@/types";
import { TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/lib/constants";
import { API_ENDPOINTS } from "../api/endpoints";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const checkAuth = useCallback(async () => {
    const token = Cookies.get(TOKEN_KEY);

    if (!token) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      const response = await apiClient.get<ApiResponse<User>>(
        API_ENDPOINTS.AUTH.ME
      );
      setUser(response.data.data);
      console.log("checkAuth success:", response.data.data);
    } catch (error: any) {
      console.error(
        "checkAuth error:",
        error.response?.status,
        error.response?.data
      );

      // Only remove token if it's actually invalid (401 Unauthorized)
      // Don't remove on network errors or other issues
      if (error.response?.status === 401) {
        console.log("Token invalid (401), removing cookies");
        Cookies.remove(TOKEN_KEY);
        Cookies.remove(REFRESH_TOKEN_KEY);
        setUser(null);
      } else {
        console.log("checkAuth failed but keeping token (non-401 error)");
        // Keep the token for network errors or server errors
        // User stays logged in
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);

    try {
      const response = await apiClient.post<ApiResponse<AuthResponse>>(
        "/login",
        credentials
      );

      const { user, token, refresh_token } = response.data.data;
      console.log("ini user: ", user);

      // Save tokens
      Cookies.set(TOKEN_KEY, token, { expires: 7 });
      if (refresh_token) {
        Cookies.set(REFRESH_TOKEN_KEY, refresh_token, { expires: 30 });
      }

      setUser(user);
      router.push("/dashboard");
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = useCallback(() => {
    Cookies.remove(TOKEN_KEY);
    Cookies.remove(REFRESH_TOKEN_KEY);
    setUser(null);
    router.push("/login");
  }, [router]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
