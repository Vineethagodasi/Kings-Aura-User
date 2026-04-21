import { useState, useEffect } from "react"
import { Toaster } from "react-hot-toast"
import AppRoutes from "./routes/AppRoutes"
import IntroOverlay from "./components/IntroOverlay"
import { useDispatch } from "react-redux"
import { setUser } from "./redux/user/userSlice"
import { getMe } from "./constants/auth"
import { fetchCart } from "./redux/cart/cartSlice"
import { fetchWishlist } from "./redux/wishlist/wishlistSlice"

function App() {
  const dispatch = useDispatch();

  const [showIntro, setShowIntro] = useState(() => {
    const introSeen = sessionStorage.getItem("introSeen");
      const isVerifyPage = window.location.pathname === "/verify" || window.location.pathname === "/reset-password";
        if (isVerifyPage) return false;


    return !introSeen;
  });

  const handleIntroFinish = () => {
    setShowIntro(false);
    sessionStorage.setItem("introSeen", "true");
  };

  // ✅ Auto-restore user from token on every page load / refresh
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    getMe()
      .then((res) => {
        if (res.data.success) {
          dispatch(setUser(res.data.user_response));
        }
      })
      .catch(() => {
        // Token expired or invalid — clean up
        localStorage.removeItem("token");
      });
  }, [dispatch]);


  useEffect(() => {
  const token = localStorage.getItem("token");

  if (token) {
    dispatch(fetchCart());
    dispatch(fetchWishlist()); // ✅ ADD THIS
  }
}, []);



  return (
    <>
      {showIntro ? (
        <IntroOverlay onFinish={handleIntroFinish} />
      ) : (
        <>
          <Toaster position="top-center" />
          <AppRoutes />
        </>
      )}
    </>
  );
}

export default App
