import { Product } from "../entity/product";

export interface ProductGateway {
  save(product: Product): Promise<void>;
  list(): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  delete(id: string): Promise<void>;
  update(id: string, data: Partial<{ id: string; name: string; price: number; quantity: number }>): Promise<void>;
}
