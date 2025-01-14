import { Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import { FindByIdProductInputDto, FindByIdProductOutputDto, FindByIdProductUsecase } from "../../../../../usecases/product/findById.usecase";
import { Usecase } from "../../../../../usecases/usecases";

export type FindByIdProductResponseDto = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export class FindByIdProductRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly service: Usecase<FindByIdProductInputDto, FindByIdProductOutputDto>
  ) {}

  public static build(service: FindByIdProductUsecase) {
    return new FindByIdProductRoute("/products/:id", HttpMethod.GET, service);
  }

  getHandler(): (request: Request, response: Response) => Promise<void> {
    return async (request: Request, response: Response) => {
      const { id } = request.params;

      const output: FindByIdProductOutputDto = await this.service.execute({ id });

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

  private present(input: FindByIdProductOutputDto): FindByIdProductResponseDto {
    const response: FindByIdProductResponseDto = {
      id: input.id,
      name: input.name,
      price: input.price,
      quantity: input.quantity,
    };

    return response;
  }
}
