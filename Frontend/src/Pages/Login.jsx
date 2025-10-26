import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { setToken, setUser } from "../utils/auth";
import ErrorPopup from "../Components/ErrorPopup";

const Login = () => {
  const url = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${url}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        throw new Error(
          data.error || "Login failed. Please check your credentials."
        );
      }

      localStorage.setItem("token", data.token);
      setToken(data.token);
      setUser(data);
      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {error && <ErrorPopup message={error} onClose={() => setError(null)} />}
      <div className="min-h-screen bg-black flex">
        
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <motion.div
              className="absolute top-1/4 left-2/4 w-96 h-96 bg-emerald-500/20 rounded-full mix-blend-lighten filter blur-3xl opacity-40 animate-pulse"
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
              className="text-4xl font-robert-medium font-bold text-white text-center mb-4 tracking-widest"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              WELCOME BACK
            </motion.h1>
            <motion.p
              className="text-white/70 text-center text-lg font-sans"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
             Sign in to continue your journey with Pulse Family
            </motion.p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-12 py-8 sm:py-12 relative">
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
            className="login-container bg-white/5 p-6 sm:p-8 rounded-lg backdrop-blur-sm w-full max-w-md relative z-20 shadow-lg border border-emerald-500/30"
          >
          <h2 className="text-2xl sm:text-3xl font-saint-carell text-white text-center mb-6 sm:mb-8 tracking-widest uppercase">
            Login
          </h2>
          <form onSubmit={handleLogin} className="space-y-4 sm:space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-white mb-2 font-mono text-sm sm:text-base"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded bg-black border border-emerald-500/30 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all duration-300"
                required
                disabled={isLoading}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-white mb-2 font-mono text-sm sm:text-base"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded bg-black border border-emerald-500/30 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all duration-300"
                required
                disabled={isLoading}
              />
            </div>
            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-xs sm:text-sm text-emerald-400 hover:text-emerald-300 transition-colors font-sans"
              >
                Forgot Password?
              </Link>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-emerald-500 text-black p-2.5 sm:p-3 text-sm sm:text-base rounded-lg transition-all duration-300 font-mono font-semibold ${
                isLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-emerald-400"
              }`}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
          <p className="text-white/60 text-center mt-4 font-sans text-sm sm:text-base">
            Don't have an account?{" "}
            <Link to="/register" className="text-emerald-400 hover:text-emerald-300 font-semibold">
              Register here
            </Link>
          </p>
        </motion.div>
        </div>
      </div>
    </>
  );
};

export default Login;
