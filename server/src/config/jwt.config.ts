import { Elysia, t } from "elysia";
import { CipherConfig } from "./envs";
import jwt from "@elysiajs/jwt";

export const JWTDefault = new Elysia()
    .use(jwt({
        name: 'JWTDefault',
        schema: t.Object({
            adminID: t.String(),
        }),
        secret: <string>CipherConfig.jwt_key,
        exp: "2h",
    }));


    