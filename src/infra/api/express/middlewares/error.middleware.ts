import { NextFunction, Request, Response } from "express";
import { ApiError } from "./api.errors";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const errorMiddleware = (error: Error & Partial<ApiError>, req: Request, res: Response, next: NextFunction) => {
  let statusCode = error.statusCode ?? 500;
  let errorMessage = error.message;

  if (error instanceof PrismaClientKnownRequestError) {
    if (error.code === "P2003") {
      statusCode = 400;
      errorMessage = "Erro na associação de entidades.";
    }
  }
  return res.status(statusCode).json({ message: errorMessage });
};
