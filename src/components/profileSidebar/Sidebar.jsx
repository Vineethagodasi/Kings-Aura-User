import React, { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Crown,
  FileText,
  MapPin,
  Wallet,
  Settings,
  Shield,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import closeIcon from "../../assets/images/close.png";
import { useSelector, useDispatch } from "react-redux";
import { profilePictureUpload, getMe, logoutUser } from "../../constants/auth";
import { setUser, clearUser } from "../../redux/user/userSlice";
import { clearCart } from "../../redux/cart/cartSlice";
import { showSuccess } from "../../utils/toast";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profilePic, setProfilePic] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const menu = [
    { name: "Dashboard", path: "/profile", icon: Crown },
    { name: "Orders", path: "/profile/orders", icon: FileText },
    { name: "Addresses", path: "/profile/address", icon: MapPin },
    // { name: "Payment Methods", path: "/profile/payment", icon: Wallet },
    { name: "Settings", path: "/profile/settings", icon: Settings },
    { name: "Notifications", path: "/profile/notifications", icon: FileText },
    { name: "Security", path: "/profile/security", icon: Shield },
  ];

  const { user, isLoggedIn } = useSelector((state) => state.user);

  // Sync profile picture from Redux user data
  useEffect(() => {
    if (user?.profileUrl) {
      setProfilePic(user.profileUrl);
    }
  }, [user?.profileUrl]);

  if (!isLoggedIn || !user) {
    return <div className="my-32">Not logged in</div>;
  }

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // preview instantly
    const previewUrl = URL.createObjectURL(file);
    setProfilePic(previewUrl);

    try {
      const formData = new FormData();
      formData.append("image", file); // API expects "image"

      const res = await profilePictureUpload(formData);

      // Upload successful, now fetch updated user data
      showSuccess(res.data.message || "Profile picture updated");
      if (res?.data?.success) {
        const userRes = await getMe();

        if (userRes?.data?.user_response?.profileUrl) {
          const newProfileUrl = userRes.data.user_response.profileUrl;
          setProfilePic(newProfileUrl);
          // Update Redux state so it persists
          dispatch(setUser(userRes.data.user_response));
        }
      }

      console.log("Upload success", res.data);
    } catch (err) {
      console.error("Upload failed", err);
    }
  };


  const confirmLogout = async () => {
  try {
    await logoutUser();
    localStorage.removeItem("token");
    dispatch(clearUser());
    dispatch(clearCart());
    showSuccess("Logged out successfully");
    navigate("/");
  } catch (err) {
    console.error("Logout error", err);
    localStorage.removeItem("token");
    dispatch(clearUser());
    dispatch(clearCart());
    navigate("/");
  }
};

  return (
    <div className="bg-[#F8F5F0] mt-16 pb-36 min-h-screen">
      <div className="container-main md:pt-12 lg:pt-32 flex flex-col lg:flex-row gap-4 md:gap-6 lg:gap-10">
        {/* Sidebar */}
        <div className="lg:w-[300px]">
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden  gap-2 mb-4 p-3 mt-12 rounded-2xl w-full justify-center transition-colors"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Backdrop */}
          {mobileMenuOpen && (
            <div
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/50 z-30"
            />
          )}

          {/* Sidebar Panel */}
          <div
            className={`fixed lg:static left-0 top-0 h-screen lg:h-auto w-72 lg:w-full z-40 bg-white rounded-r-3xl pt-28 lg:rounded-3xl p-4 md:p-6 shadow-2xl md:pt-32 lg:pt-0 transition-transform duration-300 lg:sticky lg:top-36 lg:translate-x-0 ${
              mobileMenuOpen
                ? "translate-x-0"
                : "-translate-x-full lg:translate-x-0"
            }`}
          >
            <div className="flex flex-col relative items-center text-center mb-6 md:mb-8">
              <button
                className="absolute border p-2 rounded-full text-black top-0 right-0 lg:hidden"
                onClick={() => setMobileMenuOpen(false)}
              >
                <img src={closeIcon} className="w-5 h-5" alt="" />
                {/* <X size={20} className="absolute text-black top-4 right-4 lg:hidden" onClick={() => setMobileMenuOpen(false)} />  */}
              </button>
            </div>

            {/* Profile */}
            <div className="flex flex-col items-center text-center mb-6 md:mb-8">
              {/* Image Wrapper */}
              <div className="relative cursor-pointer">
                <img
                  src={profilePic}
                  alt="profile"
                  className="w-16 md:w-20 h-16 md:h-20 rounded-full border-4 border-primary object-cover"
                  onClick={() =>
                    document.getElementById("profileInput").click()
                  }
                />

                {/* Optional small edit icon */}
                <div className="absolute bottom-0 right-0 bg-primary text-white text-xs px-1 rounded-full">
                  ✎
                </div>
              </div>

              {/* Hidden Input */}
              <input
                type="file"
                id="profileInput"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />

              <h2 className="font-cinzel text-heading text-lg md:text-xl mt-3 md:mt-4">
                {user.fullname}
              </h2>
              <p className="text-gray-500 text-xs md:text-sm">{user.email}</p>
            </div>

            {/* Menu */}
            <div className="space-y-2">
              {menu.map((item, i) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={i}
                    to={item.path}
                    end={item.path === "/profile"}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 md:px-4 py-2 md:py-3 rounded-xl transition-all duration-300 text-sm md:text-base
                    ${
                      isActive
                        ? "bg-[#EAE4D8] text-primary"
                        : "text-gray-600 hover:bg-gray-200"
                    }`
                    }
                  >
                    <Icon size={18} className="md:w-[20px] md:h-[20px]" />
                    <span className="font-inter">{item.name}</span>
                  </NavLink>
                );
              })}

              {/* Logout */}
              <div
                onClick={() => setShowLogoutModal(true)}
                className="flex items-center gap-3 px-3 md:px-4 py-2 md:py-3 text-gray-600 hover:bg-gray-200 rounded-xl cursor-pointer mt-3 md:mt-4 transition-colors text-sm md:text-base"
              >
                <LogOut size={18} className="md:w-[20px] md:h-[20px]" />
                <span className="font-inter">Log out</span>
              </div>
            </div>
          </div>
        </div>


              {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            easing="easeInOut"
            className="fixed inset-0 bg-black/40 z-[999] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.7, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-md"
            >
              <div className="backdrop-blur-xl bg-white border border-white/20 rounded-2xl p-6 md:p-8 shadow-2xl">
                {/* Decorative Line */}
                <div className="flex items-center gap-4 mb-6 justify-center">
                  <div className="h-[2px] w-12 bg-black"></div>
                  <span className="text-black/70 text-xs tracking-[0.3em]">
                    ⚠
                  </span>
                  <div className="h-[2px] w-12 bg-black"></div>
                </div>

                {/* Heading */}
                <h2 className="text-center font-cinzel text-2xl md:text-3xl text-black mb-2">
                  CONFIRM LOGOUT
                </h2>

                {/* Message */}
                <p className="text-center text-black/70 text-sm md:text-base mb-8">
                  Are you sure you want to logout? You'll need to sign in again
                  to access your account.
                </p>

                {/* Buttons */}
                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowLogoutModal(false)}
                    className="flex-1 bg-gray-200 border border-gray-300 text-black py-3 rounded-xl hover:bg-gray-300 transition font-medium"
                  >
                    Cancel
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={confirmLogout}
                    className="flex-1 bg-primary text-black py-3 rounded-xl hover:opacity-90 transition font-semibold"
                  >
                    Logout
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

        {/* Content Area */}
        <div className="flex-1 ml-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
