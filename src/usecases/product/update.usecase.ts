import { Product } from "../../domain/product/entity/product";
import { ProductGateway } from "../../domain/product/gateway/product.gateway";
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
    const product = Product.build(name, price);
    await this.productGateway.update(id, product);

    const output = this.presentOutput(product);

    return output;
  }

  private presentOutput(product: Product): UpdateProductOutputDto {
    return {
      id: product.id,
    };
  }
}
