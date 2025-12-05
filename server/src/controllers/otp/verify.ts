import Elysia, { status } from "elysia";
import { mobileBody, otpModel } from "../../service/model.config";
import { OTP_Class } from "../../service/verification";

export const otpVerify = new Elysia({ prefix: "/otp" })
    .use(mobileBody)
    .use(otpModel)
    .post("/verify-otp", async ({ body }) => {
        try {
            return await new OTP_Class().otpValidate(body.mobile_num, body.otp_num);
        } catch (error) {
            throw status(502, ({
                success: false,
                message: `Something went wrong within the server.`
            }))
        }
    }, {
        body: "otp_body"
    })
