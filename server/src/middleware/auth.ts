import type { Elysia } from "elysia";
import { JWTDefault } from "../config/jwt.config";
import { DB } from "../config/data";
import { admin_user } from "../types/types";

export const sessionAssign = (app: Elysia) =>
    app
        .use(JWTDefault)
        .derive(async function handler({ JWTDefault, cookie: { admin_session }, status }) {
            const query = `SELECT id, username, email FROM admin_user WHERE id = $1 AND isActive = true`;
            try {
                const payload = await JWTDefault.verify(admin_session.value);
                if (!payload) {
                    return status(401, {
                        success: false,
                        message: "Unauthorized access.",
                    });
                };

                const { adminID } = payload;

                const findUser = await DB.query(query, [adminID]) as unknown as admin_user;
                if (!findUser) {
                    return status(404, {
                        success: false,
                        message: "User not found.",
                    });
                }

                return { findUser };
            } catch (error) {
                console.error(error);
                throw status(502, ({
                    success: false,
                    message: `Internal server error.`
                }));
            };
        })

export const sessionDelete = (app: Elysia) =>
    app
        .use(JWTDefault)
        .derive(async function handler({ JWTDefault, cookie: { admin_session }, status }) {
            const query = `SELECT id, username, email FROM admin_user WHERE id = $1 AND isActive = true`;
            const payload = await JWTDefault.verify(admin_session.value);
            if (!payload) {
                return status(401, {
                    success: false,
                    message: "Unauthorized to use due to missing token.",
                })
            };
            const { adminID } = payload;

            const findUser = await DB.query(query, [adminID]) as unknown as admin_user;
            if (!findUser) {
                return status(404, {
                    success: false,
                    message: "User not found within the data.",
                })
            };
            delete admin_session.value;
            admin_session.remove();
        })
