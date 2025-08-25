import Elysia, { status } from "elysia";
import { sessionAssign } from "../../middleware/auth";
import { DB_CONFIG } from "../../service/database";

export const adminAccess = new Elysia()
    .use(sessionAssign)
    .get("/auth", () => {
        try {
            return status(200, ({
                success: true,
                message: "Something went wrong within the server.",
                output: {
                    isAuth: true,
                }
            }));
        } catch (error) {
            throw status(502, ({
                success: false,
                message: "Something went wrong within the server."
            }));
        }
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
    .get("/get-json", async () => {
        try {
            return await new DB_CONFIG().getJSON();
        } catch (error) {
            throw status(502, ({
                success: false,
                message: "Something went wrong within the server."
            }));
        }
    })
    .get("/download-csv", async ({ set }) => {
        try {
            const data = await new DB_CONFIG().getCSV();
            if (typeof data === 'string') {
                set.headers['content-type'] = 'text/csv'
                set.headers['content-disposition'] = 'attachment; filename="form_submissions.csv"'

                const CSVData = Bun.file(`./tmp/form_submissions.csv`)
                return new Response(CSVData);
            };
            return data;
        } catch (error) {
            console.error(error)
            throw status(502, ({
                success: false,
                message: "Something went wrong within the server."
            }));
        }
    })