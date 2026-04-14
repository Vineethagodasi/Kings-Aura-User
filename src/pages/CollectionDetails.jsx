// ProductDetails.jsx
import { motion } from "framer-motion";
import img1 from "../assets/images/product1.png";
import img2 from "../assets/images/product1.png";
import img3 from "../assets/images/product1.png";
import img4 from "../assets/images/product1.png";

import crown from "../assets/images/crown.png";
import cart from "../assets/images/addcart.png";
import arrow from "../assets/images/collection/arrow.png";
import Hero from "../components/Hero";
import productBg from "../assets/images/collection/productBg.png";
import { Link } from "react-router-dom";
import { useState } from "react";

function CollectionDetails() {

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
    <>
      <Hero
        bgImage={productBg}
        line={true}
        title="THE ROYAL WEAR"
        description="Timeless pieces crafted for everyday authority"
      />

       <section className="bg-[#EDEBE8] py-16 ">
        <div className="flex flex-wrap items-center container-main bg-white p-6 justify-around gap-4">
          {/* Left Filters */}
         <div className="flex flex-wrap justify-center gap-4">

  {/* Category */}
  <select className="border border-primary text-heading px-4 py-3 rounded-md min-w-[180px] text-sm focus:outline-none">
    <option>Category</option>
    <option>Men</option>
    <option>Women</option>
  </select>

  {/* Size */}
  <select className="border border-primary text-heading px-4 py-3 rounded-md min-w-[180px] text-sm focus:outline-none">
    <option>Size</option>
    <option>S</option>
    <option>M</option>
    <option>L</option>
  </select>

  {/* Fabric */}
  <select className="border border-primary text-heading px-4 py-3 rounded-md min-w-[180px] text-sm focus:outline-none">
    <option>Fabric</option>
    <option>Cotton</option>
    <option>Silk</option>
  </select>

  {/* Price */}
 <select className="border border-primary text-heading px-4 py-3 rounded-md min-w-[180px] text-sm focus:outline-none">
  <option>Price</option>
  <option>₹0 - ₹500</option>
  <option>₹500 - ₹1000</option>
  <option>₹1000 - ₹2000</option>
  <option>₹2000+</option>
</select>

  {/* Sort By */}
  <select className="border border-primary text-heading px-4 py-3 rounded-md min-w-[180px] text-sm focus:outline-none">
    <option>Sort By</option>
    <option>Low to High</option>
    <option>High to Low</option>
  </select>

</div>

          {/* Right Side Count */}
          <div className="text-heading text-sm">32 Pieces</div>
        </div>
        </section>

      <section className="bg-[#EDEBE8] py-16 pt-8 ">


        <div className="container-main text-center">
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
              </motion.div>
            ))}
          </div>

          {/* Bottom Button */}
          <button className="mt-14 border border-primary text-primary px-8 py-3 rounded-xl font-medium flex items-center gap-2 mx-auto">
            Reveal More
            <img src={arrow} alt="explore" className="w-5 h-5 ml-2" />
          </button>
        </div>
      </section>
    </>
  );
}

export default CollectionDetails;
