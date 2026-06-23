import { useAuthStore } from "@/features/auth";

export function useCurrentUser() {
  return useAuthStore(
    (state) => state.user
  );
}