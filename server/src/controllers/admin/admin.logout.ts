import Elysia, { status } from "elysia";
import { sessionDelete } from "../../middleware/auth";

export const adminLogout = new Elysia()
    .use(sessionDelete)
    .post("/logout", async () => {
        try {
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
