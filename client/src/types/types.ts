export type FormData = {
    fullName: string;
    contactNumber: string;
    email: string;
    gender: string;
    ageRange: string;
    monthlyIncome: string;
    consultant: string;
    carModels: string[];
    testDrive: string;
    drivingLicenseExpiryDate: string;
    file: File | null;
};

export type FormDataState = {
  full_name: string;
  contact_number: string;
  email_address: string;
  gender: string;
  age_range: string;
  monthly_income: string;
  assigned_sales_consultant: string;
  interested_car_model: string[];
  test_drive_preference: string;
  license_expiry_date: string;
  driving_license: File | null;
};

export type questionID = "full-name" |
    "interested-car-model" |
    "age-range" |
    "gender" |
    "email-address" |
    "license-expiry-date"|
    "contact-number" |
    "assigned-sales-consultant" |
    "test-drive-preference" |
    "driving-license" | "monthly-income"; 

export type gender = "Male" | "Female" | "Other" | "Prefer not to say";

export type numRange = {
    minNum: number,
    maxNum: number
};

export type carModel = "LBX - Subcompact Crossover" |
    "NX - Luxury Mid-size SUV" |
    "RX - Luxury Large SUV" |
    "RZ - All-electric Luxury SUV" |
    "ES - Luxury Sedan"

export type answerSchema = string | boolean | number | File | gender | numRange | carModel[] | Date

export interface questionModel {
    questionID: questionID,
    answer: answerSchema,
}

export interface apiResponse<T> {
    success: boolean,
    message: string,
    output: T
}