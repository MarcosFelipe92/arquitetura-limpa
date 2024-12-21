import { Product } from "../../domain/product/entity/product";
import { ProductGateway } from "../../domain/product/gateway/product.gateway";
import { Usecase } from "../usecases";

export type CreateProductInputDto = {
  name: string;
  price: number;
};

export type CreateProductOutputDto = {
  id: string;
};

export class CreateProductUsecase implements Usecase<CreateProductInputDto, CreateProductOutputDto> {
  constructor(private readonly productGateway: ProductGateway) {}

  public static build(productGateway: ProductGateway) {
    return new CreateProductUsecase(productGateway);
  }

  public async execute({ name, price }: CreateProductInputDto): Promise<CreateProductOutputDto> {
    const product = Product.build(name, price);
    await this.productGateway.save(product);

    const output = this.presentOutput(product);

    return output;
  }

  private presentOutput(product: Product): CreateProductOutputDto {
    return {
      id: product.id,
    };
  }
}
