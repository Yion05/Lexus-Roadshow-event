import Elysia, { status } from "elysia";
import { sessionDelete } from "../../middleware/auth";
import { JWTDefault } from "../../config/jwt.config";

export const adminLogout = new Elysia()
    .use(sessionDelete)
    .use(JWTDefault)
    .post("/logout", async ({ JWTDefault, cookie: { admin_session } }) => {
        try {
            admin_session.set({
                value: "",
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 5,
                path: '/',
                sameSite: <"none" | boolean | "lax" | "strict">Bun.env.sameSite ?? "none"
            });
            return status(200, {
                success: true,
                message: `Successfully logout of admin panel.`
            })
        } catch (error) {
            throw status(502, {
                success: false,
                message: `Something went wrong within the server.`
            })
        }
    });
