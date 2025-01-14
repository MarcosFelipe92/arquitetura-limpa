import { Request, Response } from "express";
import {
  CreateProductInputDto,
  CreateProductOutputDto,
  CreateProductUsecase,
} from "../../../../../usecases/product/create.usecase";
import { HttpMethod, Route } from "../route";
import { Usecase } from "../../../../../usecases/usecases";

export type CreateProductResponseDto = { id: string };

export class CreateProductRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly service: Usecase<
      CreateProductInputDto,
      CreateProductOutputDto
    >
  ) {}

  public static build(service: CreateProductUsecase) {
    return new CreateProductRoute("/products", HttpMethod.POST, service);
  }

  public getHandler(): (request: Request, response: Response) => Promise<void> {
    return async (request: Request, response: Response) => {
      const { name, price } = request.body;

      const input: CreateProductInputDto = {
        name,
        price,
      };

      const output: CreateProductOutputDto = await this.service.execute(input);

      const responseData = this.present(output);

      response.status(201).json(responseData).send();
    };
  }

  public getPath(): string {
    return this.path;
  }
  public getHttpMethod(): HttpMethod {
    return this.method;
  }

  private present(input: CreateProductOutputDto): CreateProductResponseDto {
    const response = { id: input.id };

    return response;
  }
}
