"use client";

import { useState } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import PlaylistToolbar from "@/components/playlists/PlaylistToolbar";

import PlaylistGrid from "@/components/playlists/PlaylistGrid";

import PlaylistDialog from "@/components/playlists/PlaylistDialog";

import { usePlaylists } from "@/hooks/usePlaylists";

import type { Playlist } from "@/types";

export default function PlaylistsPage() {

  const {
    playlists,
    loading,
    refresh,
    remove,
  } = usePlaylists();

  const [search, setSearch] =
    useState("");

  const [open, setOpen] =
    useState(false);

    const [selectedPlaylist, setSelectedPlaylist] =
  useState<Playlist | null>(null);

  const filtered =
    playlists.filter((playlist) =>
      playlist.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  return (
    <div className="space-y-6">

      <PlaylistToolbar
        search={search}
        onSearchChange={setSearch}
        onCreate={() =>
          setOpen(true)
        }
      />

      <Card>

        <CardHeader>

          <CardTitle>
            Playlist Live
          </CardTitle>

        </CardHeader>

        <CardContent>

          {loading ? (

            <div className="flex h-40 items-center justify-center">

              Memuat playlist...

            </div>

          ) : (

            <PlaylistGrid
  playlists={filtered}
  onEdit={(playlist) => {

    setSelectedPlaylist(
      playlist
    );

    setOpen(true);

  }}

  onDelete={async (playlist) => {

    if (
      !confirm(
        `Hapus playlist "${playlist.name}"?`
      )
    ) {
      return;
    }

    await remove(
      playlist.playlistId
    );

  }}
/>

          )}

        </CardContent>

      </Card>

      <PlaylistDialog
  open={open}
  playlist={selectedPlaylist}
  onOpenChange={(value) => {

    setOpen(value);

    if (!value) {

      setSelectedPlaylist(
        null
      );

    }

  }}
  onSuccess={refresh}
/>

    </div>
  );

}