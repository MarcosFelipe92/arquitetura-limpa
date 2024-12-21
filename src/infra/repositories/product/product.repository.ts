import { PrismaClient } from "@prisma/client";
import { ProductGateway } from "../../../domain/product/gateway/product.gateway";
import { Product } from "../../../domain/product/entity/product";

export class ProductRepository implements ProductGateway {
  private constructor(private readonly prisma: PrismaClient) {}

  public static build(prisma: PrismaClient) {
    return new ProductRepository(prisma);
  }

  public async save(product: Product): Promise<void> {
    const data = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: product.quantity,
    };

    await this.prisma.product.create({ data });
  }
  public async list(): Promise<Product[]> {
    const products = await this.prisma.product.findMany();

    const output = products.map((p) => {
      return Product.with({
        id: p.id,
        name: p.name,
        price: p.price,
        quantity: p.quantity,
      });
    });

    return output;
  }
}
