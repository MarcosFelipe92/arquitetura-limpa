import { NextFunction, Request, Response } from "express";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ApiError } from "../../errors/api.errors";
import { DomainError } from "../../../../domain/exceptions/domain.error";

export const errorMiddleware = (error: Error & Partial<ApiError>, req: Request, res: Response, next: NextFunction) => {
  let statusCode = error.statusCode ?? 500;
  let errorMessage = error.message;
  const typeError = getErrorType(error);

  if (error instanceof PrismaClientKnownRequestError && error.code === "P2003") {
    statusCode = 400;
    errorMessage = "Erro na associação de entidades.";
  }

  if (error instanceof DomainError) {
    statusCode = 400;
  }

  if (statusCode == 500) {
    errorMessage = "Internal Server Error";
  }

  return res.status(statusCode).json({ message: errorMessage, type: typeError });
};

const getErrorType = (error: Error): string => {
  if (error instanceof PrismaClientKnownRequestError) return "Database Error";
  if (error instanceof DomainError) return "Domain Error";
  if (error instanceof ApiError) return "API Error";

  return "Unknown Error";
};
