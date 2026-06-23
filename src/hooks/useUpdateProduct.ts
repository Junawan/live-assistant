"use client";

import { useState } from "react";

import { updateProductUseCase } from "@/di";

interface UpdateProductForm {
  productId: string;

  categoryId?: string;

  title: string;

  image: string;

  productInfo: string;

  notes: string;

  teleprompterText: string;

  active: boolean;
}

export function useUpdateProduct() {
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(
    null
  );

  async function update(
    data: UpdateProductForm
  ): Promise<boolean> {
    try {
      setLoading(true);

      setError(null);

      await updateProductUseCase.execute({
  productId: data.productId,

  categoryId: data.categoryId,

  title: data.title,

  image: data.image,

  productInfo: data.productInfo,

  notes: data.notes,

  teleprompterText: data.teleprompterText,

  active: data.active,
});

      return true;
    } catch (err) {
      console.error(err);

      setError("Gagal memperbarui produk.");

      return false;
    } finally {
      setLoading(false);
    }
  }

  return {
    update,
    loading,
    error,
  };
}