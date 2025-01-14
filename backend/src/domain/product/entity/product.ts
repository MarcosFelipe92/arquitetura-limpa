import { InsufficientStockError, NegativeProductPriceError, NegativeQuantityError } from "../../exceptions/product.errors";

export type ProductProps = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export class Product {
  private constructor(readonly props: ProductProps) {}

  public static build(name: string, price: number) {
    if (price < 0) {
      throw new NegativeProductPriceError();
    }
    return new Product({
      id: crypto.randomUUID().toString(),
      name,
      price,
      quantity: 0,
    });
  }

  public static with(props: ProductProps) {
    return new Product(props);
  }

  public get id() {
    return this.props.id;
  }

  public get name() {
    return this.props.name;
  }

  public get price() {
    return this.props.price;
  }

  public get quantity() {
    return this.props.quantity;
  }

  public increaseQuantity(quantity: number) {
    if (quantity < 0) {
      throw new NegativeQuantityError();
    }
    this.props.quantity += quantity;
  }

  public decreaseQuantity(quantity: number) {
    if (this.props.quantity - quantity < 0) {
      throw new InsufficientStockError();
    }
    this.props.quantity -= quantity;
  }
}
