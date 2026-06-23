"use client";

import { useEffect, type ReactNode } from "react";
import {
  doc,
  getDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import { useAuthStore } from "@/stores/auth.store";
import { useCompanyStore } from "@/stores/company.store";

import type { User, Company } from "@/types";
import { loadCompanyUseCase } from "@/di";

interface Props {
  children: ReactNode;
}

export default function CompanyProvider({
  children,
}: Props) {
  const user = useAuthStore(
    (state) => state.user
  );

  const setCompany = useCompanyStore(
    (state) => state.setCompany
  );

  const setLoading = useCompanyStore(
    (state) => state.setLoading
  );

  const clear = useCompanyStore(
    (state) => state.clear
  );

  useEffect(() => {
  async function loadCompany() {
    if (!user) {
      clear();
      return;
    }

    try {
      setLoading(true);

      const company = await loadCompanyUseCase.execute(
        user.uid
      );

      if (!company) {
        clear();
        return;
      }

      setCompany(company);
    } catch (error) {
      console.error(error);
      clear();
    } finally {
      setLoading(false);
    }
  }

  loadCompany();
}, [
  user,
  setCompany,
  setLoading,
  clear,
]);

  return <>{children}</>;
}