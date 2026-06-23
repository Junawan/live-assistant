"use client";

import { useEffect, useState } from "react";

import { getProductsUseCase } from "@/di";
import { useCompanyStore } from "@/stores/company.store";

import type { Product } from "@/types";

export function useProducts() {
  const company = useCompanyStore(
  (state) => state.company
);

  const [products, setProducts] = useState<Product[]>([]);

  const [loading, setLoading] = useState(true);

  async function load() {
    if (!company) {
      setProducts([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const data =
        await getProductsUseCase.execute(
          company.companyId
        );

        console.log("PRODUCTS", data);
      setProducts(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [company]);

  return {
  products,
  loading,
  refresh: load,
};
}