import { Request, Response } from "express";
import { DeleteProductInputDto, DeleteProductOutputDto, DeleteProductUsecase } from "../../../../../usecases/product/delete.usecase";
import { HttpMethod, Route } from "../route";
import { Usecase } from "../../../../../usecases/usecases";

export type DeleteProductResponseDto = { id: string };

export class DeleteProductRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly service: Usecase<DeleteProductInputDto, DeleteProductOutputDto>
  ) {}

  public static build(service: DeleteProductUsecase) {
    return new DeleteProductRoute("/products/:id", HttpMethod.DELETE, service);
  }

  public getHandler(): (request: Request, response: Response) => Promise<void> {
    return async (request: Request, response: Response) => {
      const { id } = request.params;

      const output: DeleteProductOutputDto = await this.service.execute({ id });

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

  private present(input: DeleteProductOutputDto): DeleteProductResponseDto {
    const response = { id: input.id };

    return response;
  }
}
