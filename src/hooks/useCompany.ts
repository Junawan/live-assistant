"use client";

import { useCompanyStore } from "@/stores/company.store";

export function useCompany() {
  const company = useCompanyStore(
    (state) => state.company
  );

  const loading = useCompanyStore(
    (state) => state.loading
  );

  const isReady = !!company;

  return {
    company,
    loading,
    isReady,
  };
}