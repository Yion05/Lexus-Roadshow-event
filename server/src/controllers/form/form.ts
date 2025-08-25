import Elysia, { status } from "elysia";
import { straight_form, partialForm } from "../../service/model.config";
import { DB_CONFIG } from "../../service/database";

export const formAPI = new Elysia({ prefix: "/form" })
    .use(partialForm)
    .use(straight_form)
    .post("/", async ({ body }) => {
        try {
            const submittedData = await new DB_CONFIG().createSubmission(body);
            return submittedData
        } catch (error) {
            throw status(502, ({
                success: false,
                message: "Something went wrong within the server."
            }));
        }
    }, {
        body: "short_form"
    })
    .get("/get-all", async () => {
        try {
            return await new DB_CONFIG().readData();
        } catch (error) {
            throw status(502, ({
                success: false,
                message: "Something went wrong within the server."
            }));
        }
    })