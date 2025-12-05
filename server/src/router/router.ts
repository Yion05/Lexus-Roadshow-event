import Elysia, { status } from "elysia";
import { ServerConfig } from "../config/envs";
import { CorsConfig } from "../config/cors.config";
import { formAPI } from "../controllers/form/form";
import { otpAPI } from "../controllers/otp/otp";
import { adminControl } from "../controllers/admin/admin";
import { adminLogout } from "../controllers/admin/admin.logout";
import { adminAccess } from "../controllers/admin/admin.perm";
import { otpVerify } from "../controllers/otp/verify";

export const router = new Elysia({ prefix: `v${ServerConfig.version}` }).use(CorsConfig);

router.group("/control", (app) => (
    app
        .use(adminControl)
        .use(adminLogout)
        .use(adminAccess)
))

router.use(formAPI)
router.use(otpVerify)
router.use(otpAPI)