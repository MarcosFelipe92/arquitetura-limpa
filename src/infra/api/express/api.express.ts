import { Api } from "../api";
import express, { Express, NextFunction, Request, Response } from "express";
import { Route } from "./routes/route";
import { errorMiddleware } from "./middlewares/error.middleware";

export class ApiExpress implements Api {
  private app: Express;

  private constructor(routes: Route[]) {
    this.app = express();
    this.app.use(express.json());
    this.addRoutes(routes);
    this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      errorMiddleware(err, req, res, next);
    });
  }

  public static build(routes: Route[]) {
    return new ApiExpress(routes);
  }

  private addRoutes(routes: Route[]) {
    routes.forEach((route) => {
      const path = route.getPath();
      const method = route.getHttpMethod();
      const handler = route.getHandler();

      this.app[method](path, handler);
    });
  }

  public start(port: number): void {
    this.app.listen(port, () => {
      console.log(`Server running on ${port}`);
      this.listRoutes();
    });
  }

  private listRoutes() {
    const routes = this.app._router.stack
      .filter((route: any) => route.route)
      .map((route: any) => {
        return {
          path: route.route.path,
          method: route.route.stack[0].method,
        };
      });

    console.log(routes);
  }
}
