// OTP array

import { status } from "elysia";
import { EncryptPass, VerifyPass } from "../../utils/randomUUID";
import { DB } from "../config/data";
import { DB_CONFIG } from "./database";
import { SMSConfig } from "../config/envs";

export class OTP_Class {
    async otpCall(mobile_num: string) {
        const newOTP = await this.joinOTP(await this.otpGen());
        const encryptedOTP = await EncryptPass(newOTP);
        try {
            const expirationMinutes = 10;
            const expiresAt = new Date(Date.now() + expirationMinutes * 60 * 1000);

            const query = `INSERT INTO otp_verifications (contact_number, otp_hash, expires_at, is_verified)
                            VALUES ($1, $2, $3, $4);`

            await DB.query(query, [mobile_num, encryptedOTP, expiresAt, false]);

            const SMSSending = await SMSConfig.sendSMS(mobile_num, `Your verification code is ${newOTP} from lexusexperienceamazing.`);
            if (!SMSSending) {
                throw status(500, {
                    success: false,
                    message: `OTP Failed to Sent.`
                });
            };

            return status(200, ({
                success: true,
                message: `Successfully generated OTP.`,
            }))
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    async otpReset(mobile_num: string) {
        const newOTP = await this.joinOTP(await this.otpGen());
        const encryptedOTP = await EncryptPass(newOTP);
        try {
            const expirationMinutes = 10;
            const expiresAt = new Date(Date.now() + expirationMinutes * 60 * 1000);

            const existingRecord = await DB.query(`SELECT 1 FROM otp_verifications WHERE contact_number = $1`, [mobile_num]);

            if (existingRecord.length > 0) {
                const updateQuery = `UPDATE otp_verifications SET otp_hash = $1, expires_at = $2, is_verified = $3 WHERE contact_number = $4`;
                await DB.query(updateQuery, [encryptedOTP, expiresAt, false, mobile_num]);
            } else {
                const insertQuery = `INSERT INTO otp_verifications (contact_number, otp_hash, expires_at, is_verified) VALUES ($1, $2, $3, $4)`;
                await DB.query(insertQuery, [mobile_num, encryptedOTP, expiresAt, false]);
            }

            const SMSSending = await SMSConfig.sendSMS(mobile_num, `Your verification code is ${newOTP}`);
            if (!SMSSending) {
                throw status(500, {
                    success: false,
                    message: `OTP Failed to Sent.`
                });
            };

            return status(200, ({
                success: true,
                message: `Successfully regenerated OTP.`,
            }))
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    async otpValidate(contact_number: string, OTPNum: number[]) {
        const joinOTP = await this.joinOTP(OTPNum);
        try {
            const otphash_query = `SELECT otp_hash, expires_at from otp_verifications WHERE contact_number = $1`
            const otpUpdate_query = `UPDATE otp_verifications SET is_verified = ($1) WHERE contact_number = ($2)`

            const currentOTP = await DB.query(otphash_query, [contact_number]);
            if (currentOTP.length <= 0) {
                return status(404, ({
                    sucess: false,
                    message: `OTP not found.`,
                    output: {
                        isValidated: false
                    },
                }));
            }

            const { otp_hash, expires_at } = currentOTP[0];

            const now = new Date();
            const expiresAt = new Date(expires_at);

            if (now > expiresAt) {
                await new DB_CONFIG().deleteOTPSession(contact_number);
                return status(401, ({
                    sucess: false,
                    message: `OTP was expired.`,
                    output: {
                        isValidated: false
                    },
                }));
            }

            const isOTPMatched = await VerifyPass(joinOTP, otp_hash)
            if (!isOTPMatched) {
                return status(401, ({
                    sucess: false,
                    message: `OTP was not match.`,
                    output: {
                        isValidated: false
                    },
                }));
            };

            await DB.query(otpUpdate_query, [isOTPMatched, contact_number])

            return status(200, ({
                success: true,
                message: `Successfully verified submission session.`,
                output: {
                    isValidated: true
                },
            }))
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async otpGen(): Promise<number[]> {
        try {
            let otp: number[] = [];
            for (let index = 0; index < 6; index++) {
                const rng = Math.round(Math.random() * 8 + 1)
                otp.push(rng)
            }
            return otp;
        } catch (error) {
            throw error;
        }
    };

    async joinOTP(OTP: number[]): Promise<string> {
        try {
            const otp = OTP.join("");
            return otp;
        } catch (error) {
            throw error;
        }
    };
};
