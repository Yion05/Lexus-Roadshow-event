import Elysia, { status } from "elysia";
import { sessionAssign } from "../../middleware/auth";
import { DB_CONFIG } from "../../service/database";
import { paginationData } from "../../service/model.config";

export const adminAccess = new Elysia()
    .use(sessionAssign)
    .use(paginationData)
    .get(`/`, async () => {
        try {
            return await new DB_CONFIG().getTotalItems();
        } catch (error) {
            console.error(error)
            throw status(502, ({
                success: false,
                message: "Something went wrong within the server."
            }));
        }
    })
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
    .get(`/data`, async ({ query: { page_num, page_size } }) => {
        try {
            return await new DB_CONFIG().getPaginatedData(page_num, page_size);
        } catch (error) {
            console.error(error)
            throw status(502, ({
                success: false,
                message: "Something went wrong within the server."
            }));
        }
    }, {
        query: "page_body"
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