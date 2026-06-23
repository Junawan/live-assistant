import { PlaylistRepository } from "@/repositories/playlist/PlaylistRepository";

import type { Playlist } from "@/types";

export class UpdatePlaylistUseCase {

  constructor(
    private readonly repository:
      PlaylistRepository
  ) {}

  async execute(
    playlistId: string,
    data: Partial<Playlist>
  ) {

    await this.repository.update(
      playlistId,
      data
    );

  }

}