import Elysia, { status } from "elysia";
import { admin } from "../../service/model.config";
import { ADMIN_Class } from "../../service/admin";
import { JWTDefault } from "../../config/jwt.config";

export const adminControl = new Elysia()
    .use(admin)
    .use(JWTDefault)
    .post("/login", async ({ JWTDefault, body, cookie: { admin_session } }) => {
        const adminID = await new ADMIN_Class().loginAdmin(body);
        if (typeof adminID === 'string') {
            const session_token = await JWTDefault.sign({ adminID });
            admin_session.set({
                value: session_token,
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', 
                maxAge: 2 * 60 * 60, 
                path: '/',
                sameSite: <"none" | boolean | "lax" | "strict">Bun.env.sameSite ?? "none"
            });

            return status(200, ({
                success: true,
                message: `Successfully login into admin account.`
            }))
        };
        return adminID;
    }, {
        body: "admin_login"
    })