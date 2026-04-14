import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { showError, showSuccess } from "../../utils/toast";
import { verifyUser } from "../../constants/auth";
import { useRef } from "react";

function Verify() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("loading");
  const hasCalled = useRef(false);

useEffect(() => {
  if (hasCalled.current) return; // 🚫 prevent second call
  hasCalled.current = true;

  const verifyAccount = async () => {
    try {
      const verificationKey = searchParams.get("verificationKey");

      if (!verificationKey) {
        setStatus("error");
        showError("Invalid verification link");
        return;
      }

      const res = await verifyUser(verificationKey);

      if (res.data.success) {
        setStatus("success");
        showSuccess(res.data.message);

        setTimeout(() => {
          navigate("/login");
        }, 5000);
      }
    } catch (err) {
      setStatus("error");

      showError(
        err.response?.data?.error || "Verification failed"
      );
    }
  };

  verifyAccount();
}, []);
  return (
    <div className="h-screen flex items-center justify-center bg-black text-white px-4">
  <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 md:p-10 rounded-2xl text-center w-full max-w-lg shadow-2xl">

    {status === "loading" && (
      <>
        <h1 className="font-cinzel text-2xl md:text-3xl text-primary mb-3">
          Verifying Your Account...
        </h1>
        <p className="text-white/60 text-base md:text-lg">
          Please wait while we confirm your email
        </p>
      </>
    )}

    {status === "success" && (
      <>
        <h1 className="font-cinzel text-2xl md:text-3xl text-primary mb-3">
          ✅ Email Verified!
        </h1>
        <p className="text-white/60 text-base md:text-lg">
          Redirecting you to login...
        </p>
      </>
    )}

    {status === "error" && (
      <>
        <h1 className="font-cinzel text-2xl md:text-3xl text-red-400 mb-3">
          ❌ Verification Failed
        </h1>
        <p className="text-white/60 text-base md:text-lg mb-4">
          Link expired or invalid. Please try again.
        </p>

        <button
          onClick={() => navigate("/signup")}
          className="px-6 py-2 rounded-lg border border-primary text-primary hover:bg-primary hover:text-black transition"
        >
          Go to Signup
        </button>
      </>
    )}

  </div>
</div>
  );
}

export default Verify;