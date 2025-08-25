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
    // Allow only numeric input
    if (value && !/^\d*$/.test(value)) {
        return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to the next input if a number is entered
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // Move to the previous input on backspace if the current input is empty
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  // Inverted colors: white to black, black to white
  const baseClasses = "w-11 h-11 text-center text-xl font-semibold border-2 rounded-lg transition-colors focus:outline-none text-white bg-black";
  const defaultClasses = "border-white focus:border-black";
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
          // --- CHANGES START HERE ---
          // Use "tel" type to encourage a numeric keyboard on mobile devices.
          type="tel"
          // Explicitly set the input mode to "numeric" for better cross-device compatibility.
          inputMode="numeric"
          // Add a pattern to further reinforce that only numbers are allowed.
          pattern="[0-9]*"
          // --- CHANGES END HERE ---
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

// You would typically have a parent component to manage the state.
// Here is an example of how to use the OtpInput component.
const App = () => {
    const [otp, setOtp] = React.useState<string[]>(new Array(6).fill(""));
    const [isDisabled, setIsDisabled] = React.useState(false);
    const [hasError, setHasError] = React.useState(false);

    const handleSubmit = () => {
        const otpValue = otp.join("");
        alert(`Submitting OTP: ${otpValue}`);
        // Add your submission logic here
        // For demonstration, let's simulate an error
        if (otpValue !== "123456") {
            setHasError(true);
            setTimeout(() => setHasError(false), 2000); // Clear error after 2s
        }
    };
    
    return (
        <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center font-sans p-4">
            <div className="w-full max-w-md text-center">
                <h1 className="text-3xl font-bold mb-2">Enter Verification Code</h1>
                <p className="text-gray-400 mb-8">A 6-digit code has been sent to your device.</p>
                <OtpInput 
                    otp={otp} 
                    setOtp={setOtp} 
                    isDisabled={isDisabled}
                    hasError={hasError}
                />
                <button 
                    onClick={handleSubmit}
                    disabled={otp.join("").length < 6}
                    className="w-full mt-8 bg-white text-black font-bold py-3 px-4 rounded-lg disabled:bg-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                    Verify
                </button>
            </div>
        </div>
    );
}


export default App;
