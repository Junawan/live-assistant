import { PlaylistRepository } from "@/repositories/playlist/PlaylistRepository";

export class AddProductToPlaylistUseCase {

  constructor(
    private readonly repository: PlaylistRepository
  ) {}

  async execute(
    playlistId: string,
    productId: string
  ) {

    await this.repository.addProduct(
      playlistId,
      productId
    );

  }

}