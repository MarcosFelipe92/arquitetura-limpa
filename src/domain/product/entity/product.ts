export type ProductProps = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export class Product {
  private constructor(readonly props: ProductProps) {}

  public static build(name: string, price: number) {
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
      throw new Error("Quantidade não pode ser negativa");
    }
    this.props.quantity += quantity;
  }

  public decreaseQuantity(quantity: number) {
    if (this.props.quantity - quantity < 0) {
      throw new Error("Estoque insuficiente");
    }
    this.props.quantity -= quantity;
  }
}
