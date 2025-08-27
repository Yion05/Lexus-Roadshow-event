import React, { useState, useEffect } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import Modal from "../components/modal";
import OtpInput from "../components/otpInput";
import { form_submit, send_otp, validate_otp } from "../data/submitForm";
import type { FormDataState } from "../types/types";

export type FormErrors = {
  [key in keyof Omit<FormDataState, "file">]?: string;
};

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormDataState>({
    full_name: "",
    contact_number: "",
    email_address: "",
    gender: "",
    age_range: "",
    monthly_income: "",
    assigned_sales_consultant: "",
    interested_car_model: [],
    test_drive_preference: "false",
    license_expiry_date: "",
    driving_license: null,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [fileName, setFileName] = useState("No file chosen");

  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [isOtpRequested, setIsOtpRequested] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [otpError, setOtpError] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const showAlert = (message: string) => {
    setModalMessage(message);
    setIsModalOpen(true);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      const updatedCarModels = checked
        ? [...prev.interested_car_model, value]
        : prev.interested_car_model.filter((model) => model !== value);
      return { ...prev, interested_car_model: updatedCarModels };
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const driving_license = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, driving_license }));
    setFileName(driving_license ? driving_license.name : "No file chosen");
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.full_name)
      newErrors.full_name = "Please enter your full name";
    if (!/^\+?[1-9]\d{7,14}$/.test(formData.contact_number.replace(/\s/g, "")))
      newErrors.contact_number = "Please enter a valid contact number";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email_address))
      newErrors.email_address = "Please enter a valid email address";
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRequestOtp = () => {
    send_otp(validateForm(), showAlert, formData.contact_number, setOtpError, setIsOtpRequested);
  };

  const handleVerifyOtp = () => {
    validate_otp(validateForm(), showAlert, formData.contact_number, otp, setOtpError, setIsOtpVerified)
  };

  const resetFormState = () => {
    setFormData({
      full_name: "",
      contact_number: "",
      email_address: "",
      gender: "",
      age_range: "",
      monthly_income: "",
      assigned_sales_consultant: "",
      interested_car_model: [],
      test_drive_preference: "",
      license_expiry_date: "",
      driving_license: null,
    });
    setFileName("No file chosen");
    setErrors({});
    setOtp(Array(6).fill(""));
    setIsOtpRequested(false);
    setIsOtpVerified(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isOtpVerified) {
      showAlert("Please verify your OTP before submitting.");
      return;
    }

    if (!validateForm()) {
      showAlert(
        "Please fill in all required fields correctly before submitting."
      );
      return;
    }

    try {
      const message = await form_submit(formData, resetFormState);
      showAlert(message);
    } catch (error) {
      showAlert("An error occurred during submission. Please try again.");
    }
  };

  const isOtpFilled = otp.every((digit) => digit !== "");
  const allCarModels = [
    "LBX - Subcompact Crossover",
    "NX - Luxury Mid-size SUV",
    "RX - Luxury Large SUV",
    "RZ - All-electric Luxury SUV",
    "ES - Luxury Sedan",
  ];

  const formContainerClasses = `
    w-full max-w-3xl text-left text-white bg-blac rounded-2xl shadow-2xl p-8 my-24
    transition-all duration-500 ease-in-out z-20 relative shadow-white hover:translate-y-2
    shadow-xl hover:shadow-2xl
    ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}
  `;

  const inputClasses = (name: keyof FormErrors) =>
    `w-full p-3.5 border-2 rounded-lg text-base transition-colors focus:outline-none focus:border-white text-white bg-[#222222] ${
      errors[name] ? "border-red-500 bg-red-900 text-white" : "border-white"
    }`;

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message={modalMessage}
      />
      <div className={formContainerClasses}>
        <h2 className="text-center text-3xl font-bold text-white mb-6">
          LEXUS ROADSHOW
        </h2>
        <p className="text-justify text-white mb-6">
          The Malaysia Personal Data Protection Act has taken place effective 15
          November 2013. By filling out this form, you consent to the use of
          your personal information by UMW Toyota Motor Sdn Bhd for marketing
          communications.
          <br />
          <br />
          Please take a clear photo of the front and back of your driver's
          license.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-6 pb-4 border-b border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">
              Personal Information
            </h3>
            <div className="flex flex-col gap-x-6 gap-y-5">
              <div className="form-group">
                <label
                  htmlFor="full_name"
                  className="block mb-2 font-semibold text-white"
                >
                  Full Name (As per NRIC) *
                </label>
                <input
                  type="text"
                  id="full_name"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your full name"
                  className={inputClasses("full_name")}
                />
                {errors.full_name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.full_name}
                  </p>
                )}
              </div>
              <div className="form-group">
                <label
                  htmlFor="contact_number"
                  className="block mb-2 font-semibold text-white"
                >
                  Contact Number *
                </label>
                <input
                  type="tel"
                  id="contact_number"
                  name="contact_number"
                  value={formData.contact_number}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your phone number (e.g: 6012345678900)"
                  className={inputClasses("contact_number")}
                />
                {errors.contact_number && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.contact_number}
                  </p>
                )}
              </div>
              <div className="form-group">
                <label
                  htmlFor="email_address"
                  className="block mb-2 font-semibold text-white"
                >
                  Email Address *
                </label>
                <input
                  type="email_address"
                  id="email_address"
                  name="email_address"
                  value={formData.email_address}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your email address"
                  className={inputClasses("email_address")}
                />
                {errors.email_address && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email_address}
                  </p>
                )}
              </div>
              <div className="form-group">
                <label
                  htmlFor="gender"
                  className="block mb-2 font-semibold text-white"
                >
                  Gender *
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                  className={inputClasses("gender")}
                >
                  <option className="text-white bg-[#222222]" value="">Select your gender</option>
                  <option className="text-white bg-[#222222]" value="Male">Male</option>
                  <option className="text-white bg-[#222222]" value="Female">Female</option>
                </select>
                {errors.gender && (
                  <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
                )}
              </div>
              <div className="form-group">
                <label
                  htmlFor="age_range"
                  className="block mb-2 font-semibold text-white"
                >
                  Age Range *
                </label>
                <select
                  id="age_range"
                  name="age_range"
                  value={formData.age_range}
                  onChange={handleInputChange}
                  required
                  className={inputClasses("age_range")}
                >
                  <option className="text-white bg-[#222222]" value="">Select your age range</option>
                  <option className="text-white bg-[#222222]" value="18-24">18-24</option>
                  <option className="text-white bg-[#222222]" value="25-34">25-34</option>
                  <option className="text-white bg-[#222222]" value="35-44">35-44</option>
                  <option className="text-white bg-[#222222]" value="45-54">45-54</option>
                  <option className="text-white bg-[#222222]" value="55-64">55-64</option>
                  <option className="text-white bg-[#222222]" value="65+">65+</option>
                </select>
                {errors.age_range && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.age_range}
                  </p>
                )}
              </div>
              <div className="form-group">
                <label
                  htmlFor="monthly_income"
                  className="block mb-2 font-semibold text-white"
                >
                  Monthly Income *
                </label>
                <select
                  id="monthly_income"
                  name="monthly_income"
                  value={formData.monthly_income}
                  onChange={handleInputChange}
                  required
                  className={inputClasses("monthly_income")}
                >
                  <option className="text-white bg-[#222222]" value="">Select your monthly income</option>
                  <option className="text-white bg-[#222222]" value="under-2500">Under RM2,500</option>
                  <option className="text-white bg-[#222222]" value="2500-5000">RM2,501 - RM5,000</option>
                  <option className="text-white bg-[#222222]" value="5000-7500">RM5,001 - RM7,500</option>
                  <option className="text-white bg-[#222222]" value="7500-10000">RM7,501 - RM10,000</option>
                  <option className="text-white bg-[#222222]" value="10000-15000">RM10,001 - RM15,000</option>
                  <option className="text-white bg-[#222222]" value="15000-20000">RM15,001 - RM20,000</option>
                  <option className="text-white bg-[#222222]" value="over-20000">Over RM20,001</option>
                </select>
                {errors.monthly_income && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.monthly_income}
                  </p>
                )}
              </div>
              <div className="form-group">
                <label
                  htmlFor="assigned_sales_consultant"
                  className="block mb-2 font-semibold text-white"
                >
                  Who is your assigned sales assigned_sales_consultant? *
                </label>
                <select
                  id="assigned_sales_consultant"
                  name="assigned_sales_consultant"
                  value={formData.assigned_sales_consultant}
                  onChange={handleInputChange}
                  required
                  className={inputClasses("assigned_sales_consultant")}
                >
                  <option className="text-white bg-[#222222]" value="">
                    Select here
                  </option>
                  <option
                    className="text-white bg-[#222222]"
                    value="Chan Li Ying"
                  >
                    Chan Li Ying
                  </option>
                  <option
                    className="text-white bg-[#222222]"
                    value="Husainuddin Bin Yaakub"
                  >
                    Husainuddin Bin Yaakub
                  </option>
                  <option
                    className="text-white bg-[#222222]"
                    value="Muhammad Azrawadi Bin Nor Aazmi"
                  >
                    Muhammad Azrawadi Bin Nor Aazmi
                  </option>
                  <option
                    className="text-white bg-[#222222]"
                    value="Daphne Soo"
                  >
                    Daphne Soo
                  </option>
                  <option
                    className="text-white bg-[#222222]"
                    value="⁠May Tan Lee Nian"
                  >
                    ⁠May Tan Lee Nian
                  </option>
                </select>
                {errors.assigned_sales_consultant && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.assigned_sales_consultant}
                  </p>
                )}
              </div>
            </div>

          <div className="mb-6 pb-4 border-b border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">
              Vehicle Information
            </h3>
            <div className="flex flex-col gap-x-6 gap-y-5">
              <div className="md:col-span-2">
                <label className="block mb-2 font-semibold text-white">
                  Which of the following car model you are interested in? *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-2">
                  {allCarModels.map(
                    (
                      model 
                    ) => (
                      <div key={model} className="flex items-center">
                        <input
                          type="checkbox"
                          id={model}
                          name="carModel"
                          value={model}
                          checked={formData.interested_car_model.includes(
                            model
                          )}
                          onChange={handleCheckboxChange}
                          className="w-4 h-4 text-black bg-white border-white rounded focus:ring-black"
                        />
                        <label
                          htmlFor={model}
                          className="ml-3 text-sm font-medium text-white"
                        >
                          {model}
                        </label>
                      </div>
                    )
                  )}
                </div>
                {errors.interested_car_model && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.interested_car_model}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label
                  htmlFor="test_drive_preference"
                  className="block mb-2 font-semibold text-white"
                >
                  Would you like to test drive the vehicle? *
                </label>
                <select
                  id="test_drive_preference"
                  name="test_drive_preference"
                  value={formData.test_drive_preference}
                  onChange={handleInputChange}
                  required
                  className={inputClasses("test_drive_preference")}
                >
                  <option className="text-white bg-[#222222]" value="">Select your choice</option>
                  <option className="text-white bg-[#222222]" value="true">Yes</option>
                  <option className="text-white bg-[#222222]" value="false">No</option>
                </select>
                {errors.test_drive_preference && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.test_drive_preference}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label
                  htmlFor="license_expiry_date"
                  className="block mb-2 font-semibold text-white"
                >
                  Driving License Expiry Date
                </label>
                <input
                  type="date"
                  id="license_expiry_date"
                  name="license_expiry_date"
                  value={formData.license_expiry_date}
                  onChange={handleInputChange}
                  required
                  className={inputClasses("license_expiry_date")}
                />
                {errors.license_expiry_date && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.license_expiry_date}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block mb-2 font-semibold text-white">
                  Driving License
                </label>
                <p className="text-sm text-gray-400">
                  Upload 1 supported file. Max 10 MB.
                </p>
                <div className="relative mt-2">
                  <label
                    htmlFor="driving_license"
                    className="flex items-center justify-center w-full px-4 py-3 text-black bg-white border-2 border-white border-dashed rounded-lg cursor-pointer hover:bg-gray-200"
                  >
                    <FaCloudUploadAlt className="mr-2" /> Choose File
                  </label>
                  <input
                    required
                    type="file"
                    id="driving_license"
                    name="driving_license"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                  />
                </div>
                <div className="mt-2 text-sm text-gray-400">{fileName}</div>
              </div>
            </div>
          </div>

          <div className="mb-6 pb-4 border-b border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4 text-center">
              SMS OTP Verification
            </h3>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full mt-2">
              <button
                type="button"
                onClick={handleRequestOtp}
                disabled={isOtpRequested}
                className="w-full md:w-auto px-6 py-3 text-black bg-white rounded-lg font-semibold transition-opacity disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isOtpRequested ? "OTP Sent" : "Request OTP"}
              </button>
              <div className="flex-grow">
                <OtpInput
                  otp={otp}
                  setOtp={setOtp}
                  isDisabled={!isOtpRequested || isOtpVerified}
                  hasError={otpError}
                />
              </div>
            </div>
            {isOtpRequested && !isOtpVerified && (
              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  disabled={!isOtpFilled}
                  className="w-full md:w-auto px-6 py-3 text-black bg-white rounded-lg font-semibold transition-opacity disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Verify OTP
                </button>
                <p className="mt-2 text-sm text-gray-400">
                  Please enter the 6-digit code sent to your phone.
                </p>
                {otpError && (
                  <p className="text-red-500 text-sm mt-1">
                    The OTP entered is incorrect.
                  </p>
                )}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={!isOtpVerified}
            className="w-full p-4 text-lg font-semibold text-black bg-white rounded-lg cursor-pointer transition-all hover:bg-gray-300 hover:scale-105 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Submit Registration
          </button>

          <div className="mt-5 text-sm text-center text-gray-400">
            By submitting this form, you agree to our Terms and Privacy Policy
          </div>
         </div>
        </form>
      </div>
    </>
  );
};


export default RegistrationForm;

