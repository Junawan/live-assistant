"use client";

import { useEffect, useState } from "react";

import { getDashboardStatsUseCase } from "@/di";
import { useCompanyStore } from "@/stores/company.store";

import type { DashboardStats } from "@/use-cases/dashboard/GetDashboardStatsUseCase";

export function useDashboardStats() {

  const company = useCompanyStore(
    (state) => state.company
  );

  const [stats, setStats] =
    useState<DashboardStats>({
      totalProducts: 0,
      totalCategories: 0,
      totalPlaylists: 0,
    });

  const [loading, setLoading] =
    useState(true);

  async function load() {
    if (!company) return;

    setLoading(true);

    try {
      const data =
        await getDashboardStatsUseCase.execute(
          company.companyId
        );

      setStats(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [company]);

  return {
    stats,
    loading,
    refresh: load,
  };
}