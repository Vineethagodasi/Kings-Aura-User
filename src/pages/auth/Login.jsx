import bgImg from "../../assets/images/auth/authBg.jpg";
import logo from "../../assets/images/logo.png";
import exploreBtn from "../../assets/images/exploreBtn.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { showSuccess } from "../../utils/toast";
import { loginUser, getMe, forgetPassword } from "../../constants/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/user/userSlice";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isForgot, setIsForgot] = useState(false);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      if (res.data.success) {
        localStorage.setItem("token", res.data.JWTtoken);
        const meRes = await getMe();
        if (meRes.data.success) {
          dispatch(setUser(meRes.data.user_response));
        }
        showSuccess(res.data.message);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleForgetPassword = async (e) => {
    try {
      setLoading(true);
      const res = await forgetPassword({ email: formData.email });
      if (res.data.success) {
        showSuccess(res.data.message);
        // setIsForgot(false);
        setFormData({ email: "" });
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
          <h2 className="font-cinzel text-3xl xl:text-4xl mb-4">
            ELEGANCE IN AUTHORITY
          </h2>
          <p className="text-white/60 max-w-md text-sm">
            Join the circle of refined style and timeless presence
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={isForgot ? "forgot" : "login"}
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md mx-auto lg:ml-auto"
          >
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 md:p-8 shadow-2xl">
             <Link to="/">
              <div className="flex justify-center mb-4">
                <img src={logo} className="w-[123px]" alt="logo" />
              </div>
             </Link>

              {/* <div className="text-center">
                <h4 className="text-white">
                  for login use this email and password
                </h4>
                <p className="text-primary">
                  mail : burravenkatesh284@gmail.com
                </p>
                <p className="text-primary">password : vbbvv</p>
              </div> */}

              <h2 className="text-center font-cinzel text-xl md:text-2xl text-white uppercase">
                {isForgot ? "Reset Password" : "Welcome Back"}
              </h2>

              <p className="text-center text-white/60 text-sm mt-2 mb-6">
                {isForgot
                  ? "Enter your email to receive a reset link"
                  : "Sign in to continue your royal experience"}
              </p>

              <div className="space-y-4">
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 rounded-xl bg-transparent border border-white/30 text-white placeholder:text-white/60 outline-none focus:ring-1 focus:ring-primary"
                />

                {!isForgot && (
                  <>
                    <div className="relative">
                      <input
                        name="password"
                        value={formData.password}
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

                    <div className="text-right text-xs">
                      <span
                        onClick={() => setIsForgot(true)}
                        className="text-primary cursor-pointer hover:underline"
                      >
                        Forgot Password?
                      </span>
                    </div>
                  </>
                )}
              </div>

              <button
                onClick={isForgot ? handleForgetPassword : handleLogin}
                disabled={loading}
                className="mt-6 w-full bg-primary text-black py-3 rounded-xl font-medium hover:opacity-90 transition"
              >
                {loading
                  ? isForgot
                    ? "Sending..."
                    : "Signing in..."
                  : isForgot
                    ? "Send Reset Link"
                    : "Sign In"}
              </button>

              <button
                onClick={() => window.location.href = `${import.meta.env.VITE_API_URL}/user/google`}
                className="mt-4 w-full flex items-center justify-center gap-3 bg-white text-black py-3 rounded-xl font-medium hover:opacity-90 transition"
              >
                <img
                  src="https://developers.google.com/identity/images/g-logo.png"
                  alt="google"
                  className="w-5 h-5"
                />
                Continue with Google
              </button>

              {isForgot && (
                <p className="text-center text-sm text-white/70 mt-4">
                  Back to{" "}
                  <span
                    onClick={() => setIsForgot(false)}
                    className="text-primary cursor-pointer hover:underline"
                  >
                    Login
                  </span>
                </p>
              )}

              <p className="text-center text-xs text-white/50 mt-4">
                By using our service, you agree to our Terms & Privacy Policy
              </p>

              {!isForgot && (
                <p className="text-center text-sm text-white/70 mt-2">
                  Don’t have an account?{" "}
                  <Link to="/signup" className="text-primary hover:underline">
                    Sign Up
                  </Link>
                </p>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

export default Login;
