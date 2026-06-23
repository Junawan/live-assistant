import { ProductRepository } from "@/repositories/product/ProductRepository";

export class DeleteProductUseCase {
  constructor(
    private readonly productRepository: ProductRepository
  ) {}

  async execute(productId: string): Promise<void> {
    await this.productRepository.delete(productId);
  }
}