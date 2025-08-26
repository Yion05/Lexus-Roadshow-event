import Elysia from "elysia";
import { rateLimit } from "elysia-rate-limit";

export const data_limiter = new Elysia().use(rateLimit({
    duration: 2 * 60 * 1000,
    max: 3,
    errorResponse: `Too many requests from this IP, please try again after 2 minutes`,
}));

export const otp_limiter = new Elysia().use(rateLimit({
    duration: 15 * 60 * 1000,
    max: 6,
    errorResponse: `Too many requests from this IP, please try again after 15 minutes`,
}));
