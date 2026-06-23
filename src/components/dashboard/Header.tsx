"use client";

import { LogOut } from "lucide-react";
import { useLogout } from "@/hooks/useLogout";
import { useRouter } from "next/navigation";
import { useCompany } from "@/hooks/useCompany";
import { useAuth } from "@/hooks/useAuth";

import { Button } from "@/components/ui/button";

export default function Header() {
  const { company } = useCompany();

  const { user } = useAuth();

  const router = useRouter();

const {
  logout,
  loading,
} = useLogout();

  async function handleLogout() {
  const success = await logout();

  //if (success) {
    //router.replace("/login");
  //}
}

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">

      <div>
        <h2 className="text-lg font-semibold">
          {company?.name ?? "Live Assistant"}
        </h2>

        <p className="text-sm text-muted-foreground">
          {company?.plan?.toUpperCase()} Plan
        </p>
      </div>

      <div className="flex items-center gap-4">

        <div className="text-right">
          <p className="font-medium">
            {user?.displayName ?? "Owner"}
          </p>

          <p className="text-sm text-muted-foreground">
            {user?.email}
          </p>
        </div>

        <Button
  variant="outline"
  size="icon"
  disabled={loading}
  onClick={handleLogout}
>
  <LogOut className="h-4 w-4" />
</Button>

      </div>

    </header>
  );
}