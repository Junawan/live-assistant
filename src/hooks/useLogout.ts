"use client";

import { useState } from "react";
import { FirebaseError } from "firebase/app";

import { logoutUseCase } from "@/di";

export function useLogout() {
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  async function logout(): Promise<boolean> {
    try {
      setLoading(true);
      setError(null);

      await logoutUseCase.execute();

      return true;
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Terjadi kesalahan.");
      }

      return false;
    } finally {
      setLoading(false);
    }
  }

  return {
    logout,
    loading,
    error,
  };
}