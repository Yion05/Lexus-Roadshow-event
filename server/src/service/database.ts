import { status } from "elysia";
import { UUIDHex } from "../../utils/randomUUID";
import { DB } from "../config/data";
import { CombinedFormData, formAnswerList, formDataModel, FormDataState, isVerified, questionModel, submissionForm } from "../types/types";
import { convertCSV } from "./csv";
import { uploadImage } from "../../utils/S3";
import { FORM_DB } from "../../data/query.config";

export class DB_CONFIG {
    async validateForm(mobile_num: string) {
        const read_query = `SELECT * FROM form_submissions WHERE contact_number = $1`

        const submissionResult = await DB.query(
            read_query,
            [mobile_num]
        );

        return submissionResult[0];
    };

    async readData() {
        try {
            const submission_query = `SELECT * FROM submissions INNER JOIN form_submissions ON submissions.id = form_submissions.submission_id`
            const submissionForms = await DB.query(submission_query) as unknown as CombinedFormData[];

            return status(200, ({
                success: true,
                message: `Successfully retrieved datas.`,
                output: submissionForms
            }))
        } catch (error) {
            console.error(error)
            throw status(502, ({
                success: false,
                message: `Internal server error.`
            }))
        }
    }

    async getPaginatedData(page: number, pageSize: number) {
        const offset = (page - 1) * pageSize;
        const result = await DB.query(FORM_DB.page_reading.query, [pageSize, offset]) as CombinedFormData[];

        const countQuery = `SELECT COUNT(*) FROM submissions`;
        const countResult = await DB.query(countQuery);
        const totalCount = parseInt(countResult[0].count, 10);

        return status(200, {
            success: true,
            message: `Successfully retrieved data from backend.`,
            output: {
                data: result,
                totalCount,
                page,
                pageSize
            }
        });
    };

    async getTotalItems() {
        const countQuery = `SELECT COUNT(*) FROM submissions`;
        const countResult = await DB.query(countQuery);
        const totalCount = parseInt(countResult[0].count, 10);

        return status(200, {
            success: true,
            message: `Successfully retrieved data from backend.`,
            output: {
                totalCount
            }
        });
    }

    async getJSON() {
        try {
            const finalResults = await DB.query(FORM_DB.get_submission.query);

            const jsonString = JSON.stringify(finalResults, null, 2);
            const filePath = "./tmp/output.json"

            await Bun.write(filePath, jsonString);

            return status(200, ({
                success: true,
                message: `Successfully retrieved datas.`,
                output: filePath
            }))
        } catch (error) {
            console.error(error)
            throw status(502, ({
                success: false,
                message: `Internal server error.`
            }))
        }
    }

    async getCSV() {
        try {
            const finalResults = await DB.query(FORM_DB.get_submission.query) as CombinedFormData[];

            const CSVData = await convertCSV(finalResults);
            await Bun.write("./tmp/form_submissions.csv", CSVData);

            return CSVData;
        } catch (error) {
            console.error(error);
            throw status(502, { success: false, message: 'Internal server error.' });
        }
    }

    // async storeForm(answers: questionModel[]) {
    //     try {
    //         const newUUID = await UUIDHex();
    //         const mobileNumberObj = answers.find(q => q.questionID === 'contact-number')?.answer as unknown as string;
    //         const fullNameObj = answers.find(q => q.questionID === 'full-name')?.answer as unknown as string;
    //         const emailObj = answers.find(q => q.questionID === 'email-address')?.answer as unknown as string;
    //         const fileOjb = await uploadImage(answers.find(q => q.questionID === 'driving-license')?.answer as unknown as File);

    //         const checkDuplication = await this.validateForm(mobileNumberObj);
    //         if (checkDuplication) {
    //             return status(401, ({
    //                 success: false,
    //                 message: `You're not allowed to submit multiple form.`
    //             }))
    //         }

    //         const checkVerify = await this.isVerified(mobileNumberObj);
    //         if (!checkVerify) {
    //             return status(401, ({
    //                 success: false,
    //                 message: `You're not allowed to submit the form before verification.`
    //             }))
    //         }

    //         const submissionQuery = `
    //             INSERT INTO submissions (id, contact_number, full_name, email, form_title)
    //             VALUES ($1, $2, $3, $4, $5)
    //         `;
    //         await DB.query(submissionQuery, [newUUID, mobileNumberObj, fullNameObj, emailObj, "Lexus Test Drive Form"]);

    //         const answerQuery = `
    //             INSERT INTO answers (id, submission_id, question_text, answer_value)
    //             VALUES ($1, $2, $3, $4)
    //         `;
    //         for (const item of answers) {
    //             const answerId = await UUIDHex("hex", 4);
    //             let answerValueToStore;
    //             if (item.questionID === 'driving-license') {
    //                 answerValueToStore = fileOjb;
    //             } else {
    //                 answerValueToStore = JSON.stringify(item.answer);
    //             }

    //             await DB.query(answerQuery, [answerId, newUUID, item.questionID, answerValueToStore]);
    //         }

    //         await this.deleteOTPSession(mobileNumberObj);

    //         await DB.query(`COMMIT`);
    //         return status(200, ({
    //             success: true,
    //             message: `Successfully submitted form for ${fullNameObj}.`,
    //         }))
    //     } catch (error) {
    //         console.error(error)
    //         throw status(502, ({
    //             success: false,
    //             message: `Internal server error.`
    //         }))
    //     };
    // };

    async createSubmission(answers: FormDataState) {
        try {
            const newUUID = await UUIDHex();
            const formEntryId = await UUIDHex();

            const checkDuplication = await this.validateForm(answers.contact_number);
            const fileOjb = await uploadImage(answers.driving_license as File);

            if (checkDuplication) {
                return status(401, ({
                    success: false,
                    message: `You're not allowed to submit multiple form.`
                }))
            }

            const checkVerify = await this.isVerified(answers.contact_number);
            if (!checkVerify) {
                return status(401, ({
                    success: false,
                    message: `You're not allowed to submit the form before verification.`
                }))
            }

            const submissionQuery = `
                INSERT INTO submissions (id, contact_number, full_name, email, form_title)
                VALUES ($1, $2, $3, $4, $5)
            `;
            await DB.query(submissionQuery, [newUUID, answers.contact_number, answers.full_name, answers.email_address, "Lexus Test Drive Form"]);

            const insert_query = FORM_DB.insert_submission.query;
            const values = [
                formEntryId,
                newUUID,
                answers.full_name,
                answers.contact_number,
                answers.email_address,
                answers.gender,
                answers.age_range,
                answers.monthly_income,
                answers.assigned_sales_consultant,
                JSON.stringify(answers.interested_car_model),
                answers.test_drive_preference,
                answers.license_expiry_date,
                fileOjb
            ];
            await DB.query(insert_query, values);
            await this.deleteOTPSession(answers.contact_number);

            await DB.query(`COMMIT`);
            return status(200, ({
                success: true,
                message: `Successfully submitted form for ${answers.full_name}.`,
            }))
        } catch (error) {
            console.error(error)
            throw status(502, ({
                success: false,
                message: `Internal server error.`
            }))
        };
    };

    async isVerified(mobile_num: string): Promise<boolean | undefined> {
        const query = `SELECT (is_verified) FROM otp_verifications WHERE contact_number = ($1) LIMIT 1`;
        try {
            const verification = await DB.query(query, [mobile_num]) as unknown as isVerified[];
            return verification[0].is_verified;
        } catch (error) {
            console.error(error)
            throw status(502, ({
                success: false,
                message: `Internal server error.`
            }))
        }
    };

    async deleteOTPSession(mobile_num: string): Promise<void> {
        const query = `DELETE FROM otp_verifications WHERE contact_number = $1`;
        try {
            await DB.query(query, [mobile_num]);
            await DB.query(`COMMIT`);
        } catch (error) {
            console.error(error)
            throw status(502, ({
                success: false,
                message: `Internal server error.`
            }))
        }
    };
}   
