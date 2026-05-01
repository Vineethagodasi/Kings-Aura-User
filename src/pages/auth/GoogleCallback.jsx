import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/user/userSlice";
import { getMe } from "../../constants/auth";
import { showSuccess, showError } from "../../utils/toast";

// This component handles the Google OAuth redirect.
// Backend redirects to: /?token=xxx&userId=xxx&role=user&firstname=xxx&lastname=xxx
// We read the token from URL params, store it, fetch user info, and redirect home.

function GoogleCallback() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) return; // no token in URL, not a Google callback

    // Store token exactly like normal login does
    localStorage.setItem("token", token);

    // Clean the token from the URL without triggering a reload
    window.history.replaceState({}, document.title, "/");

    // Fetch full user profile using the token
    getMe()
      .then((res) => {
        if (res.data.success) {
          dispatch(setUser(res.data.user_response));
          showSuccess("Logged in with Google");
        }
      })
      .catch(() => {
        showError("Google login failed. Please try again.");
        localStorage.removeItem("token");
      })
      .finally(() => {
        navigate("/", { replace: true });
      });
  }, []);

  return null; // renders nothing, just handles the redirect logic
}

export default GoogleCallback;
