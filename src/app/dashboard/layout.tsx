"use client";

import type { ReactNode } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";

import AuthGuard from "@/guards/AuthGuard";

interface Props {
  children: ReactNode;
}

export default function DashboardLayout({
  children,
}: Props) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-slate-100">
        <div className="flex">

          {/* Sidebar */}
          <Sidebar />

          {/* Content */}
          <main className="flex-1">

            <Header />

            {/* Page */}
            <div className="p-6">
              {children}
            </div>

          </main>

        </div>
      </div>
    </AuthGuard>
  );
}