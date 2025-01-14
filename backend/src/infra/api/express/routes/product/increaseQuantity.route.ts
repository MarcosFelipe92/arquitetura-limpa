import { Request, Response } from "express";
import {
  IncreaseQuantityProductInputDto,
  IncreaseQuantityProductOutputDto,
  IncreaseQuantityProductUsecase,
} from "../../../../../usecases/product/increaseQuantity.usecase";
import { HttpMethod, Route } from "../route";
import { Usecase } from "../../../../../usecases/usecases";

export type IncreaseQuantityProductResponseDto = { id: string };

export class IncreaseQuantityProductRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly service: Usecase<IncreaseQuantityProductInputDto, IncreaseQuantityProductOutputDto>
  ) {}

  public static build(service: IncreaseQuantityProductUsecase) {
    return new IncreaseQuantityProductRoute("/products/increase-quantity/:id", HttpMethod.PUT, service);
  }

  public getHandler(): (request: Request, response: Response) => Promise<void> {
    return async (request: Request, response: Response) => {
      const { id } = request.params;
      const { quantity } = request.body;

      const input: IncreaseQuantityProductInputDto = {
        id,
        quantity,
      };

      const output: IncreaseQuantityProductOutputDto = await this.service.execute(input);

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

  private present(input: IncreaseQuantityProductOutputDto): IncreaseQuantityProductResponseDto {
    const response = { id: input.id };

    return response;
  }
}
