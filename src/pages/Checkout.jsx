// Checkout.jsx

import { Link } from "react-router-dom";
import bgImg from "../assets/images/cart/cartBg.png";
import exploreBtn from "../assets/images/exploreBtn.png";
import img1 from "../assets/images/product1.png";

function Checkout() {
  const products = [
    {
      name: "The Sovereign Linen Shirt",
      price: "₹4,999",
      size: "M",
      color: "bg-blue-500",
      image: img1,
    },
    {
      name: "The Regal Silk Shirt",
      price: "₹3,999",
      size: "L",
      color: "bg-green-500",
      image: img1,
    },
  ];

  return (
    <section
      className="min-h-screen relative flex items-center justify-center px-4 py-20 pb-32 bg-fixed bg-center bg-cover"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Glass Card */}
      <div className="relative w-full max-w-6xl rounded-2xl backdrop-blur-xl mt-28 bg-white/10 shadow-2xl p-6 md:p-10">
        {/* Top Label */}
        <div className="flex items-center gap-2 text-white text-xs mb-4">
          <span>Secure Checkout</span>
          <span>🔒</span>
        </div>
        <span className="block w-full h-[1px] bg-primary/20 mb-8"></span>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT FORM */}
          <div className="lg:col-span-2 space-y-5">
            {/* Heading */}
            <h2 className="font-cinzel text-xl md:text-2xl text-white mb-2">
              ENTER YOUR DETAILS
            </h2>

            <p className="text-white/90 text-sm mb-6">
              Complete your order securely in just a few steps
            </p>

            {/* Contact */}
            <div>
              <p className="text-white text-sm mb-2">CONTACT INFORMATION</p>

              <input
                type="text"
                placeholder="Enter your email"
                className="w-full p-3 rounded-md bg-white text-sm outline-none mb-3"
              />

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Enter your number"
                  className="p-3 rounded-md bg-white text-sm outline-none"
                />
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="p-3 rounded-md bg-white text-sm outline-none"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <p className="text-white text-sm mb-2">SHIPPING ADDRESS</p>

              <div className="flex gap-4 text-white/70 text-sm mb-3">
                <label className="flex items-center gap-1">
                  <input type="radio" name="type" /> Home
                </label>
                <label className="flex items-center gap-1">
                  <input type="radio" name="type" /> Office
                </label>
              </div>

              <textarea
                rows={4}
                placeholder="Enter Address"
                className="w-full p-3 rounded-md bg-white text-sm outline-none mb-3"
              />

              <div className="grid grid-cols-2 gap-3 mb-3">
                <input
                  type="text"
                  placeholder="Enter your City"
                  className="p-3 rounded-md bg-white text-sm outline-none"
                />
                <input
                  type="text"
                  placeholder="Enter your State"
                  className="p-3 rounded-md bg-white text-sm outline-none"
                />
              </div>

              <input
                type="text"
                placeholder="Enter Pincode"
                className="w-full p-3 rounded-md bg-white text-sm outline-none"
              />
            </div>
          </div>

          {/* RIGHT SUMMARY */}
          <div className="bg-white rounded-xl p-6 text-black h-fit">
            <h3 className="font-cinzel text-lg mb-4">ORDER SUMMARY</h3>

            {/* Products */}
            <div className="space-y-4 mb-4">
              {products.map((item, i) => (
                <div key={i} className="flex gap-3 items-center">
                  <div className="w-12 h-14 bg-gray-100 rounded-md overflow-hidden">
                    <img
                      src={item.image}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 text-sm">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-xs text-gray-500">
                      Size: {item.size} |
                      <span className="ml-1 inline-block w-3 h-3 rounded-full bg-blue-500"></span>
                    </p>
                  </div>

                  <p className="text-primaryDark text-sm">{item.price}</p>
                </div>
              ))}
            </div>

            {/* Coupon */}
            <div className="flex border rounded-md overflow-hidden mb-4">
              <input
                type="text"
                placeholder="DISCOUNT CODE"
                className="flex-1 px-3 py-2 text-sm outline-none"
              />
              <button className="px-4 text-primaryDark text-sm">APPLY</button>
            </div>

            {/* Pricing */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹3,398.00</span>
              </div>

              <div className="flex justify-between">
                <span>Discount</span>
                <span>₹497.00</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>₹90.00</span>
              </div>
            </div>

            <div className="border-t my-4"></div>

            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span className="text-primaryDark">₹2,908.00</span>
            </div>

            {/* Button */}
         <Link to="/payment">
            <button className="mt-5 w-full bg-primary text-black py-3 rounded-lg flex items-center justify-center gap-2 font-medium">
              <img src={exploreBtn} className="w-5 h-5" />
              Proceed to Checkout
            </button>
         </Link>

            {/* Secure text */}
            <p className="text-xs text-center text-gray-500 mt-3">
              🔒 Secure Checkout 100% safe payment
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Checkout;
