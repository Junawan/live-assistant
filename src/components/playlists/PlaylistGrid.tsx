"use client";

import { useRouter } from "next/navigation";

import type { Playlist } from "@/types";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  Badge,
} from "@/components/ui/badge";

import {
  Button,
} from "@/components/ui/button";

import {
  Pencil,
  Trash2,
} from "lucide-react";

interface Props {
  playlists: Playlist[];

  onEdit?: (
    playlist: Playlist
  ) => void;

  onDelete?: (
    playlist: Playlist
  ) => void;

  onRefresh?: () => void;
}

export default function PlaylistGrid({
  playlists,
  onEdit,
  onDelete,
}: Props) {

  const router = useRouter();

  if (!playlists.length) {
    return (
      <div className="flex h-60 items-center justify-center rounded-xl border border-dashed">
        Belum ada Playlist
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

      {playlists.map((playlist) => (

        <Card
          key={playlist.playlistId}
          className="cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1"
          onClick={() =>
            router.push(
              `/dashboard/playlists/${playlist.playlistId}`
            )
          }
        >

          <CardContent className="space-y-4 p-5">

            <h3 className="text-lg font-semibold">
              {playlist.name}
            </h3>

            <p className="text-sm text-muted-foreground">
              {playlist.description ||
                "Tidak ada deskripsi"}
            </p>

            <div className="flex gap-2">

              <Badge>
                {playlist.productIds.length} Produk
              </Badge>

              {playlist.isDefault && (
                <Badge variant="secondary">
                  Default
                </Badge>
              )}

            </div>

            <div className="flex gap-2">

              <Button
                variant="outline"
                className="flex-1"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit?.(playlist);
                }}
              >
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </Button>

              <Button
                variant="destructive"
                className="flex-1"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete?.(playlist);
                }}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Hapus
              </Button>

            </div>

          </CardContent>

        </Card>

      ))}

    </div>
  );
}