import Elysia from "elysia";
import { rateLimit } from "elysia-rate-limit";

export const otp_limiter = new Elysia().use(rateLimit({
    duration: 1 * 60 * 1000,
    max: 1,
    errorResponse: `Too many requests from this IP, please try again after 1 minutes`,
}));
