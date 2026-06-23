"use client";

import { useSessionStore } from "@/stores/session.store";
import { useDashboardStats } from "@/hooks/useDashboardStats";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function DashboardPage() {
  const company = useSessionStore(
    (state) => state.company
  );

  const user = useSessionStore(
    (state) => state.user
  );

  const subscription = useSessionStore(
    (state) => state.subscription
  );

  const { stats } =
    useDashboardStats();

  return (
    <div className="space-y-6">

      {/* Welcome */}

      <Card>

        <CardHeader>

          <CardTitle>
            Selamat Datang 👋
          </CardTitle>

        </CardHeader>

        <CardContent>

          <h2 className="text-3xl font-bold">
            {company?.name}
          </h2>

          <p className="mt-2 text-muted-foreground">
            Selamat datang kembali,
            <span className="font-semibold">
              {" "}
              {user?.fullName}
            </span>
          </p>

        </CardContent>

      </Card>

      {/* Cards */}

      <div className="grid gap-6 md:grid-cols-3">

        <Card>

          <CardHeader>

            <CardTitle>
              Paket
            </CardTitle>

          </CardHeader>

          <CardContent>

            <div className="text-2xl font-bold uppercase">
              {subscription?.plan}
            </div>

          </CardContent>

        </Card>

        <Card>

          <CardHeader>

            <CardTitle>
              Produk
            </CardTitle>

          </CardHeader>

          <CardContent>

            <div className="text-2xl font-bold">
              {stats.totalProducts}
            </div>

          </CardContent>

        </Card>

        <Card>

          <CardHeader>

            <CardTitle>
              Playlist
            </CardTitle>

          </CardHeader>

          <CardContent>

            <div className="text-2xl font-bold">
              {stats.totalPlaylists}
            </div>

          </CardContent>

        </Card>

      </div>

    </div>
  );
}