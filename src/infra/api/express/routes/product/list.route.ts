import { Request, Response } from "express";
import {
  ListProductInputDto,
  ListProductOutputDto,
  ListProductUsecase,
} from "../../../../../usecases/product/list.usecase";
import { HttpMethod, Route } from "../route";
import { Usecase } from "../../../../../usecases/usecases";

export type ListProductResponseDto = {
  products: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
};

export class ListProductRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly service: Usecase<ListProductInputDto, ListProductOutputDto>
  ) {}

  public static build(service: ListProductUsecase) {
    return new ListProductRoute("/products", HttpMethod.GET, service);
  }

  public getHandler(): (request: Request, response: Response) => Promise<void> {
    return async (request: Request, response: Response) => {
      const output: ListProductOutputDto = await this.service.execute();

      const responseData = this.present(output);

      response.status(200).json(responseData).send();
    };
  }

  public getPath(): string {
    return this.path;
  }

  public getHttpMethod(): HttpMethod {
    return this.method;
  }

  private present(input: ListProductOutputDto): ListProductResponseDto {
    const response: ListProductResponseDto = {
      products: input.products.map((p) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        quantity: p.quantity,
      })),
    };

    return response;
  }
}
