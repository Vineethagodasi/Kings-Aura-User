// Cart.jsx

import bgImg from "../assets/images/cart/cartBg.png"; // your background
import crown from "../assets/images/crown.png";
import exploreBtn from "../assets/images/exploreBtn.png";
import trash from "../assets/images/cart/trash.png"; // o
import img1 from "../assets/images/product1.png";
import { Link } from "react-router-dom";


function Cart() {
  return (
    <section
      className="min-h-screen relative flex items-center justify-center px-4 py-20 pb-32 bg-fixed bg-center bg-cover"
      style={{ backgroundImage: `url(${bgImg})` }}
    >

            <div
        className={`absolute inset-0 bg-black/30`}
      ></div>
      {/* Glass Card */}
      <div className="w-full max-w-6xl rounded-2xl backdrop-blur-xl mt-28 bg-white/10 shadow-2xl p-6 md:p-10">

        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="font-cinzel text-2xl md:text-3xl text-white">
            Your Royal Cart
          </h2>
          <p className="text-white/70 text-sm mt-2">
            Review your selected pieces before proceeding
          </p>
        </div>

      {/* Content */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

  {/* LEFT: Cart Items */}
  <div className="lg:col-span-2 space-y-4">

    {[1, 2, 3].map((item, i) => (
     <div
  key={i}
  className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-8"
>

  {/* Trash Icon */}
  <button className="absolute top-3 right-3 md:top-5 md:right-5 opacity-80 hover:opacity-100 transition">
    <img src={trash} className="w-5 h-5" />
  </button>

  {/* Image */}
  <div className="w-full sm:w-28 sm:h-32 bg-white rounded-lg p-3 mt-4 md:mt-0 flex-shrink-0 overflow-hidden">
    <img className="w-full h-full object-cover" src={img1} alt="" />
  </div>

  {/* Info */}
  <div className="flex-1 min-w-0">
    <h3 className="text-white/90 font-cinzel text-base tracking-wide md:text-xl relative md:bottom-8 font-medium mb-2">
      The Sovereign Linen Shirt
    </h3>

    <div className="flex flex-wrap max-w-xs gap-3 items-center md:justify-between text-xs text-white/60">
      <span className="text-primary font-medium text-sm md:text-base">₹4,999</span>
      <span className="text-sm">Size: M</span>
      <span className="flex text-sm items-center gap-2">
        Color:
        <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
      </span>
    </div>
  </div>

  {/* Qty */}
  <div className="flex items-center gap-3 border border-white/20 rounded-md px-3 py-1 text-white sm:self-auto">
    <button>−</button>
    <span>1</span>
    <button>+</button>
  </div>
</div>
    ))}

  </div>

  {/* RIGHT: Summary */}
  <div className="bg-white rounded-xl p-6 text-black h-fit">

    <h3 className="font-cinzel text-lg mb-4">
      ORDER SUMMARY
    </h3>

    <div className="space-y-3 text-sm">

      <div className="flex justify-between">
        <span>Subtotal</span>
        <span>₹3,398.00</span>
      </div>

      <div className="flex justify-between">
        <span>Discount</span>
        <span>₹497.00</span>
      </div>

      <div className="flex justify-between">
        <span>Delivery</span>
        <span>Free</span>
      </div>

      <div className="flex justify-between">
        <span>Tax</span>
        <span>₹0.00</span>
      </div>

    </div>

    <div className="border-t my-4"></div>

    <div className="flex justify-between font-medium text-sm">
      <span>Total</span>
      <span className="text-primaryDark text-lg">
        ₹2,908.00
      </span>
    </div>

    {/* Button */}
<Link to="/checkout">

    <button className="mt-6 w-full bg-primary text-black py-3 rounded-lg flex items-center justify-center gap-2 font-medium hover:opacity-90 transition">
      <img src={exploreBtn} className="w-5 h-5" />
      Proceed to Checkout
    </button>
</Link>

  </div>

</div>
      </div>
    </section>
  );
}

export default Cart;