import { Product } from "@prisma/client";
import { ProductGateway } from "../../domain/product/gateway/product.gateway";
import { Usecase } from "../usecases";
import { NotFoundError } from "../../infra/api/errors/api.errors";

export type DeleteProductInputDto = {
  id: string;
};

export type DeleteProductOutputDto = { id: string };

export class DeleteProductUsecase implements Usecase<DeleteProductInputDto, DeleteProductOutputDto> {
  private constructor(private readonly productGateway: ProductGateway) {}

  public static build(productGateway: ProductGateway) {
    return new DeleteProductUsecase(productGateway);
  }

  public async execute({ id }: DeleteProductInputDto): Promise<DeleteProductOutputDto> {
    const product = await this.productGateway.findById(id);
    if (!product) {
      throw new NotFoundError(`Produto com o id ${id} não existe.`);
    }

    await this.productGateway.delete(id);
    const output = { id };

    return output;
  }
}
