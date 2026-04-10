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


function Sidebar({ open, setOpen }) {

  const menuItems = [
            { name: "HOME", icon: homeIcon },
            { name: "COLLECTIONS", icon: collectionsIcon },
            { name: "THE ROYAL WARDROBE", icon: wardrobeIcon },
            { name: "ABOUT", icon: aboutIcon },
            { name: "CONTACT", icon: contactIcon },
          ];
        

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
            <div
              key={index}
              className="flex items-center gap-5 cursor-pointer group"
            >
              <img src={item.icon} className="w-8 h-8 opacity-90" />

              <p className="font-cinzel text-xl tracking-wide group-hover:text-primary transition">
                {item.name}
              </p>
            </div>
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

            <div className="flex items-center gap-3">
              <img src={accountIcon} className="w-5 h-5 opacity-80" />
              <p>My Account</p>
            </div>

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
          <button className="my-8 bg-primary text-black px-6 py-3 rounded-xl w-full flex items-center justify-center gap-3 font-medium">
            <img src={exploreImg} className="w-5 h-5" />
            Explore Collection
          </button>
        </div>
      </div>
      </div>
    </>
  );
}

export default Sidebar;