import Elysia, { status } from "elysia";
import { mobileBody, otpModel } from "../../service/model.config";
import { OTP_Class } from "../../service/verification";
import { otp_limiter } from "../../config/rate.limit";

export const otpAPI = new Elysia({ prefix: "/otp" })
    .use(mobileBody)
    .use(otpModel)
    .use(otp_limiter)
    .post("/send-otp", async ({ body }) => {
        try {
            return await new OTP_Class().otpCall(body.mobile_num);
        } catch (error) {
            throw status(502, ({
                success: false,
                message: `Something went wrong within the server.`
            }))
        }
    }, {
        body: "mobile_body"
    })