// Cart.jsx

import bgImg from "../assets/images/wishlist/wishlistBg.png"; // your background

import trash from "../assets/images/cart/trash.png"; // o
import { Link } from "react-router-dom";
import img1 from "../assets/images/product1.png";
import img2 from "../assets/images/product1.png";
import img3 from "../assets/images/product1.png";
import img4 from "../assets/images/product1.png";
import closeIcon from "../assets/images/wishlist/close.png";
import crown from "../assets/images/crown.png";
import cart from "../assets/images/addcart.png";
import { useState } from "react";

function Wishlist() {
  const [activeImages, setActiveImages] = useState({});

  const products = [
    {
      title: "The Sovereign Linen",
      desc: "Premium linen crafted for royal",
      price: "₹4,999",
      images: [img1, cart, img3, img4], // 👈 array
      tag: "LIMITED EDITION",
    },
    {
      title: "The Regal Silk Shirt",
      desc: "Elegance woven in every thread",
      price: "₹6,499",
      images: [img1, img2, img3, img4], // 👈 array
      tag: "New Arrival",
    },
    {
      title: "The Monarch Classic Fit",
      desc: "Designed for presence and power",
      price: "₹5,299",
      images: [img1, img2, img3, img4], // 👈 array
      tag: "LIMITED EDITION",
    },
    {
      title: "The Imperial Evening Wear",
      desc: "For nights that demand attention",
      price: "₹7,999",
      images: [img1, img2, img3, img4], // 👈 array
      tag: "LIMITED EDITION",
    },
  ];

  return (
    <section
      className="min-h-screen relative flex items-center justify-center px-4 py-20 pb-32 bg-fixed bg-center bg-cover"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className={`absolute inset-0 bg-black/50 z-0`}></div>
      {/* Glass Card */}
      <div className="relative z-10 w-full max-w-7xl rounded-2xl shadow-2xl p-6 md:p-10 mt-6">
        {/* Heading */}
        <div className="mb-8">
          <h2 className="section-heading text-white">Your Royal Wishlist</h2>
          <p className="section-subheading text-white/90 mt-4">
            Curated pieces you’ve chosen to revisit{" "}
          </p>
        </div>

        {/* Content */}
        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-4 py-8 relative group overflow-hidden"
            >
              {/* Wishlist Icon */}
              <div className="absolute z-10 top-4 right-4 w-10 h-10 border rounded-full flex items-center justify-center">
                <img src={closeIcon} className="w-5 h-5 cursor-pointer" />
              </div>

              {/* Image */}

              <div className="overflow-hidden">
                <Link to="/product-details">
                  <img
                    key={activeImages[index] || 0}
                    src={item.images[activeImages[index] || 0]}
                    alt={item.title}
                    className="w-full h-[180px] object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>

                <div className="flex justify-center mt-3 gap-2">
                  {item.images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() =>
                        setActiveImages((prev) => ({
                          ...prev,
                          [index]: i,
                        }))
                      }
                      className={`h-2.5 rounded-full transition-all duration-300
        ${
          (activeImages[index] || 0) === i
            ? "bg-primary w-4"
            : "bg-gray-300 w-2.5"
        }
      `}
                    />
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="mt-4 text-center">
                <h3 className="text-[18px] text-heading font-medium">
                  {item.title}
                </h3>
                <p className="text-sm text-subheading mt-1">{item.desc}</p>

                <p className="text-primaryDark text-2xl mt-3 font-medium">
                  {item.price}
                </p>
              </div>

              {/* Button */}
              <button
                className="mt-5 w-full border border-primaryDark text-md rounded-lg py-3 
                           flex items-center justify-center gap-2
                           text-primaryDark font-medium
                           transition-all duration-300
                           hover:bg-primary hover:text-black"
              >
                <img src={cart} className="w-7 h-7" />
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Wishlist;
