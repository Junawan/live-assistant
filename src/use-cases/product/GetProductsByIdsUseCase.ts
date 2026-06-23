import { ProductRepository } from "@/repositories/product/ProductRepository";
import type { Product } from "@/types";

export class GetProductsByIdsUseCase {

  constructor(
    private readonly repository: ProductRepository
  ) {}

  async execute(
    productIds: string[]
  ): Promise<Product[]> {

    return this.repository.findByIds(
      productIds
    );

  }

}