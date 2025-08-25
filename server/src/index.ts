import { Elysia } from "elysia";
import { ServerConfig } from "./config/envs";
import { router } from "./router/router";
import swagger from "@elysiajs/swagger";

const app = new Elysia({ prefix: "/api" });
app.use(swagger({
  path: "/swagger"
}));
app.use(router);

app.listen(ServerConfig.server_port, () => {
  for (const url of ServerConfig.frontend_url) {
    console.log(`Elysia's server is running for client ${url}`)
  }
})