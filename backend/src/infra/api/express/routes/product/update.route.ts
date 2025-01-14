import { Request, Response } from "express";
import { UpdateProductInputDto, UpdateProductOutputDto, UpdateProductUsecase } from "../../../../../usecases/product/update.usecase";
import { HttpMethod, Route } from "../route";
import { Usecase } from "../../../../../usecases/usecases";

export type UpdateProductResponseDto = { id: string };

export class UpdateProductRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly service: Usecase<UpdateProductInputDto, UpdateProductOutputDto>
  ) {}

  public static build(service: UpdateProductUsecase) {
    return new UpdateProductRoute("/products/:id", HttpMethod.PUT, service);
  }

  public getHandler(): (request: Request, response: Response) => Promise<void> {
    return async (request: Request, response: Response) => {
      const { id } = request.params;
      const { name, price } = request.body;

      const input: UpdateProductInputDto = {
        id,
        name,
        price,
      };

      const output: UpdateProductOutputDto = await this.service.execute(input);

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

  private present(input: UpdateProductOutputDto): UpdateProductResponseDto {
    const response = { id: input.id };

    return response;
  }
}
