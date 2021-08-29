import mysqlService         from "./resources/MysqlService";
import { TypeKoa }          from "type-koa";
import { ActionController } from "./controllers/ActionController";

let port: number = process.env.PORT ? +process.env.PORT : 80;
let host: string = process.env.HTTP_HOST || '';

let typeKoa = new TypeKoa();

typeKoa.bootstrapControllers({
  controllerList: [
    ActionController
  ],
  middlewareList: []
});

// mysqlService.init();

let httpServer = typeKoa.app.listen(port, host);
const app = typeKoa.app.callback();

console.log(`Server started at: http://${host}:${port}`);
export { app, typeKoa, httpServer }
