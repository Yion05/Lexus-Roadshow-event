const baseURL = import.meta.env.VITE_BACKEND_URL as string;

export const summaryAPI = {
    sendData: {
        url: "form"
    },
    sendOTP: {
        url: "otp/send-otp"
    },
    validOTP: {
        url: "otp/verify-otp"
    },
}

export default baseURL;