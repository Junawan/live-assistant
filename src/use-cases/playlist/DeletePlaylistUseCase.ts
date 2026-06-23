import { PlaylistRepository } from "@/repositories/playlist/PlaylistRepository";

export class DeletePlaylistUseCase {

  constructor(
    private readonly repository:
      PlaylistRepository
  ) {}

  async execute(
    playlistId: string
  ) {

    await this.repository.delete(
      playlistId
    );

  }

}