import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { setToken, setUser } from "../utils/auth";
import ErrorPopup from "../Components/ErrorPopup";
import { Mail, Lock, ArrowRight, Sparkles } from "lucide-react";

const Login = () => {
  const url = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

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
      <div className="min-h-screen bg-black flex relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          {/* Floating orbs */}
          <motion.div
            className="absolute top-[10%] left-[15%] w-96 h-96 bg-emerald-500/30 rounded-full filter blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, 30, 0],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-[60%] right-[20%] w-80 h-80 bg-green-400/30 rounded-full filter blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              x: [0, -40, 0],
              y: [0, 40, 0],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
          <motion.div
            className="absolute bottom-[20%] left-[40%] w-72 h-72 bg-emerald-300/20 rounded-full filter blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              x: [0, 30, 0],
              y: [0, -30, 0],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:100px_100px]" />
        </div>

        {/* Left Side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center p-8 xl:p-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 w-full max-w-xl px-4"
          >
            {/* Logo with glow effect */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative mb-10 flex justify-center"
            >
              <div className="absolute inset-0 bg-emerald-500/30 rounded-full filter blur-3xl animate-pulse" />
              <img
                src="/img/pulse-logo.png"
                alt="Pulse Logo"
                className="w-72 xl:w-80 h-auto relative z-10 drop-shadow-2xl"
              />
            </motion.div>

            {/* Welcome text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6 text-center"
            >
              <h1 className="text-4xl xl:text-5xl font-bold text-white leading-tight">
                Welcome to
                <span className="block mt-2 bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-500 bg-clip-text text-transparent">
                  PULSE Family
                </span>
              </h1>
              <p className="text-white/70 text-base xl:text-lg leading-relaxed max-w-lg mx-auto">
                Sign in to access your dashboard, register for events, and connect with the vibrant ECE community.
              </p>
              
              {/* Decorative elements */}
              <div className="flex justify-center gap-6 xl:gap-8 pt-8">
                {[
                  { icon: Sparkles, text: "Exclusive Events" },
                  { icon: Mail, text: "Stay Updated" },
                  { icon: ArrowRight, text: "Quick Access" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className="flex flex-col items-center gap-2"
                  >
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center hover:bg-emerald-500/20 transition-colors">
                      <item.icon className="w-5 h-5 text-emerald-400" />
                    </div>
                    <span className="text-white/60 text-xs text-center max-w-[70px]">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-6 sm:px-8 lg:px-12 py-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            {/* Mobile Logo */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:hidden mb-10 text-center"
            >
              <img
                src="/img/pulse-logo.png"
                alt="Pulse Logo"
                className="w-28 h-auto mx-auto mb-4"
              />
              <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                Welcome Back
              </h2>
            </motion.div>

            {/* Form Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              {/* Glassmorphism card */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-green-500/5 rounded-3xl backdrop-blur-xl border border-emerald-500/20 shadow-2xl" />
              
              <div className="relative p-6 sm:p-8 space-y-6">
                {/* Header */}
                <div className="text-center space-y-2 mb-2">
                  <h3 className="text-3xl font-bold text-white">Sign In</h3>
                  <p className="text-white/60 text-sm">Enter your credentials to continue</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                  {/* Email Input */}
                  <div className="relative group">
                    <label
                      htmlFor="email"
                      className="block text-white/80 mb-2 text-sm font-medium"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400/60 group-focus-within:text-emerald-400 transition-colors pointer-events-none" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-black/40 border border-emerald-500/30 text-white placeholder-white/40 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/50 transition-all duration-300 backdrop-blur-sm"
                        placeholder="your.email@example.com"
                        required
                        disabled={isLoading}
                      />
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: focusedField === 'email' ? 1 : 0 }}
                        className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-400 to-green-400 origin-left rounded-full"
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div className="relative group">
                    <label
                      htmlFor="password"
                      className="block text-white/80 mb-2 text-sm font-medium"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400/60 group-focus-within:text-emerald-400 transition-colors pointer-events-none" />
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('password')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-black/40 border border-emerald-500/30 text-white placeholder-white/40 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/50 transition-all duration-300 backdrop-blur-sm"
                        placeholder="••••••••"
                        required
                        disabled={isLoading}
                      />
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: focusedField === 'password' ? 1 : 0 }}
                        className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-400 to-green-400 origin-left rounded-full"
                      />
                    </div>
                  </div>

                  {/* Forgot Password */}
                  <div className="flex justify-end pt-1">
                    <Link
                      to="/forgot-password"
                      className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1 group"
                    >
                      Forgot Password?
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileHover={{ scale: isLoading ? 1 : 1.02 }}
                    whileTap={{ scale: isLoading ? 1 : 0.98 }}
                    className={`w-full relative overflow-hidden rounded-xl py-4 font-semibold text-black transition-all duration-300 mt-2 ${
                      isLoading
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:shadow-2xl hover:shadow-emerald-500/50"
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-500" />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-emerald-300 via-green-300 to-emerald-400"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isLoading ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full"
                          />
                          Signing In...
                        </>
                      ) : (
                        <>
                          Sign In
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </span>
                  </motion.button>
                </form>

                {/* Divider */}
                <div className="relative py-2">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-black/20 text-white/40">New to PULSE?</span>
                  </div>
                </div>

                {/* Register Link */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="text-center pt-2"
                >
                  <Link
                    to="/register"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/50 transition-all duration-300 font-medium group"
                  >
                    Create an Account
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Login;
