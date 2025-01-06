import { Product } from "@prisma/client";
import { ProductGateway } from "../../domain/product/gateway/product.gateway";
import { Usecase } from "../usecases";

export type DeleteProductInputDto = {
  id: string;
};

export type DeleteProductOutputDto = { id: string };

export class DeleteProductUsecase implements Usecase<DeleteProductInputDto, DeleteProductOutputDto> {
  private constructor(private readonly productGateway: ProductGateway) {}

  public static build(productGateway: ProductGateway) {
    return new DeleteProductUsecase(productGateway);
  }

  public async execute(input: DeleteProductInputDto): Promise<DeleteProductOutputDto> {
    if (!this.productGateway.findById(input.id)) {
      throw new Error(`Produto não encontrado com o id: ${input.id}`);
    }

    await this.productGateway.delete(input.id);
    const output = { id: input.id };

    return output;
  }
}
