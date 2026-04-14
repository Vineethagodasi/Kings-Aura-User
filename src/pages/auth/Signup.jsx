// Signup.jsx

import bgImg from "../../assets/images/auth/authBg.jpg"; // your bg
import logo from "../../assets/images/logo.png";
import exploreBtn from "../../assets/images/exploreBtn.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
import { signupUser } from "../../constants/auth";
import { showSuccess } from "../../utils/toast";
import { motion, AnimatePresence } from "framer-motion";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async () => {
    try {
      setLoading(true);

      const res = await signupUser(formData);

      if (res.data.success) {
        showSuccess(res.data.message);
        setIsEmailSent(true);
        // 👉 Show check email screen (next step)
        // OR temporarily:
        console.log("Email sent, verify account");
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
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Main Layout */}
      <div className="relative w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
        {/* LEFT CONTENT */}
        <div className="hidden lg:block text-white px-6">
          {/* Decorative line */}
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
          {/* RIGHT FORM */}
          {!isEmailSent ? (
            <motion.div
              key="signup"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-md mx-auto lg:ml-auto"
            >
              <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 md:p-8 shadow-2xl">
                {/* Logo */}
                <div className="flex justify-center mb-4">
                  <img src={logo} className="w-[123px]" />
                </div>

                {/* Heading */}
                <h2 className="text-center font-cinzel text-xl md:text-2xl text-white">
                  CREATE YOUR ACCOUNT
                </h2>

                <p className="text-center text-white/60 text-sm mt-2 mb-6">
                  Begin your journey into refined elegance
                </p>

                {/* Inputs */}
                <div className="space-y-4">
                  <input
                    name="fullname"
                    onChange={handleChange}
                    type="text"
                    placeholder="Full Name"
                    className="w-full px-4 py-3 rounded-xl bg-transparent border border-white/30 text-white placeholder:text-white/60 outline-none focus:ring-1 focus:ring-primary"
                  />

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

                  <div className="relative">
                    <input
                      name="confirmPassword"
                      onChange={handleChange}
                      type={showConfirm ? "text" : "password"}
                      placeholder="Confirm Password"
                      className="w-full px-4 py-3 rounded-xl bg-transparent border border-white/30 text-white placeholder:text-white/60 outline-none focus:ring-1 focus:ring-primary"
                    />

                    <span
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 cursor-pointer hover:text-primary transition"
                    >
                      {showConfirm ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                </div>

                {/* Button */}
                <button
                  onClick={handleSignup}
                  disabled={loading}
                  className="mt-6 w-full bg-primary text-black py-3 rounded-xl flex items-center justify-center gap-2 font-medium hover:opacity-90 transition"
                >
                  <img src={exploreBtn} className="w-5 h-5" />
                  {loading ? "Creating..." : "Create Account"}
                </button>

                {/* Terms */}
                <p className="text-center text-xs text-white/50 mt-4">
                  By creating an account, you agree to our Terms & Privacy
                  Policy
                </p>

                {/* Sign in */}
                <p className="text-center text-sm text-white/70 mt-2">
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary hover:underline">
                    Sign In
                  </Link>
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              // key="verify"
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              duration={{ duration: 0.4 }}
              className="text-center"
            >
              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div className="w-14 h-14 flex items-center justify-center rounded-full">
                  <span className="text-primary text-4xl">✉️</span>
                </div>
              </div>

              {/* Heading */}
              <h1 className="font-cinzel section-heading text-primary mb-2 tracking-wide">
                CHECK YOUR EMAIL
              </h1>

              {/* Sub text */}
              <p className="text-white text-lg md:text-2xl my-4">
                We’ve sent a verification link to
              </p>

              {/* Email */}
              <p className="text-primaryDark text-base font-medium mb-4 break-all">
                {formData.email}
              </p>

              {/* Info */}
              <p className="text-white/90 text-lg md:text-lg mb-6">
                Please verify your account to continue. <br />
                If you don’t see the email, check your spam folder.
              </p>

              {/* Button */}
              <button
                onClick={() => setIsEmailSent(false)}
                className="px-6 py-2 rounded-lg border text-lg border-primary text-primary hover:bg-primary hover:text-black transition duration-300"
              >
                Back to Signup
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default Signup;
