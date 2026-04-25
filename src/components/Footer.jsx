// Footer.jsx
import logo from "../assets/images/logo.png";
import footerImg from "../assets/images/footerImg.jpg";
import { FaInstagram, FaTwitter, FaYoutube, FaWhatsapp } from "react-icons/fa";
import knifeImg from "../assets/images/knife.png";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation();
  const knifeAnimation = {
    initial: { opacity: 0, rotate: -90, scale: 0.8 },
    whileInView: { opacity: 1, rotate: 0, scale: 1 },
    transition: { duration: 0.8, ease: "easeOut" },
    viewport: { once: false, amount: 0.6 },
  };

  const noSpace = [
    "/wishlist",
    "/cart",
    "/checkout",
    "/profile",
    "/collection/",
    "/product-details",
  ];

  const isNoSpace =
    noSpace.includes(location.pathname) ||
    noSpace.some((path) => location.pathname.startsWith(path));

  const footerLinks = [
    {
      title: "SHOP",
      links: [
        { name: "New Arrivals", path: "/collection/new-arrivals" },
        { name: "Best Sellers", path: "/collection/best-sellers" },
        { name: "Royal Wear", path: "/collection/royal-wear" },
      ],
    },
    {
      title: "COLLECTIONS",
      links: [
        { name: "Heritage", path: "/collection/heritage" },
        { name: "Evening Wear", path: "/collection/evening-wear" },
        { name: "Classic", path: "/collection/classic" },
      ],
    },
    {
      title: "ABOUT",
      links: [
        { name: "Our Story", path: "/about#story" },
        { name: "Craftsmanship", path: "/about#craft" },
      ],
    },
    {
      title: "SUPPORT",
      links: [
        { name: "Contact Us", path: "/contact" },
        { name: "FAQ", path: "/faq" },
        { name: "Track Order", path: "/profile/orders" },
      ],
    },
  ];

  return (
    <footer className={`pt-16 mb-[0.7px] ${isNoSpace ? "-mt-24" : ""}`}>
      {/* Green Box with Image + Overlay */}
      <div className="relative rounded-t-[40px] overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${footerImg})` }}
        ></div>

        {/* Green Overlay */}
        <div className="absolute inset-0 bg-[#1E4B3A]/95"></div>

        {/* Content */}
        <div className="relative text-white px-8 md:px-16 py-12 text-center">
          <div className="container-main">
            {/* Logo */}
            <img src={logo} alt="logo" className="w-[200px] mx-auto mb-4" />

            {/* Tagline */}
            <p className="text-sm text-white/70 mb-10">
              A true brand crafts loyalty, not just customers.
            </p>

            {/* Links */}
            <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8 text-sm text-left md:text-center">
              {/* Shop */}
              {/* Knife Dividers */}
              <div className="hidden md:block -ml-12 absolute top-1/2 left-1/4 -translate-y-1/2 opacity-80">
                <motion.img src={knifeImg} alt="divider" {...knifeAnimation} />
              </div>

              <div className="hidden md:block -ml-12 absolute top-1/2 left-2/4 -translate-y-1/2 opacity-80">
                <motion.img
                  src={knifeImg}
                  alt="divider"
                  {...knifeAnimation}
                  transition={{ ...knifeAnimation.transition, delay: 0.2 }}
                />
              </div>

              <div className="hidden md:block -ml-12 absolute top-1/2 left-3/4 -translate-y-1/2">
                <motion.img
                  src={knifeImg}
                  alt="divider"
                  {...knifeAnimation}
                  transition={{ ...knifeAnimation.transition, delay: 0.4 }}
                />
              </div>

{footerLinks.map((section, index) => (
  <div key={index}>
    <h4 className="font-normal text-[16px] mb-4">
      {section.title}
    </h4>

    <ul className="space-y-2 text-white/70">
      {section.links.map((link, i) => (
        <li key={i}>
          <Link
            to={link.path}
            className="hover:text-white transition"
          >
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  </div>
))}
            </div>

            {/* Divider */}
            <div className="border-t border-white/20 my-10"></div>

            {/* Social Icons */}
            <div className="flex justify-center gap-6 mb-6">
              <div className="w-10 h-10 border border-primary rounded-full flex items-center justify-center cursor-pointer hover:bg-primary/20 hover:scale-110 transition">
                <FaInstagram className="text-primary text-lg" />
              </div>

              <div className="w-10 h-10 border border-primary rounded-full flex items-center justify-center cursor-pointer hover:bg-primary/20 hover:scale-110 transition">
                <FaTwitter className="text-primary text-lg" />
              </div>

              <div className="w-10 h-10 border border-primary rounded-full flex items-center justify-center cursor-pointer hover:bg-primary/20 hover:scale-110 transition">
                <FaYoutube className="text-primary text-lg" />
              </div>

              <div className="w-10 h-10 border border-primary rounded-full flex items-center justify-center cursor-pointer hover:bg-primary/20 hover:scale-110 transition">
                <FaWhatsapp className="text-primary text-lg" />
              </div>
            </div>

            {/* Bottom */}
            <div className="text-xs text-white/60 space-y-2">
              <p>© 2026 The King’s Aura. All rights reserved.</p>

              <div className="flex justify-center gap-6">
                <span>Terms & Conditions</span>
                <span>Privacy Policy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
