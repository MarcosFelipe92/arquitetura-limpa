import { DomainError } from "./domain.error";

export class NegativeQuantityError extends DomainError {
  constructor() {
    super("Quantidade não pode ser negativa.");
  }
}

export class InsufficientStockError extends DomainError {
  constructor() {
    super("Estoque insuficiente.");
  }
}

export class NegativeProductPriceError extends DomainError {
  constructor() {
    super("Preço do produto não pode ser negativo.");
  }
}
