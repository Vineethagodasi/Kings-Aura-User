import React, { useState } from "react";
import productImg from "../../assets/images/product1.png";
import { motion } from "framer-motion";
import img1 from "../../assets/images/product1.png";
import img2 from "../../assets/images/product1.png";
import img3 from "../../assets/images/product1.png";
import img4 from "../../assets/images/product1.png";
import crown from "../../assets/images/crown.png";
import cart from "../../assets/images/addcart.png";

export default function Dashboard() {
  const stats = [
    { title: "12 Orders", desc: "Your purchase history" },
    { title: "8 Items", desc: "Your curated selections" },
    { title: "2 Saved", desc: "Delivery locations" },
    { title: "1 Method", desc: "Secure Payments" },
  ];

  const orders = [
    {
      name: "The Sovereign Linen Shirt",
      price: "₹6,499",
      order: "#KA20481",
      status: "Delivered",
      date: "12 Feb 2026",
      img: productImg,
    },
    {
      name: "The Sovereign Linen Shirt",
      price: "₹6,499",
      order: "#KA20481",
      status: "Delivered",
      date: "12 Feb 2026",
      img: productImg,
    },
  ];

  const [activeImages, setActiveImages] = useState({});

  const products = [
    {
      title: "The Sovereign Linen",
      desc: "Premium linen crafted for royal comfort",
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
    <div className="w-full flex flex-col gap-6 md:gap-8 lg:gap-11">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-cinzel font-bold text-heading">
          Your Royal Dashboard
        </h1>
        <p className="text-sm md:text-base text-gray-600 mt-2">
          Welcome back, User <br />
          Continue managing your royal wardrobe
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
        {stats.map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-xl md:rounded-2xl px-3 py-6 text-center shadow-sm border"
          >
            <h3 className="text-primary text-base md:text-lg lg:text-xl font-semibold">
              {item.title}
            </h3>
            <p className="text-gray-600 text-xs md:text-sm mt-1 md:mt-2">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="mt-4">
        <h2 className="text-2xl md:text-3xl font-cinzel text-heading mb-6">
          Recent Orders
        </h2>

        <div className="grid xl:grid-cols-2 gap-6">
          {orders.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-5 border border-gray-200"
            >
              {/* Image */}
              <img
                src={productImg}
                alt=""
                className="w-24 h-24 object-cover scale-125"
              />

              {/* Content */}
              <div className="flex-1">
                {/* Title + Price (IMPORTANT FIX) */}
                <div className="flex justify-between items-start">
                  <h3 className="text-heading text-lg font-medium leading-snug">
                    {item.name}
                  </h3>
                </div>

                <div className="flex justify-end items-center mt-5">
                  <p className="text-primaryDark text-base md:text-lg font-medium whitespace-nowrap">
                    {item.price}
                  </p>
                </div>

                {/* Order Info */}
                <div className="text-sm text-gray-600 mt-3 space-y-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-subheading font-medium text-[14px]">
                      Order
                    </p>
                    <p>{item.order}</p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between pt-1 gap-2">
                    <p className="text-subheading font-medium text-[14px]">
                      Status:
                    </p>
                    <p className="bg-[#69F0AE] text-green-700 px-3 py-1 rounded-md text-xs">
                      {item.status}
                    </p>
                  </div>

                  <p className="text-[14px] text-subheading pt-2">
                    {item.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recently Viewed */}
      <div className="mt-4">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-cinzel font-bold text-heading mb-4 md:mb-6">
          Recently Viewed
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
          {products.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-4 py-8 relative group overflow-hidden"
            >
              {/* Wishlist Icon */}
              <div className="absolute top-6 right-8 w-10 h-10 border rounded-full flex items-center justify-center">
                <img src={crown} className="w-6 h-6" />
              </div>

              {/* Image */}
              <div className="overflow-hidden">
                <img
                  key={activeImages[index] || 0}
                  src={item.images[activeImages[index] || 0]}
                  alt={item.title}
                  className="w-full h-[180px] object-contain transition-transform duration-500 group-hover:scale-105"
                />

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
    </div>
  );
}
