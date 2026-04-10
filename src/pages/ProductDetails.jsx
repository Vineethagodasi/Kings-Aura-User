import { useState } from "react";
import img1 from "../assets/images/product1.png";
import img2 from "../assets/images/productDetails/product.png";
import img3 from "../assets/images/productDetails/product.png";
import img4 from "../assets/images/productDetails/product.png";
import arrow from "../assets/images/collection/arrow.png";
import crown from "../assets/images//productDetails/crown.png";
import cart from "../assets/images/addcart.png";
import exploreImg from "../assets/images/exploreBtn.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";


  const products = [
    {
      title: "The Sovereign Linen",
      desc: "Premium linen crafted for royal comfort",
      price: "₹4,999",
      image: img1,
      tag: "LIMITED EDITION",
    },
    {
      title: "The Sovereign Linen",
      desc: "Premium linen crafted for royal comfort",
      price: "₹4,999",
      image: img1,
      tag: "LIMITED EDITION",
    },
    {
      title: "The Sovereign Linen",
      desc: "Premium linen crafted for royal comfort",
      price: "₹4,999",
      image: img1,
      tag: "LIMITED EDITION",
    },
    {
      title: "The Sovereign Linen",
      desc: "Premium linen crafted for royal comfort",
      price: "₹4,999",
      image: img1,
      tag: "LIMITED EDITION",
    },
  ];



function ProductDetails() {
  const images = [img2, cart, img3, img4];

  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState(0);
    const [open, setOpen] = useState(true);


  const sizes = ["S", "M", "L", "XL"];
  const colors = ["#D4A017", "#E63946", "#2ECC71", "#6C5CE7"];

  return (
    <>
    <section className="bg-[#EDEBE8] py-32 md:pt-44">
      <div className="container-main grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* ================= LEFT IMAGE SECTION ================= */}
        <div className="flex flex-col items-center">

          {/* Main Image */}
          <div className="border border-[#f8f5f0] !border-primary rounded-xl py-8 px-12 max-w-[400px] max-h-[400px] md:min-h-[400px] flex items-center justify-cente">
            <img
              key={activeImage}
              src={images[activeImage]}
              alt="product"
              className="max-h-[400px] w-full object-contain transition-all duration-300"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex flex-wrap gap-6 mt-4">
            {images.map((img, index) => (
              <div
                key={index}
                onClick={() => setActiveImage(index)}
                className={`cursor-pointer border rounded-lg p-1 w-[50px] h-[60px] md:w-[70px] md:h-[80px] flex items-center justify-center transition-all duration-300
                  ${
                    activeImage === index
                      ? "border-[#C8A96A] scale-105"
                      : "border-gray-300 opacity-70"
                  }
                `}
              >
                <img
                  src={img}
                  alt="thumb"
                  className="h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* ================= RIGHT CONTENT ================= */}
        <div>

          {/* Breadcrumb */}
          <p className="text-sm text-gray-500 mb-2">
            Home / Collections / <span className="text-primary">Royal Wear</span>
          </p>

          {/* Title */}
          <h1 className="section-heading lg:text-[36px] my-4 font-medium">
            The Sovereign Linen Shirt
          </h1>

          {/* Price + Rating */}
          <div className="flex items-center gap-4 md:gap-12 mt-2">
            <p className="text-primary md:text-xl font-semibold">₹4,999</p>
            <div className="text-primaryDark md:text-2xl">★ ★ ★ ★ ★</div>
            <span className="text-subheading text-sm">120 reviews</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 my-6">
            <span className="bg-primary/30 text-primary px-2 md:px-4 py-2 text-xs md:text-sm font-medium rounded-md">
              20% OFF
            </span>
            <span className="bg-white/50 text-subheading px-2 md:px-4 py-2 text-xs md:text-sm rounded">
              Delivery in 3-5 days
            </span>
            <span className="bg-primary text-black px-2 md:px-4 py-2 text-xs md:text-sm rounded">
              Royal Pick
            </span>
          </div>

          {/* Description */}
          <p className="text-[16px] text-subheading max-w-md mt-4">
            Crafted from premium linen, designed for timeless elegance and everyday authority.
          </p>

          {/* ================= SIZE ================= */}
          <div className="mt-6">
            <p className="text-sm mb-2">Select Size</p>
            <div className="flex gap-3">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded-md text-sm
                    ${
                      selectedSize === size
                        ? "bg-primary/30 text-black border-primary"
                        : "border-gray-300"
                    }
                  `}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* ================= COLORS ================= */}
          <div className="mt-6">
            <p className="text-sm mb-2">Select Color</p>
            <div className="flex gap-3">
              {colors.map((color, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedColor(index)}
                  className={`w-6 h-6 rounded-full cursor-pointer border-2
                    ${
                      selectedColor === index
                        ? "border-black/20 scale-110"
                        : "border-transparent"
                    }
                  `}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* ================= BUTTONS ================= */}
          <div className="mt-8 flex flex-col max-w-[360px] gap-3">

            {/* Add to Cart */}
            <button className="bg-[#C8A96A] text-black py-3 rounded-lg flex items-center justify-center gap-2 font-medium">
              <img src={cart} className="w-7 h-7" />
              Add to Royal Cart
            </button>

            {/* Wishlist */}
            <button className="border border-primaryDark mt-2 text-primary py-3 rounded-lg flex items-center justify-center gap-2 font-medium">
              <img src={crown} className="w-5 h-5" />
              Add to Wishlist
            </button>
          </div>

          {/* Extra Info */}
          <p className="text-base text-subheading mt-5">
            Free delivery above ₹999 · Easy returns
          </p>

          {/* ================= ACCORDION ================= */}
              <div className="mt-8 border-b border-black/10 pb-4">
      
      {/* Header */}

      <h2 className="section-heading lg:text-[28px] mb-8">Product Details</h2>
      <div
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center cursor-pointer"
      >
        <h3 className=" text-heading text-lg tracking-wide">
          Product Details
        </h3>

        <span className="text-2xl text-heading">
          {open ? "−" : "+"}
        </span>
      </div>

      

      {/* Content */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-40 mt-4" : "max-h-0"
        }`}
      >
        <ul className="space-y-3 text-sm text-subheading">
          
          <li className="flex items-center gap-3">
            <img src={arrow} className="w-4 h-4" />
            Premium linen fabric
          </li>

          <li className="flex items-center gap-3">
            <img src={arrow} className="w-4 h-4" />
            Regular fit
          </li>

          <li className="flex items-center gap-3">
            <img src={arrow} className="w-4 h-4" />
            Button-down collar
          </li>

          <li className="flex items-center gap-3">
            <img src={arrow} className="w-4 h-4" />
            Full sleeves
          </li>

        </ul>
      </div>
    </div>

        </div>
      </div>
    </section>


   <section className="bg-[#EDEBE8] py-16">


        <div className="container-main text-center">
                 <span className="block w-16 h-[2px] mb-2 bg-primary"></span>
          <h2 className="section-heading lg:text-[32px] text-left">Complete Your Royal Look</h2>
          <p className="section-subheading text-left">Curated pieces to elevate your presence</p>
          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
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
                 <Link to={`/product-details`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full object-contain 
                             transition-transform duration-500 
                             group-hover:scale-105"
                  />
                 </Link>
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
    </>
  );
}

export default ProductDetails;