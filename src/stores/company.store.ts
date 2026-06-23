import { create } from "zustand";

import type { Company } from "@/types";

interface CompanyState {
  company: Company | null;

  loading: boolean;

  setCompany: (company: Company | null) => void;

  setLoading: (loading: boolean) => void;

  clear: () => void;
}

export const useCompanyStore =
  create<CompanyState>((set) => ({
    company: null,

    loading: true,

    setCompany: (company) =>
      set({
        company,
      }),

    setLoading: (loading) =>
      set({
        loading,
      }),

    clear: () =>
      set({
        company: null,
        loading: false,
      }),
  }));