import { PlaylistRepository } from "@/repositories/playlist/PlaylistRepository";

import type { Playlist } from "@/types";

export class CreatePlaylistUseCase {

  constructor(
    private readonly repository:
      PlaylistRepository
  ) {}

  async execute(
    playlist: Playlist
  ) {

    await this.repository.create(
      playlist
    );

  }

}