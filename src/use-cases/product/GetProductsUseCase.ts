import { ProductRepository } from "@/repositories/product/ProductRepository";
import type { Product } from "@/types";

export class GetProductsUseCase {
  constructor(
    private readonly productRepository: ProductRepository
  ) {}

  async execute(
    companyId: string
  ): Promise<Product[]> {
    return this.productRepository.findByCompanyId(
      companyId
    );
  }
}