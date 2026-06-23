"use client";

import { useAuthStore } from "@/stores/auth.store";

export function useAuth() {
  const user = useAuthStore((state) => state.user);

  const loading = useAuthStore(
    (state) => state.loading
  );

  const isAuthenticated = !!user;

  return {
    user,
    loading,
    isAuthenticated,
  };
}