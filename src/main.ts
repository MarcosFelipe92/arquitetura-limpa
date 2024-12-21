import { ApiExpress } from "./infra/api/express/api.express";
import { initRoutes } from "./routes";

function main() {
  const port = 8080;

  const routes = initRoutes();
  const api = ApiExpress.build(routes);

  api.start(port);

  console.log(`API running on http://localhost:${port}`);
}

main();
