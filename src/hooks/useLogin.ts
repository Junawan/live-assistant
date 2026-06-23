"use client";

import { useState } from "react";

import { loginUseCase } from "@/di";

export function useLogin() {

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  async function login(
    email: string,
    password: string
  ) {

    try {

      setLoading(true);

      setError(null);

      await loginUseCase.execute(
        email,
        password
      );

      return true;

    } catch (err) {

      console.error(err);

      setError(
        "Email atau password salah."
      );

      return false;

    } finally {

      setLoading(false);

    }

  }

  return {

    login,

    loading,

    error,

  };

}