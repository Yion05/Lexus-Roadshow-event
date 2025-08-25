export interface LoginData {
    username: string,
    password: string,
}

export interface APIResponse<T>{
    success: boolean,
    message: string,
    output?: T,
}

export interface isAuth {
    isAuth: true,
}

export interface totalCount {
    totalCount: number,
}


export interface CombinedFormData {
  id: string;
  submission_id: string;
  full_name: string;
  contact_number: string;
  email: string;
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

export interface paginationData {
    data: CombinedFormData[],
    totalCount: number,
    page: number,
    pageSize: number
}