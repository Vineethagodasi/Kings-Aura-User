import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { showSuccess } from "../../utils/toast";
import { setNewPassword } from "../../constants/auth";
import bgImg from "../../assets/images/auth/authBg.jpg";
import logo from "../../assets/images/logo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Grab email from URL on mount
  useEffect(() => {
    const emailFromUrl = searchParams.get("email");
    if (emailFromUrl) {
      setFormData((prev) => ({
        ...prev,
        email: emailFromUrl,
      }));
    }
  }, [searchParams]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleReset = async () => {
    try {
      setLoading(true);
      const res = await setNewPassword(formData);
      if (res.data.success) {
        showSuccess(res.data.message);
        navigate("/login");
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
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
        <div className="hidden lg:block text-white px-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[2px] w-16 bg-white/60"></div>
            <span className="text-white/70 text-xs tracking-[0.3em]">✕</span>
            <div className="h-[2px] w-16 bg-white/60"></div>
          </div>
          <h2 className="font-cinzel text-3xl xl:text-4xl mb-4 text-primary">
            SECURITY MATTERS
          </h2>
          <p className="text-white/60 max-w-md text-sm">
            Update your credentials to maintain your secure access
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md mx-auto lg:ml-auto"
        >
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 md:p-8 shadow-2xl">
            <div className="flex justify-center mb-4">
              <img src={logo} className="w-[123px]" alt="logo" />
            </div>

            <h2 className="text-center font-cinzel text-xl md:text-2xl text-white uppercase">
              Set New Password
            </h2>

            <p className="text-center text-white/60 text-sm mt-2 mb-6">
              Enter your strong new password
            </p>

            <div className="space-y-4">
              <input
                name="email"
                value={formData.email}
                type="email"
                placeholder="Email Address"
                disabled
                className="w-full px-4 py-3 rounded-xl bg-transparent border border-white/30 text-white placeholder:text-white/60 outline-none focus:ring-1 focus:ring-primary opacity-60 cursor-not-allowed"
              />

              <div className="relative">
                <input
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  className="w-full px-4 py-3 rounded-xl bg-transparent border border-white/30 text-white placeholder:text-white/60 outline-none focus:ring-1 focus:ring-primary"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 cursor-pointer hover:text-primary transition"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            <button
              onClick={handleReset}
              disabled={loading}
              className="mt-6 w-full bg-primary text-black py-3 rounded-xl font-medium hover:opacity-90 transition"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>

            <p className="text-center text-sm text-white/70 mt-6">
              Remembered your password?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-primary cursor-pointer hover:underline"
              >
                Back to Login
              </span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default ResetPassword;
