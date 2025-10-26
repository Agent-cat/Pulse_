import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { setToken, setUser } from "../utils/auth";
import ErrorPopup from "../Components/ErrorPopup";
import GenericPopup from "../Components/GenericPopup";

const Register = () => {
  const url = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    bloodGroup: "",
    collegeId: "",
    image: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const MAX_IMAGE_SIZE = 2 * 1024 * 1024;
  const totalSteps = 3;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSendOTP = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setOtpError(null);

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error("Please enter a valid email address");
      }

      console.log("Sending OTP request for:", formData.email);

      const response = await fetch(`${url}/api/users/send-verification-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await response.json();

      console.log("Server response:", data);

      if (!response.ok) {
        throw new Error(data.error || "Failed to send OTP");
      }

      setShowOTPInput(true);
      setError(null);
    } catch (error) {
      console.error("Error sending OTP:", error);
      setError(error.message || "Failed to send OTP. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    try {
      setIsLoading(true);
      setOtpError(null);

      const response = await fetch(`${url}/api/users/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          otp: otp,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      setIsEmailVerified(true);
      setShowOTPInput(false);
    } catch (error) {
      setOtpError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > MAX_IMAGE_SIZE) {
        setError("Image size should not exceed 2MB.");
        setShowPopup(true);
        return;
      }
      setFormData({ ...formData, image: file });
    }
  };

  const nextStep = () => {
    if (currentStep === 1 && !isEmailVerified) {
      setError("Please verify your email before proceeding.");
      return;
    }
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.password ||
      !formData.collegeId ||
      !formData.phoneNumber ||
      !formData.bloodGroup
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!isEmailVerified) {
      setError("Please verify your email first.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${url}/api/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
        }),
      });

      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      setToken(data.token);
      setUser({
        fullName: data.fullName,
        email: data.email,
        role: data.role,
        collegeId: data.collegeId,
      });
      navigate("/");
    } catch (error) {
      setError(error.message || "An error occurred during registration.");
      setShowPopup(true);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <label htmlFor="fullName" className="block text-white mb-2 font-mono">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-black border border-emerald-500/30 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all duration-300"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-white mb-2 font-mono">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-black border border-emerald-500/30 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all duration-300"
                required
                disabled={isLoading || isEmailVerified}
              />
              <p className="text-sm text-white/80 mt-1 font-sans">
                Note: Students should use their official university Email.
              </p>
            </div>

            {!isEmailVerified && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSendOTP}
                  disabled={isLoading || !formData.email || isEmailVerified}
                  className={`px-4 py-2 text-sm rounded bg-emerald-500 text-black hover:bg-emerald-400 transition-colors font-mono font-semibold ${
                    isLoading || !formData.email || isEmailVerified
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {isLoading ? "Sending..." : "Verify Email"}
                </button>
              </div>
            )}

            {showOTPInput && (
              <div className="mt-4">
                <label htmlFor="otp" className="block text-white mb-2 font-mono">
                  Enter OTP
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    id="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full px-4 py-2 rounded bg-black border border-emerald-500/30 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all duration-300"
                    placeholder="Enter 6-digit OTP"
                    maxLength="6"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={handleVerifyOTP}
                    disabled={isLoading || otp.length !== 6}
                    className={`px-4 py-2 rounded bg-emerald-500 text-black hover:bg-emerald-400 transition-colors font-mono font-semibold ${
                      isLoading || otp.length !== 6
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    {isLoading ? "Verifying..." : "Verify"}
                  </button>
                </div>
                {otpError && (
                  <p className="text-red-500 text-sm mt-1 font-sans">{otpError}</p>
                )}
              </div>
            )}

            {isEmailVerified && (
              <span className="text-emerald-400 text-sm font-sans flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Email Verified
              </span>
            )}
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <label htmlFor="password" className="block text-white mb-2 font-mono">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-black border border-emerald-500/30 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all duration-300"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="collegeId" className="block text-white mb-2 font-mono">
                College ID
              </label>
              <input
                type="text"
                id="collegeId"
                name="collegeId"
                value={formData.collegeId}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-black border border-emerald-500/30 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all duration-300"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-white mb-2 font-mono">
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-black border border-emerald-500/30 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all duration-300"
                required
                pattern="^\+?[\d\s-]{10,15}$"
                placeholder="Enter your phone number"
                disabled={isLoading}
              />
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <label htmlFor="bloodGroup" className="block text-white mb-2 font-mono">
                Blood Group <span className="text-emerald-400">*</span>
              </label>
              <select
                id="bloodGroup"
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-black border border-emerald-500/30 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all duration-300"
                required
                disabled={isLoading}
              >
                <option value="">Select Blood Type</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>

            <div>
              <label htmlFor="image" className="block text-white mb-2 font-mono">
                Profile Image (Optional)
              </label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleImageChange}
                accept="image/*"
                className="w-full px-4 py-2 rounded bg-black border border-emerald-500/30 text-white focus:outline-none focus:border-emerald-500 transition-all duration-300 file:bg-emerald-500 file:border-none file:text-black file:px-4 file:py-1 file:rounded file:mr-4 file:font-semibold"
                disabled={isLoading}
              />
              <p className="text-sm text-white/60 mt-1 font-sans">
                Maximum file size: 2MB
              </p>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {error && <ErrorPopup message={error} onClose={() => setError(null)} />}
      {showPopup && (
        <GenericPopup message={error} onClose={() => setShowPopup(false)} />
      )}
      <div className="min-h-screen bg-black flex">
        {/* Left Side - Image/Animation */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <motion.div
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full mix-blend-lighten filter blur-3xl opacity-40 animate-pulse"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 10, ease: "easeInOut" }}
            ></motion.div>
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-400/20 rounded-full mix-blend-lighten filter blur-3xl opacity-40 animate-pulse-slow"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 10, ease: "easeInOut", delay: 2 }}
            ></motion.div>
          </div>
          <div className="relative left-20 z-10 flex flex-col items-center justify-center w-full p-12">
            <motion.img
              src="/img/pulse-logo.png"
              alt="Pulse Logo"
              className="w-96 h-auto mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            />
            <motion.h1
              className="text-4xl font-robert-medium  font-bold text-white text-center mb-4 tracking-widest"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              JOIN US
            </motion.h1>
            <motion.p
              className="text-white/70 text-center text-lg font-sans"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Create your account and start your journey with Pulse Family
            </motion.p>
          </div>
        </div>

        {/* Right Side - Register Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-12 py-8 relative overflow-y-auto">
          <div className="absolute inset-0 z-0 overflow-hidden lg:hidden">
            <motion.div
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full mix-blend-lighten filter blur-3xl opacity-40 animate-pulse"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 10, ease: "easeInOut" }}
            ></motion.div>
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-400/20 rounded-full mix-blend-lighten filter blur-3xl opacity-40 animate-pulse-slow"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 10, ease: "easeInOut", delay: 2 }}
            ></motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="register-container bg-white/5 p-8 rounded-lg backdrop-blur-sm w-full max-w-md relative z-20 shadow-lg border border-emerald-500/30 my-8"
          >
          <h2 className="text-3xl font-saint-carell text-white text-center mb-2 tracking-widest uppercase">
            Register
          </h2>

          {/* Step Indicator */}
          <div className="flex justify-center items-center gap-2 mb-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold transition-all duration-300 ${
                    currentStep === step
                      ? "bg-emerald-500 text-black scale-110"
                      : currentStep > step
                      ? "bg-emerald-500/50 text-white"
                      : "bg-white/10 text-white/50"
                  }`}
                >
                  {currentStep > step ? (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    step
                  )}
                </div>
                {step < 3 && (
                  <div
                    className={`w-12 h-1 mx-1 transition-all duration-300 ${
                      currentStep > step ? "bg-emerald-500" : "bg-white/10"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              {renderStep()}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex gap-4 pt-4">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex-1 bg-white/10 text-white py-3 rounded-lg font-mono font-semibold hover:bg-white/20 transition-all duration-300"
                >
                  Previous
                </button>
              )}
              
              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex-1 bg-emerald-500 text-black py-3 rounded-lg font-mono font-semibold hover:bg-emerald-400 transition-all duration-300"
                >
                  Next
                </button>
              ) : (
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex-1 bg-emerald-500 text-black py-3 rounded-lg font-mono font-bold hover:bg-emerald-400 transition-all duration-300 ${
                    isLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </motion.button>
              )}
            </div>
          </form>

          <p className="text-white/60 text-center mt-6 font-sans text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-emerald-400 hover:text-emerald-300 font-semibold">
              Login here
            </Link>
          </p>
        </motion.div>
        </div>
      </div>
    </>
  );
};

export default Register;
