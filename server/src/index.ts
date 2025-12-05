import { Elysia } from "elysia";
import { ServerConfig } from "./config/envs";
import { router } from "./router/router";
import swagger from "@elysiajs/swagger";

const app = new Elysia({ prefix: "/api" }).get("/", ({status})=>{
  return status(200, ({
    success: true,
    message: `Elysia server is running.`,
    domain_supports: ServerConfig.frontend_url,
  }))
});
app.use(swagger({
  path: "/swagger"
}));

app.use(router);

app.listen(ServerConfig.server_port, () => {
  for (const url of ServerConfig.frontend_url) {
    console.log(`Elysia's server is running for client ${url}`)
  }
})