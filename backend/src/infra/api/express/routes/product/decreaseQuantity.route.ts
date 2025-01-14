import { Request, Response } from "express";

import { HttpMethod, Route } from "../route";
import { Usecase } from "../../../../../usecases/usecases";
import {
  DecreaseQuantityProductInputDto,
  DecreaseQuantityProductOutputDto,
  DecreaseQuantityProductUsecase,
} from "../../../../../usecases/product/decrease.usecase";

export type DecreaseQuantityProductResponseDto = { id: string };

export class DecreaseQuantityProductRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly service: Usecase<DecreaseQuantityProductInputDto, DecreaseQuantityProductOutputDto>
  ) {}

  public static build(service: DecreaseQuantityProductUsecase) {
    return new DecreaseQuantityProductRoute("/products/decrease-quantity/:id", HttpMethod.PUT, service);
  }

  public getHandler(): (request: Request, response: Response) => Promise<void> {
    return async (request: Request, response: Response) => {
      const { id } = request.params;
      const { quantity } = request.body;

      const input: DecreaseQuantityProductInputDto = {
        id,
        quantity,
      };

      const output: DecreaseQuantityProductOutputDto = await this.service.execute(input);

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

  private present(input: DecreaseQuantityProductOutputDto): DecreaseQuantityProductResponseDto {
    const response = { id: input.id };

    return response;
  }
}
