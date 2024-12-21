import { initProductModule } from "./modules/product.module";

export function initRoutes() {
  const productRoutes = initProductModule();

  return [...productRoutes];
}
