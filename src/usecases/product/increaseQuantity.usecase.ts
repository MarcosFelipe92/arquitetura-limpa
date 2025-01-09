import { Product } from "@prisma/client";
import { ProductGateway } from "../../domain/product/gateway/product.gateway";
import { Usecase } from "../usecases";
import { NotFoundError } from "../../infra/api/errors/api.errors";

export type IncreaseQuantityProductInputDto = {
  id: string;
  quantity: number;
};

export type IncreaseQuantityProductOutputDto = {
  id: string;
};

export class IncreaseQuantityProductUsecase implements Usecase<IncreaseQuantityProductInputDto, IncreaseQuantityProductOutputDto> {
  constructor(private readonly productGateway: ProductGateway) {}

  public static build(productGateway: ProductGateway) {
    return new IncreaseQuantityProductUsecase(productGateway);
  }

  public async execute({ id, quantity }: IncreaseQuantityProductInputDto): Promise<IncreaseQuantityProductOutputDto> {
    const product = await this.productGateway.findById(id);
    if (!product) {
      throw new NotFoundError(`Produto com o id ${id} não existe.`);
    }

    product.increaseQuantity(quantity);
    await this.productGateway.update(id, product);

    const output = this.presentOutput(product);

    return output;
  }

  private presentOutput(product: Product): IncreaseQuantityProductOutputDto {
    return {
      id: product.id,
    };
  }
}
