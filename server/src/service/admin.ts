import { status } from "elysia";
import { EncryptPass, UUIDHex, VerifyPass } from "../../utils/randomUUID"
import { DB } from "../config/data";
import type { admin_auth_check, admin_user, adminLogin, adminUser } from "../types/types";

export class ADMIN_Class {
    async createAdmin(user: adminUser) {
        const query = `
            INSERT INTO admin_user (id, username, email, password_hash, isActive)
            VALUES ($1, $2, $3, $4, $5)
        `;
        try {
            const newUUID = await UUIDHex("hex", 0);
            const hashPass = await EncryptPass(user.password);

            await DB.query(query, [newUUID, user.username, user.email, hashPass, true]);
            await DB.query(`COMMIT`);

            return status(200, ({
                success: true,
                message: `Successfully created admin account.`
            }))
        } catch (error) {
            throw status(502, ({
                success: false,
                message: `Internal server error.`
            }))
        }
    };

    async loginAdmin(user: adminLogin) {
        const query = `
            SELECT * FROM admin_user WHERE username = $1 OR email = $1 LIMIT 1
        `;
        try {
            const adminData = await DB.query(query, [user.username]) as unknown as admin_auth_check[];
            if (!adminData[0].id || !adminData[0].isactive) {
                return status(404, ({
                    success: false,
                    message: `User not found.`
                }));
            }
        
            const checkPassword = await VerifyPass(user.password, adminData[0].password_hash);
            if (!checkPassword) {
                return status(401, ({
                    success: false,
                    message: `Incorrect password in login.`
                }));
            };

            return adminData[0].id;       
        } catch (error) {
            throw status(502, ({
                success: false,
                message: `Internal server error.`
            }))
        }
    }
}