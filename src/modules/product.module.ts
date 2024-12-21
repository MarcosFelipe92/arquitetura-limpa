import { CreateProductUsecase } from "../usecases/product/create.usecase";
import { ListProductUsecase } from "../usecases/product/list.usecase";
import { ProductRepository } from "../infra/repositories/product/product.repository";
import { CreateProductRoute } from "../infra/api/express/routes/product/create.route";
import { ListProductRoute } from "../infra/api/express/routes/product/list.route";
import { prisma } from "../package/prisma/prisma";

export function initProductModule() {
  const repository = ProductRepository.build(prisma);

  const createProductUsecase = CreateProductUsecase.build(repository);
  const listProductUsecase = ListProductUsecase.build(repository);

  const createRoute = CreateProductRoute.build(createProductUsecase);
  const listRoute = ListProductRoute.build(listProductUsecase);

  return [createRoute, listRoute];
}
