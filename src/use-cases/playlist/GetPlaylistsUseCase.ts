import { PlaylistRepository } from "@/repositories/playlist/PlaylistRepository";

import type { Playlist } from "@/types";

export class GetPlaylistsUseCase {

  constructor(
    private readonly repository:
      PlaylistRepository
  ) {}

  async execute(
    companyId: string
  ): Promise<Playlist[]> {

    return this.repository.findByCompanyId(
      companyId
    );

  }

}