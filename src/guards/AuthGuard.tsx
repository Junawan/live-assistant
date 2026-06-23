"use client";

import type { ReactNode } from "react";

interface AuthGuardProps {
  children: ReactNode;
}

export default function AuthGuard({
  children,
}: AuthGuardProps) {
  // Auth sementara dinonaktifkan selama development
  return <>{children}</>;
}