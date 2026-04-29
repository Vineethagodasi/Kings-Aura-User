import { useEffect, useState } from "react";
import logo from "../assets/images/logo.png";
import wishlist from "../assets/images/wishlist.png";
import cart from "../assets/images/addcart.png";
import menu from "../assets/images/menuicon.png";
import searchImg from "../assets/images/Vector.png";
import searchImg2 from "../assets/images/Vector2.png";
import Sidebar from "./Sidebar";
import { easeOut, motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import closeIcon from "../assets/images/close.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../redux/cart/cartSlice";
import { useLocation } from "react-router-dom";

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Normal scroll behavior
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Pages where header should ALWAYS be white
  const whiteHeaderRoutes = ["/product-details", "/profile", "/order-success"];

  const isWhitePage =
    whiteHeaderRoutes.includes(location.pathname) ||
    location.pathname.startsWith("/profile") ||
    location.pathname.includes("/product-details/") ||
    location.pathname.includes("/order-success/") ||
    location.pathname.includes("/faq");

  const dispatch = useDispatch();
  const { items: cartItems } = useSelector((state) => state.cart);
  const { isLoggedIn } = useSelector((state) => state.user);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchCart());
    }
  }, [dispatch, isLoggedIn]);

  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!searchText.trim()) return;

    navigate(`/product?search=${encodeURIComponent(searchText)}`);
    setShowSearch(false);
  };

  return (
    <>
      <motion.header
        // initial={{ opacity: 0, y: 40 }}
        // animate={{ opacity: 1, y: 0 }}
        // transition={{
        //   duration: 2.2, // was 5 — that's why it felt sluggish
        //   delay: 0.3,
        //   ease: easeOut,
        // }}
        className={`fixed top-0 left-0 w-full z-50 ${
          isWhitePage || scrolled
            ? "bg-white shadow-md transition-all duration-30"
            : "bg-transparent"
        }`}
      >
        <div className="md:container-main">
          <div
            className={`flex items-center justify-between h-[100px] transition-colors duration-300 ${
              isWhitePage || scrolled ? "text-black" : "text-white"
            }`}
          >
            {/* Logo */}
            <Link to="/">
              <img
                src={logo}
                alt="logo"
                className="w-full max-w-[100px] md:max-w-[160px]"
              />
            </Link>

            {/* Right Side */}
            <div className="flex items-center gap-2 md:gap-6 cursor-pointer ">
              {/* Search */}
              <div
                onClick={() => setShowSearch(true)}
                className={`flex items-center gap-2 md:border md:rounded-full px-4 py-3 max-w-[230px] cursor-pointer ${
                  isWhitePage || scrolled
                    ? "border-black/30"
                    : "border-white/60"
                }`}
              >
                <img
                  src={`${isWhitePage || scrolled ? searchImg2 : searchImg}`}
                  alt="search"
                  className={`${isWhitePage || scrolled ? "w-6 h-6 md:w-5 md:h-5" : "w-5 h-5"}`}
                />
                <input
                  type="text"
                  placeholder="Search for royal pieces..."
                  className={`bg-transparent cursor-pointer outline-none hidden md:flex  text-sm w-full ${
                    isWhitePage || scrolled
                      ? "placeholder:text-black/60"
                      : "placeholder:text-white/70"
                  }`}
                />
              </div>

              {/* Wishlist */}
              <Link to="/wishlist">
                <div className="hidden lg:flex flex-col items-center gap-1 cursor-pointer">
                  <img src={wishlist} alt="wishlist" className="w-6 h-6" />
                  <span className="text-xs">Wishlist</span>
                </div>
              </Link>

              {/* Cart */}
              <Link to="/cart">
                <div className="relative hidden lg:flex flex-col items-center gap-1 cursor-pointer">
                  <img src={cart} alt="cart" className="w-6 h-6" />
                  <span className="text-xs">My Cart</span>
                  {cartItems.length > 0 && (
                    <span className="absolute -top-3 -right-2 bg-primary text-white rounded-full px-[8px] py-[2px] text-xs">
                      {cartItems.length}
                    </span>
                  )}
                </div>
              </Link>

              {/* Menu */}
              <div
                onClick={() => setOpen(true)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <img
                  src={menu}
                  alt="menu"
                  className="w-10 h-10 md:w-12 md:h-12"
                />
                <span className="text-sm uppercase mr-4">Menu</span>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen} />

      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed inset-0 z-[999] bg-[#1a1a1a]/95 backdrop-blur-md flex flex-col items-center pt-36 px-6"
          >
            {/* Close Button */}
            <button
              onClick={() => setShowSearch(false)}
              className="absolute top-6 right-[10%] md:right-[20%] w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 border border-primary rounded-full flex items-center justify-center"
            >
              <img src={closeIcon} className="w-4 h-4 md:w-5 md:h-5" />
            </button>

            {/* Search Input */}
            <div className="w-full max-w-xl flex items-center gap-3 border border-primary rounded-full px-6 py-4">
              {/* <img src={searchImg} className="w-6 h-6" /> */}
              
              <input
                type="text"
                autoFocus
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
                placeholder="Search for royal wear..."
                className="bg-transparent outline-none text-white w-full placeholder:text-white/60"
              />
              <img
  src={searchImg}
  className="w-6 h-6 cursor-pointer"
  onClick={handleSearch}
/>
            </div>

            {/* Popular Searches */}
            <h3 className="text-white mt-10 font-cinzel text-xl tracking-wide">
              Popular your products
            </h3>

            {/* <div className="flex flex-wrap justify-center gap-4 mt-6 max-w-2xl">
              {[
                "Royal Linen",
                "Silk Shirts",
                "Evening Wear",
                "Classic Collection",
              ].map((item, i) => (
                <button
                  key={i}
                  className="border border-primary text-primary px-5 py-2 rounded-full hover:bg-primary/10 transition"
                >
                  {item}
                </button>
              ))}
            </div> */}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;
