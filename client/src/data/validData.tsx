import type { FormErrors } from "../pages/home";
import type { FormDataState } from "../types/types";

interface formData {
    formData: FormDataState,
    setErrors: React.Dispatch<React.SetStateAction<FormErrors>>;
}

  export const validateForm = ({formData, setErrors}:formData): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.full_name)
      newErrors.full_name = "Please enter your full name";
    if (!/^\+?[1-9]\d{7,14}$/.test(formData.contact_number.replace(/\s/g, "")))
      newErrors.contact_number = "Please enter a valid contact number";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email_address))
      newErrors.email_address = "Please enter a valid email_address address";
    if (!formData.gender) newErrors.gender = "Please select your gender";
    if (!formData.age_range)
      newErrors.age_range = "Please select your age range";
    if (!formData.monthly_income)
      newErrors.monthly_income = "Please select your monthly income";
    if (!formData.assigned_sales_consultant)
      newErrors.assigned_sales_consultant =
        "Please enter your sales assigned_sales_consultant's name";
    if (formData.interested_car_model.length === 0)
      newErrors.interested_car_model = "Please select at least one car model";
    if (!formData.test_drive_preference)
      newErrors.test_drive_preference = "Please select your choice";
    if (!formData.license_expiry_date)
      newErrors.license_expiry_date = "Please select a test drive date";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };