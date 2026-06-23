"use client";

import { useState } from "react";

import { createProductUseCase } from "@/di";
import { useCompanyStore } from "@/stores/company.store";
import type { ProductFormData } from "@/types";

export function useCreateProduct() {
  const company = useCompanyStore(
  (state) => state.company
);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  async function create(
    data: ProductFormData
  ): Promise<boolean> {
    console.log("COMPANY =", company);
    if (!company) {
      setError("Company tidak ditemukan.");
      return false;
    }
    console.log("COMPANY ID =", company.companyId);

    try {
      setLoading(true);

      setError(null);

      await createProductUseCase.execute({
        companyId: company.companyId,


        title: data.title,

        image: data.image,

        productInfo: data.productInfo,
      });

      return true;
    } catch (err) {
  console.error(err);

  if (err instanceof Error) {
    alert(err.message);
    setError(err.message);
  } else {
    alert(JSON.stringify(err));
  }

  return false;
}
  }

  return {
    create,

    loading,

    error,
  };
}