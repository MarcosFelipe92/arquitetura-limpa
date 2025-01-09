import { NextFunction, Request, Response } from "express";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ApiError } from "../../errors/api.errors";
import { DomainError } from "../../../../domain/exceptions/domain.error";

export const errorMiddleware = (error: Error & Partial<ApiError>, req: Request, res: Response, next: NextFunction) => {
  let statusCode = error.statusCode ?? 500;
  let errorMessage = error.message;

  if (error instanceof PrismaClientKnownRequestError) {
    if (error.code === "P2003") {
      statusCode = 400;
      errorMessage = "Erro na associação de entidades.";
    }
  }

  if (error instanceof DomainError) {
    statusCode = 400;
    errorMessage = error.message;
  }

  return res.status(statusCode).json({ message: errorMessage });
};
