// FeaturedProducts.jsx
import { motion } from "framer-motion";
import img1 from "../assets/images/product1.png";
import img2 from "../assets/images/product1.png";
import img3 from "../assets/images/product1.png";
import img4 from "../assets/images/product1.png";

import crown from "../assets/images/crown.png";
import cart from "../assets/images/addcart.png";
import knifeImg from "../assets/images/knifes.png";
import exploreImg from "../assets/images/exploreBtn.png";
import { useState } from "react";

function FeaturedProducts() {
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
    <section className="bg-[#EDEBE8] py-16 pb-32">
      <div className="container-main text-center">
        {/* Heading */}
        <motion.h2
          className="section-heading mb-2"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          viewport={{ once: false, amount: 0.6 }}
        >
          FEATURED PIECES
        </motion.h2>

        <motion.p
          className="section-subheading text-md text-subheading mb-10 mt-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.2, // 🔥 comes after heading
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          viewport={{ once: false, amount: 0.6 }}
        >
          Handpicked designs from our royal collection
        </motion.p>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.7, y: 60 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.7,
                ease: [0.25, 0.46, 0.45, 0.94], // smooth premium
              }}
              viewport={{ once: false, amount: 0.4 }}
              className="bg-white rounded-xl p-4 py-8 relative group overflow-hidden"
            >
              {/* Tag with knives */}
              <div className="flex items-center justify-center gap-2 text-primary text-xs mb-4">
                <img src={knifeImg} className="w-8" />
                <span>{item.tag}</span>
                <img src={knifeImg} className="w-8 rotate-180" />
              </div>

              {/* Wishlist Icon */}
              <div className="absolute top-14 right-8 w-10 h-10 border rounded-full flex items-center justify-center">
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
            </motion.div>
          ))}
        </div>

        {/* Bottom Button */}
        <button className="mt-14 bg-primary text-black px-8 py-3 rounded-xl font-medium flex items-center gap-2 mx-auto">
          <img src={exploreImg} alt="explore" className="w-5 h-5" />
          View Full Collection
        </button>
      </div>
    </section>
  );
}

export default FeaturedProducts;
