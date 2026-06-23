"use client";

import { useState } from "react";
import { FirebaseError } from "firebase/app";

import { registerUseCase } from "@/di";

export interface RegisterForm {
  companyName: string;
  fullName: string;
  email: string;
  password: string;
}

export function useRegister() {
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  async function register(data: RegisterForm) {
    try {
      setLoading(true);
      setError(null);

      await registerUseCase.execute(data);

      return true;
    } catch (err) {
      if (err instanceof FirebaseError) {
        switch (err.code) {
          case "auth/email-already-in-use":
            setError("Email sudah digunakan.");
            break;

          case "auth/invalid-email":
            setError("Format email tidak valid.");
            break;

          case "auth/weak-password":
            setError("Password minimal 6 karakter.");
            break;

          default:
            setError(err.message);
        }
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
    register,
    loading,
    error,
  };
}