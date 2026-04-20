import logo from "../assets/images/logo.png";
import closeIcon from "../assets/images/close.png";
import menuIcon from "../assets/images/addcart.png"; // use same for all
import homeIcon from "../assets/menuicons/home.png";
import aboutIcon from "../assets/menuicons/about.png";
import contactIcon from "../assets/menuicons/contact.png"; 
import collectionsIcon from "../assets/menuicons/collections.png";
import wardrobeIcon from "../assets/menuicons/wordrobe.png";
import trackOrderIcon from "../assets/menuicons/trackorder.png";
import accountIcon from "../assets/menuicons/account.png";
import wishlistIcon from "../assets/menuicons/wishlist.png";
import exploreImg from "../assets/images/exploreBtn.png";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearUser } from "../redux/user/userSlice";
import { logoutUser } from "../constants/auth";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { showSuccess } from "../utils/toast";


function Sidebar({ open, setOpen }) {

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const menuItems = [
            { name: "HOME", icon: homeIcon, path: "/" },
            { name: "COLLECTIONS", icon: collectionsIcon, path: "/collection" },
            { name: "THE ROYAL WARDROBE", icon: wardrobeIcon, path: "/wardrobe" },
            { name: "ABOUT", icon: aboutIcon, path: "/about" },
            { name: "CONTACT", icon: contactIcon, path: "/contact" },
          ];

          const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

          const dispatch = useDispatch();
          const navigate = useNavigate();

          const confirmLogout = async () => {
            try {
              // Step 1: Call logout API
              await logoutUser();
              showSuccess("Logged out successfully");

              // Step 2: Clear token from localStorage
              localStorage.removeItem("token");

              // Step 3: Clear user from Redux
              dispatch(clearUser());

              // Step 4: Close modal
              setShowLogoutModal(false);

              // Step 5: Close sidebar
              setOpen(false);

              // Step 6: Navigate to home
              navigate("/");
            } catch (err) {
              console.log("Logout error:", err);
              // Even if API fails, still clear local state
              localStorage.removeItem("token");
              dispatch(clearUser());
              setShowLogoutModal(false);
              navigate("/");
            }
          };

          const handleLogoutClick = () => {
            setShowLogoutModal(true);
          };

          useEffect(() => {
            setOpen(false); // Close sidebar on route change
          }, [location.pathname]);
        

  return (
    <>
      {/* Overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-black/30 z-40 transition-all duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      ></div>

      {/* Sidebar */}
      <div
        className={`overflow-y-auto hide-scrollbar fixed top-0 right-0 h-full w-[320px] md:w-[380px] lg:w-[420px] 
        bg-gradient-to-b from-[#0B2F25] pb-6 to-[#0F3D2E] z-50 
        transform transition-transform duration-500 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Top */}
        <div className="flex items-center justify-between px-6 py-6">
          <img src={logo} className="w-[120px]" />

          <button
            onClick={() => setOpen(false)}
            className="w-10 h-10 border border-primary rounded-full flex items-center justify-center"
          >
            <img src={closeIcon} className="w-4 h-4" />
          </button>
        </div>

        {/* Menu */}
      <div className="flex justify-center items-center">
          <div className="px-2 mt-4 text-white space-y-8">

          {/* Menu Item */}
          {menuItems.map((item, index) => (
           <Link to={item.path} key={index} className="w-full block">

             <div
              className="flex items-center gap-5 cursor-pointer group"
            >
              <img src={item.icon} className="w-8 h-8 opacity-90" />

              <p className="font-cinzel text-xl tracking-wide group-hover:text-primary transition">
                {item.name}
              </p>
            </div>
           </Link>
          ))}

          {/* Tagline */}
          <p className="text-sm text-white/60 mt-8">
            Curated for those who lead with presence
          </p>

          {/* Bottom Links */}
          <div className="mt-6 space-y-4 text-white/80">
            <div className="flex items-center gap-3">
              <img src={trackOrderIcon} className="w-5 h-5 opacity-80" />
              <p>Track Order</p>
            </div>

          <Link to="/profile" className="w-full block">
            <div className="flex items-center gap-3">
              <img src={accountIcon} className="w-5 h-5 opacity-80" />
              <p>My Account</p>
            </div>
          </Link>

                 <Link to="/cart" className="w-full block">
            <div className="flex items-center gap-3">
              <img src={accountIcon} className="w-5 h-5 opacity-80" />
              <p>My Cart</p>
            </div>
          </Link>

            <div className="flex items-center gap-3">
              <img src={wishlistIcon} className="w-5 h-5 opacity-80" />
              <p>Wishlist</p>
            </div>
          </div>

          {/* Social Icons */}
            <div className="flex justify-center gap-6 mb-6 ">

              <div className="w-10 h-10 border border-primary rounded-full flex items-center justify-center cursor-pointer hover:bg-primary/20 hover:scale-110 transition">
                <FaInstagram className="text-primary text-lg" />
              </div>

              <div className="w-10 h-10 border border-primary rounded-full flex items-center justify-center cursor-pointer hover:bg-primary/20 hover:scale-110 transition">
                <FaTwitter className="text-primary text-lg" />
              </div>

              <div className="w-10 h-10 border border-primary rounded-full flex items-center justify-center cursor-pointer hover:bg-primary/20 hover:scale-110 transition">
                <FaYoutube className="text-primary text-lg" />
              </div>

            </div>

          {/* Button */}


          { isLoggedIn ? (
            <button onClick={handleLogoutClick} className="my-8 bg-primary text-black px-6 py-3 font-semibold rounded-xl w-full flex items-center justify-center gap-3 font-medium">
              {/* <img src={exploreImg} className="w-5 h-5" /> */}
              Logout
            </button>
          ) : (
            <Link to="/login">
            <button className="my-8 bg-primary text-black px-6 py-3 font-semibold rounded-xl w-full flex items-center justify-center gap-3 font-medium">
              {/* <img src={exploreImg} className="w-5 h-5" /> */}
              Sign-In
            </button>
          </Link>
          )}
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
            className="fixed inset-0 bg-black/20 z-[999] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.7, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-md"
            >
              <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 md:p-8 shadow-2xl">
                {/* Decorative Line */}
                <div className="flex items-center gap-4 mb-6 justify-center">
                  <div className="h-[2px] w-12 bg-white/60"></div>
                  <span className="text-white/70 text-xs tracking-[0.3em]">⚠</span>
                  <div className="h-[2px] w-12 bg-white/60"></div>
                </div>

                {/* Heading */}
                <h2 className="text-center font-cinzel text-2xl md:text-3xl text-white mb-2">
                  CONFIRM LOGOUT
                </h2>

                {/* Message */}
                <p className="text-center text-white/70 text-sm md:text-base mb-8">
                  Are you sure you want to logout? You'll need to sign in again to access your account.
                </p>

                {/* Buttons */}
                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowLogoutModal(false)}
                    className="flex-1 bg-white/10 border border-white/30 text-white py-3 rounded-xl hover:bg-white/20 transition font-medium"
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
    </>
  );
}

export default Sidebar;