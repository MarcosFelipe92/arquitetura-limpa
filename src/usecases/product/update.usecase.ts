import { NegativeProductPriceError } from "../../domain/exceptions/product.errors";
import { Product } from "../../domain/product/entity/product";
import { ProductGateway } from "../../domain/product/gateway/product.gateway";
import { NotFoundError } from "../../infra/api/errors/api.errors";
import { Usecase } from "../usecases";

export type UpdateProductInputDto = {
  id: string;
  name: string;
  price: number;
};

export type UpdateProductOutputDto = {
  id: string;
};

export class UpdateProductUsecase implements Usecase<UpdateProductInputDto, UpdateProductOutputDto> {
  constructor(private readonly productGateway: ProductGateway) {}

  public static build(productGateway: ProductGateway) {
    return new UpdateProductUsecase(productGateway);
  }

  public async execute({ id, name, price }: UpdateProductInputDto): Promise<UpdateProductOutputDto> {
    const product = await this.productGateway.findById(id);

    if (!product) {
      throw new NotFoundError(`Produto com o id ${id} não existe.`);
    }

    const updatedProduct = Product.build(name, price);

    await this.productGateway.update(id, { name: updatedProduct.name, price: updatedProduct.price });

    return { id };
  }
}
