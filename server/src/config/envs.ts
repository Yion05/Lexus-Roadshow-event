import { S3Client } from "bun";
import { Bulk360_Res } from "../types/types";

export const CipherConfig = {
    bcrypt_cipher: Bun.env.CIPHER_KEY as string,
    jwt_key: Bun.env.JWT_SESSION as string
};

export const DatabaseConfig = {
    db_api: async function (): Promise<string> {
        if (!Bun.env.DATABASE_KEY) {
            console.warn(`Database unavailable due to missing database key.`)
        };
        return Bun.env.DATABASE_KEY as string
    },
};

export const ServerConfig = {
    server_port: Bun.env.PORT as string ?? 8080,
    frontend_url: JSON.parse(Bun.env.FRONTEND_URL as string) as string[],
    version: Bun.env.API_VERSION ?? 1
};

export const BucketConfig = {
    accessKeyId: Bun.env.DO_ACCESS_KEY_ID as string,
    secretAccessKey: Bun.env.DO_SECRET_ACCESS_KEY as string,
    bucket: Bun.env.DO_BUCKET as string,
    region: Bun.env.DO_REGION as string,
    endpoint: Bun.env.ENDPOINT as string,
    S3: function () {
        if (!this.accessKeyId && this.secretAccessKey && !this.bucket && !this.region && !this.endpoint) {
            console.warn("Space Bucket is not properly set up in .env");
        }
        const s3 = new S3Client({
            accessKeyId: this.accessKeyId,
            secretAccessKey: this.secretAccessKey,
            bucket: this.bucket,
            region: this.region,
            endpoint: this.endpoint,
        });
        return s3;
    }
};

export const SMSConfig = {
    api_key: Bun.env.API_KEY,
    api_secret: Bun.env.API_SECRET,
    sendSMS: async function (to: string, message: string) {
        const url = `https://sms.360.my/gw/bulk360/v3_0/send.php?user=${this.api_key}&pass=${this.api_secret}&to=${to}&from=60323&text=${message}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                const errorText = response.text();
                console.error(`SMS API HTTP Error: ${response.status} - ${errorText}`);
                return false
            };

            const apiResponse: Bulk360_Res = await response.json();
            if (apiResponse.desc === "OK") {
                console.log("SMS sent successfully.");
                return true;
            }
            else {
                console.error(`SMS API Error: ${apiResponse.desc}`);
                return false;
            };
        } catch (error) {
            console.error(`Error sending SMS: ${error}`);
            throw error;
        };
    }
};

