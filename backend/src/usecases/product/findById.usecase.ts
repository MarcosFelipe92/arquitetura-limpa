import { Product } from "@prisma/client";
import { ProductGateway } from "../../domain/product/gateway/product.gateway";
import { Usecase } from "../usecases";
import { NotFoundError } from "../../infra/api/errors/api.errors";

export type FindByIdProductInputDto = { id: string };

export type FindByIdProductOutputDto = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export class FindByIdProductUsecase implements Usecase<FindByIdProductInputDto, FindByIdProductOutputDto> {
  constructor(private readonly productGateway: ProductGateway) {}

  public static build(productGateway: ProductGateway) {
    return new FindByIdProductUsecase(productGateway);
  }

  public async execute(input: FindByIdProductInputDto): Promise<FindByIdProductOutputDto> {
    const product = await this.productGateway.findById(input.id);

    if (!product) {
      throw new NotFoundError(`Produto com o id ${input.id} não existe.`);
    }

    const output = this.presentOutput(product);

    return output;
  }

  private presentOutput(product: Product): FindByIdProductOutputDto {
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: product.quantity,
    };
  }
}
