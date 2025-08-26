import * as React from "react";

interface OtpInputProps {
  otp: string[];
  setOtp: (otp: string[]) => void;
  isDisabled: boolean;
  hasError: boolean;
}

const OtpInput: React.FC<OtpInputProps> = ({
  otp,
  setOtp,
  isDisabled,
  hasError,
}) => {
  const inputsRef = React.useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  // Inverted colors: white to black, black to white
  const baseClasses = "w-11 h-11 text-center text-xl font-semibold border-2 rounded-lg transition-colors focus:outline-none text-white bg-black";
  const defaultClasses = "border-white focus:border-gray-300";
  const errorClasses = "border-red-500 bg-red-900";
  const disabledClasses = "bg-gray-800 text-gray-500 cursor-not-allowed";

  return (
    <div className="flex justify-center gap-2">
      {otp.map((value, index) => (
        <input
          key={index}
          ref={(el) => {
            inputsRef.current[index] = el;
          }}
          type="number"
          maxLength={1}
          value={value}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          disabled={isDisabled}
          className={`${baseClasses} ${
            isDisabled
              ? disabledClasses
              : hasError
              ? errorClasses
              : defaultClasses
          }`}
        />
      ))}
    </div>
  );
};

export default OtpInput;

