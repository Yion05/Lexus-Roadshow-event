import Elysia, { t } from "elysia";
import { ServerConfig } from "./envs";
import cors from "@elysiajs/cors";

export const CorsConfig = new Elysia()
    .use(cors({
        origin: ServerConfig.frontend_url,
        methods: '*',
        credentials: true,
        allowedHeaders: true,
    }))