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

export type answerSchema = string | boolean | number | File | gender | numRange | carModel | carModel[] | Date

export interface questionModel {
    questionID: string,
    answer: answerSchema,
}

export interface questionLinker {
    question: string,
    answer: answerSchema,
}

export interface otpSchema {
    otp_hash: string,
    expires_at: Date,
}

export interface isVerified {
    is_verified: boolean
}
export interface submissionForm {
    id: string,
    contact_number: string,
    full_name: string,
    email: string,
    form_title: string,
    submitted_at: string,
};
export interface formAnswerList {
    id: string,
    submission_id: string,
    question_text: string,
    answer_value: answerSchema,
    form_title: string,
};

export interface formDataModel extends submissionForm {
    answer_detail?: formAnswerList[]
}

export interface admin_user {
    id: string
    username: string,
    email: string,
}

export interface admin_auth_check {
    id: string,
    username: string,
    email: string,
    password_hash: string,
    isactive: boolean,
}

export interface adminUser {
    username: string,
    email: string,
    password: string,
}

export interface adminLogin {
    username: string,
    password: string,
}

export interface Bulk360_Res {
    code: number,
    desc: "Invalid Username or password" | "OK",
    to?: string,
    ref?: string
}

export type FormDataState = {
  full_name: string;
  contact_number: string;
  email_address: string;
  gender: string;
  age_range: string;
  monthly_income: string;
  assigned_sales_consultant: string;
  interested_car_model: string[];
  test_drive_preference: boolean;
  license_expiry_date: string;
  driving_license: File;
};

export interface CombinedFormData {
  id: string;
  submission_id: string;
  full_name: string;
  contact_number: string;
  email_address: string;
  gender: string;
  age_range: string;
  monthly_income: string;
  assigned_sales_consultant: string;
  interested_car_model: string[];
  test_drive_preference: boolean;
  license_expiry_date: string;
  driving_license: string;
  form_title: string;
  submitted_at: Date;

  [key: string]: any;
}