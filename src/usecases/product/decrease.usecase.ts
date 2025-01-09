import { Product } from "@prisma/client";
import { ProductGateway } from "../../domain/product/gateway/product.gateway";
import { Usecase } from "../usecases";
import { NotFoundError } from "../../infra/api/errors/api.errors";

export type DecreaseQuantityProductInputDto = {
  id: string;
  quantity: number;
};

export type DecreaseQuantityProductOutputDto = {
  id: string;
};

export class DecreaseQuantityProductUsecase implements Usecase<DecreaseQuantityProductInputDto, DecreaseQuantityProductOutputDto> {
  constructor(private readonly productGateway: ProductGateway) {}

  public static build(productGateway: ProductGateway) {
    return new DecreaseQuantityProductUsecase(productGateway);
  }

  public async execute({ id, quantity }: DecreaseQuantityProductInputDto): Promise<DecreaseQuantityProductOutputDto> {
    const product = await this.productGateway.findById(id);
    if (!product) {
      throw new NotFoundError(`Produto com o id ${id} não existe.`);
    }

    product.decreaseQuantity(quantity);
    await this.productGateway.update(id, product);

    const output = this.presentOutput(product);

    return output;
  }

  private presentOutput(product: Product): DecreaseQuantityProductOutputDto {
    return {
      id: product.id,
    };
  }
}
