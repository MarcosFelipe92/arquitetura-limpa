import { CreateProductUsecase } from "../usecases/product/create.usecase";
import { ListProductUsecase } from "../usecases/product/list.usecase";
import { ProductRepository } from "../infra/repositories/product/product.repository";
import { CreateProductRoute } from "../infra/api/express/routes/product/create.route";
import { ListProductRoute } from "../infra/api/express/routes/product/list.route";
import { prisma } from "../package/prisma/prisma";
import { FindByIdProductRoute } from "../infra/api/express/routes/product/findById.route";
import { FindByIdProductUsecase } from "../usecases/product/findById.usecase";
import { DeleteProductUsecase } from "../usecases/product/delete.usecase";
import { DeleteProductRoute } from "../infra/api/express/routes/product/delete.route";
import { UpdateProductUsecase } from "../usecases/product/update.usecase";
import { UpdateProductRoute } from "../infra/api/express/routes/product/update.route";
import { IncreaseQuantityProductUsecase } from "../usecases/product/increaseQuantity.usecase";
import { IncreaseQuantityProductRoute } from "../infra/api/express/routes/product/increaseQuantity.route";

export function initProductModule() {
  const repository = ProductRepository.build(prisma);

  const createProductUsecase = CreateProductUsecase.build(repository);
  const listProductUsecase = ListProductUsecase.build(repository);
  const findByIdProductUsecase = FindByIdProductUsecase.build(repository);
  const deleteProductUsecase = DeleteProductUsecase.build(repository);
  const updateProductUsecase = UpdateProductUsecase.build(repository);
  const increaseQuantityProductUsecase = IncreaseQuantityProductUsecase.build(repository);

  const createRoute = CreateProductRoute.build(createProductUsecase);
  const listRoute = ListProductRoute.build(listProductUsecase);
  const findByIdRoute = FindByIdProductRoute.build(findByIdProductUsecase);
  const deleteRoute = DeleteProductRoute.build(deleteProductUsecase);
  const updateRoute = UpdateProductRoute.build(updateProductUsecase);
  const increaseQuantityRoute = IncreaseQuantityProductRoute.build(increaseQuantityProductUsecase);

  return [createRoute, listRoute, findByIdRoute, deleteRoute, updateRoute, increaseQuantityRoute];
}
