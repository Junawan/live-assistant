import { ProductRepository } from "@/repositories/product/ProductRepository";
import { CategoryRepository } from "@/repositories/category/CategoryRepository";
import { PlaylistRepository } from "@/repositories/playlist/PlaylistRepository";

export interface DashboardStats {
  totalProducts: number;

  totalCategories: number;

  totalPlaylists: number;
}

export class GetDashboardStatsUseCase {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly categoryRepository: CategoryRepository,
    private readonly playlistRepository: PlaylistRepository
  ) {}

  async execute(
    companyId: string
  ): Promise<DashboardStats> {

    const [
      totalProducts,
      totalCategories,
      totalPlaylists,
    ] = await Promise.all([
      this.productRepository.countByCompany(companyId),
      this.categoryRepository.countByCompany(companyId),
      this.playlistRepository.countByCompany(companyId),
    ]);

    return {
      totalProducts,
      totalCategories,
      totalPlaylists,
    };
  }
}