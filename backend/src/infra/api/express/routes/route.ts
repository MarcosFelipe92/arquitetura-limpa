import { Request, Response } from "express";

export type HttpMethod = "get" | "post";

export const HttpMethod = {
  GET: "get" as HttpMethod,
  POST: "post" as HttpMethod,
  DELETE: "delete" as HttpMethod,
  PUT: "put" as HttpMethod,
};

export interface Route {
  getHandler(): (request: Request, response: Response) => Promise<void>;
  getPath(): string;
  getHttpMethod(): HttpMethod;
}
