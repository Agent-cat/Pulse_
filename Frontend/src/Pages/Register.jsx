import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { setToken, setUser } from "../utils/auth";
import ErrorPopup from "../Components/ErrorPopup";
import GenericPopup from "../Components/GenericPopup";

const Register = () => {
  const url = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "2300031042@kluniversity.in",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    bloodGroup: "",
    collegeId: "",
    image: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEmailVerified, setIsEmailVerified] = useState(true);
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const MAX_IMAGE_SIZE = 2 * 1024 * 1024;

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

  return (
    <>
      {error && <ErrorPopup message={error} onClose={() => setError(null)} />}
      {showPopup && (
        <GenericPopup message={error} onClose={() => setShowPopup(false)} />
      )}
      <div className="min-h-screen bg-black flex items-center justify-center px-4 py-8 relative">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-gray-800 rounded-full mix-blend-lighten filter blur-3xl opacity-30 animate-pulse"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "easeInOut" }}
          ></motion.div>
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/10 rounded-full mix-blend-lighten filter blur-3xl opacity-30 animate-pulse-slow"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "easeInOut", delay: 2 }}
          ></motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="register-container bg-white/5 p-8 rounded-lg backdrop-blur-sm w-full max-w-md relative z-20 shadow-lg border border-white/10"
        >
          <h2 className="text-3xl font-saint-carell text-white text-center mb-8 tracking-widest uppercase">
            Register
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="fullName"
                className="block text-white mb-2 font-mono"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-black border border-white/20 text-white focus:outline-none focus:border-white transition-all duration-300"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-white mb-2 font-mono"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-black border border-white/20 text-white focus:outline-none focus:border-white transition-all duration-300"
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
                  className={`px-4 py-2 text-sm rounded bg-white/20 text-white hover:bg-white/30 transition-colors font-mono ${
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
                <label
                  htmlFor="otp"
                  className="block text-white mb-2 font-mono"
                >
                  Enter OTP
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    id="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full px-4 py-2 rounded bg-black border border-white/20 text-white focus:outline-none focus:border-white transition-all duration-300"
                    placeholder="Enter 6-digit OTP"
                    maxLength="6"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={handleVerifyOTP}
                    disabled={isLoading || otp.length !== 6}
                    className={`px-4 py-2 rounded bg-white/20 text-white hover:bg-white/30 transition-colors font-mono ${
                      isLoading || otp.length !== 6
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    {isLoading ? "Verifying..." : "Verify"}
                  </button>
                </div>
                {otpError && (
                  <p className="text-red-500 text-sm mt-1 font-sans">
                    {otpError}
                  </p>
                )}
              </div>
            )}

            {isEmailVerified && (
              <span className="text-green-500 text-sm font-sans">
                ✓ Email Verified
              </span>
            )}

            <div>
              <label
                htmlFor="password"
                className="block text-white mb-2 font-mono"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-black border border-white/20 text-white focus:outline-none focus:border-white transition-all duration-300"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label
                htmlFor="collegeId"
                className="block text-white mb-2 font-mono"
              >
                collegeId
              </label>
              <input
                type="text"
                id="collegeId"
                name="collegeId"
                value={formData.collegeId}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-black border border-white/20 text-white focus:outline-none focus:border-white transition-all duration-300"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-white mb-2 font-mono"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-black border border-white/20 text-white focus:outline-none focus:border-white transition-all duration-300"
                required
                pattern="^\+?[\d\s-]{10,15}$"
                placeholder="Enter your phone number"
                disabled={isLoading}
              />
            </div>
            <div>
              <label
                htmlFor="bloodGroup"
                className="block text-white mb-2 font-mono"
              >
                BlooodGroup <b className="text-rose-500">*</b>
              </label>
              <input
                type="text"
                id="bloodGroup"
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-black border border-white/20 text-white focus:outline-none focus:border-white transition-all duration-300"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label
                htmlFor="image"
                className="block text-white mb-2 font-mono"
              >
                Profile Image (Optional)
              </label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleImageChange}
                accept="image/*"
                className="w-full px-4 py-2 rounded bg-black border border-white/20 text-white focus:outline-none focus:border-white transition-all duration-300 file:bg-white/20 file:border-none file:text-white file:px-4 file:py-1 file:rounded file:mr-4"
                disabled={isLoading}
              />
              <p className="text-sm text-white/60 mt-1 font-sans">
                Maximum file size: 2MB
              </p>
            </div>

            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full bg-white text-black py-3 rounded font-mono font-bold hover:bg-white/90 transition-all duration-300 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </>
  );
};

export default Register;
