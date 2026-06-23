import { PlaylistRepository } from "@/repositories/playlist/PlaylistRepository";
import type { Playlist } from "@/types";

export class GetPlaylistUseCase {
  constructor(
    private readonly repository: PlaylistRepository
  ) {}

  async execute(
    playlistId: string
  ): Promise<Playlist | null> {
    return this.repository.findById(
      playlistId
    );
  }
}