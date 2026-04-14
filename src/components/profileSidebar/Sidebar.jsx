import React, { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  Crown,
  FileText,
  MapPin,
  Wallet,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import closeIcon from "../../assets/images/close.png";
import { useSelector, useDispatch } from "react-redux";
import { profilePictureUpload, getMe } from "../../constants/auth";
import { setUser } from "../../redux/user/userSlice";

export default function Sidebar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profilePic, setProfilePic] = useState();
  const dispatch = useDispatch();

  const menu = [
    { name: "Dashboard", path: "/profile", icon: Crown },
    { name: "Orders", path: "/profile/orders", icon: FileText },
    { name: "Addresses", path: "/profile/address", icon: MapPin },
    { name: "Payment Methods", path: "/profile/payment", icon: Wallet },
    { name: "Settings", path: "/profile/settings", icon: Settings },
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
      if (res?.data?.success) {
        const userRes = await getMe();
        
        if (userRes?.data?.user_response?.profileUrl) {
          const newProfileUrl = userRes.data.user_response.profileUrl;
          setProfilePic(newProfileUrl);
          // Update Redux state so it persists
          dispatch(
            setUser(userRes.data.user_response)
          );
        }
      }

      console.log("Upload success", res.data);
    } catch (err) {
      console.error("Upload failed", err);
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
            className="lg:hidden  gap-2 mb-4 p-3 mt-6 rounded-2xl w-full justify-center hover:bg-gray-200 transition-colors"
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
            className={`fixed lg:static left-0 top-0 h-screen lg:h-auto w-72 lg:w-full z-40 bg-white rounded-r-3xl pt-24 lg:rounded-3xl p-4 md:p-6 shadow-2xl md:pt-32 lg:pt-0 transition-transform duration-300 lg:sticky lg:top-40 lg:translate-x-0 ${
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
            <div className="space-y-2 md:space-y-3">
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
              <div className="flex items-center gap-3 px-3 md:px-4 py-2 md:py-3 text-gray-600 hover:bg-gray-200 rounded-xl cursor-pointer mt-3 md:mt-4 transition-colors text-sm md:text-base">
                <LogOut size={18} className="md:w-[20px] md:h-[20px]" />
                <span className="font-inter">Log out</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 ml-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
