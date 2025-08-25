import axios from "axios";
import type { apiResponse, FormDataState } from "../types/types";
import baseURL, { summaryAPI } from "../api/summary.api";

export const form_submit = async (
  formData: FormDataState,
  resetForm: () => void
) => {
  try {
    const dataSend = new FormData();

    for (const key in formData) {
      const value = formData[key as keyof FormDataState];

      if (key === "driving_license" && value instanceof File) {
        dataSend.append(key, value);
      } else if (key === "interested_car_model" && Array.isArray(value)) {
        dataSend.append(key, JSON.stringify(value));
      } else if (key === "test_drive_preference" && typeof value === "string") {
        dataSend.append(key, JSON.stringify(value === "true"));
      } else if (key === "license_expiry_date" && typeof value === "string") {
        dataSend.append(key, JSON.stringify(new Date(value)));
      } else if (value !== null && value !== undefined) {
        dataSend.append(key, String(value));
      }
    }

    const response = await axios.post<apiResponse<unknown>>(
      `${baseURL}/${summaryAPI.sendData.url}`,
      dataSend,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (response.data.success) {
      resetForm();
      return "Thank you for registering for the LEXUS ROADSHOW!";
    } else {
      return "Something went wrong in uploading.";
    }
  } catch (error) {
    throw error;
  }
};

export const send_otp = async (
  validateForm: boolean,
  showAlert: (message: string) => void,
  mobile: string,
  setOtpError: React.Dispatch<React.SetStateAction<boolean>>,
  setIsOtpRequested: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (validateForm) {
    const response = await axios.post<apiResponse<unknown>>(
      `${baseURL}/${summaryAPI.sendOTP.url}`,
      {
        mobile_num: mobile,
      }
    );
    if (response.data.success) {
      showAlert(response.data.message);
      setIsOtpRequested(true);
      setOtpError(false);
    } else {
      showAlert(response.data.message);
      setIsOtpRequested(false);
      setOtpError(true);
    }
  } else {
    showAlert(`Please fill in the form first.`);
    setIsOtpRequested(false);
    setOtpError(true);
  }
};

export const validate_otp = async (
  validateForm: boolean,
  showAlert: (message: string) => void,
  mobile: string,
  otp: string[],
  setOtpError: React.Dispatch<React.SetStateAction<boolean>>,
  setIsOtpVerified: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (validateForm) {
    const response = await axios.post<apiResponse<unknown>>(
      `${baseURL}/${summaryAPI.validOTP.url}`,
      {
        mobile_num: mobile,
        otp_num: otp,
      }
    );
    if (response.data.success) {
      showAlert(response.data.message);
      setIsOtpVerified(true);
      setOtpError(false);
    } else {
      showAlert(response.data.message);
      setIsOtpVerified(false);
      setOtpError(true);
    }
  } else {
    showAlert(`Please fill in the form first.`);
    setIsOtpVerified(false);
    setOtpError(true);
  }
};
