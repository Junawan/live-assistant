"use client";

import { useCallback, useEffect, useState } from "react";

import {
  createPlaylistUseCase,
  deletePlaylistUseCase,
  getPlaylistsUseCase,
  updatePlaylistUseCase,
} from "@/di";

import { useCompanyStore } from "@/stores/company.store";

import type { Playlist } from "@/types";

export function usePlaylists() {

  const company =
    useCompanyStore(
      (state) => state.company
    );

  const [loading, setLoading] =
    useState(true);

  const [playlists, setPlaylists] =
    useState<Playlist[]>([]);

  const refresh = useCallback(async () => {

    if (!company) return;

    setLoading(true);

    try {

      const data =
        await getPlaylistsUseCase.execute(
          company.companyId
        );

      setPlaylists(data);

    } finally {

      setLoading(false);

    }

  }, [company]);

  useEffect(() => {

    refresh();

  }, [refresh]);

  async function create(
    playlist: Playlist
  ) {

    await createPlaylistUseCase.execute(
      playlist
    );

    await refresh();

  }

  async function update(
    playlistId: string,
    data: Partial<Playlist>
  ) {

    await updatePlaylistUseCase.execute(
      playlistId,
      data
    );

    await refresh();

  }

  async function remove(
    playlistId: string
  ) {

    await deletePlaylistUseCase.execute(
      playlistId
    );

    await refresh();

  }

  return {

    playlists,

    loading,

    refresh,

    create,

    update,

    remove,

  };

}