import { ProductRepository } from "@/repositories/product/ProductRepository";

export interface UpdateProductRequest {
  productId: string;

  categoryId?: string;

  title: string;

  image: string;

  productInfo: string;

  notes: string;

  teleprompterText: string;

  active: boolean;
}

export class UpdateProductUseCase {
  constructor(
    private readonly productRepository: ProductRepository
  ) {}

  async execute(
    request: UpdateProductRequest
  ): Promise<void> {
    await this.productRepository.update(
      request.productId,
      {

        title: request.title,

        image: request.image,

        productInfo: request.productInfo,

        notes: request.notes,

        teleprompterText:
          request.teleprompterText,

        active: request.active,

        updatedAt: new Date(),
      }
    );
  }
}