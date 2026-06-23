"use client";

import { useState } from "react";

import { deleteProductUseCase } from "@/di";

export function useDeleteProduct() {
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(
    null
  );

  async function remove(
    productId: string
  ): Promise<boolean> {
    try {
      setLoading(true);

      setError(null);

      await deleteProductUseCase.execute(
        productId
      );

      return true;
    } catch (err) {
      console.error(err);

      setError("Gagal menghapus produk.");

      return false;
    } finally {
      setLoading(false);
    }
  }

  return {
    remove,
    loading,
    error,
  };
}