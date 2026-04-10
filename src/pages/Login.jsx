// Login.jsx

import bgImg from "../assets/images/auth/authBg.jpg";
import logo from "../assets/images/logo.png";
import exploreBtn from "../assets/images/exploreBtn.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { showSuccess } from "../utils/toast";
import { loginUser } from "../constants/api";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      setLoading(true);

      const res = await loginUser(formData);
      console.log(res.data);

      if (res.data.success) {
        // ✅ store token
        localStorage.setItem("token", res.data.JWTtoken);

        showSuccess(res.data.message);

        // ✅ redirect to home
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="min-h-screen relative bg-fixed bg-center bg-cover flex items-center justify-center px-4 py-16"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
        {/* LEFT */}
        <div className="hidden lg:block text-white px-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[2px] w-16 bg-white/60"></div>
            <span className="text-white/70 text-xs tracking-[0.3em]">✕</span>
            <div className="h-[2px] w-16 bg-white/60"></div>
          </div>

          <h2 className="font-cinzel text-3xl xl:text-4xl mb-4">
            ELEGANCE IN AUTHORITY
          </h2>

          <p className="text-white/60 max-w-md text-sm">
            Join the circle of refined style and timeless presence
          </p>
        </div>
        <AnimatePresence mode="wait">
          {/* RIGHT */}
          <motion.div
            key="verify"
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            duration={{ duration: 0.4 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md mx-auto lg:ml-auto"
          >
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 md:p-8 shadow-2xl">
              {/* Logo */}
              <div className="flex justify-center mb-4">
                <img src={logo} className="w-[123px]" />
              </div>

              {/* ✅ CHANGED HERE */}
              <h2 className="text-center font-cinzel text-xl md:text-2xl text-white">
                WELCOME BACK
              </h2>

              <p className="text-center text-white/60 text-sm mt-2 mb-6">
                Sign in to continue your royal experience
              </p>

              {/* Inputs */}
              <div className="space-y-4">
                {/* ✅ REMOVED FULL NAME */}
                <input
                  name="email"
                  onChange={handleChange}
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 rounded-xl bg-transparent border border-white/30 text-white placeholder:text-white/60 outline-none focus:ring-1 focus:ring-primary"
                />

                <div className="relative">
                  <input
                    name="password"
                    onChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full px-4 py-3 rounded-xl bg-transparent border border-white/30 text-white placeholder:text-white/60 outline-none focus:ring-1 focus:ring-primary"
                  />

                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 cursor-pointer hover:text-primary transition"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>

                {/* ✅ FORGOT PASSWORD */}
                <div className="text-right text-xs">
                  <span className="text-primary cursor-pointer hover:underline">
                    Forgot Password?
                  </span>
                </div>
              </div>

              {/* ✅ BUTTON ADDED */}
              <button
                onClick={handleLogin}
                disabled={loading}
                className="mt-6 w-full bg-primary text-black py-3 rounded-xl font-medium hover:opacity-90 transition"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
              {/* Terms */}
              <p className="text-center text-xs text-white/50 mt-4">
                By creating an account, you agree to our Terms & Privacy Policy
              </p>

              {/* ✅ SWITCH TEXT */}
              <p className="text-center text-sm text-white/70 mt-2">
                Don’t have an account?{" "}
                <Link to="/signup" className="text-primary hover:underline">
                  Sign Up
                </Link>
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

export default Login;
