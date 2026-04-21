import bgImg from "../../assets/images/cart/cartBg.png";

function Payment() {
return (
<section
className="min-h-screen flex items-center justify-center bg-cover bg-center relative px-4"
style={{ backgroundImage: `url(${bgImg}) ` }}
>
{/* Dark overlay */} <div className="absolute inset-0 bg-black/40"></div>

  {/* Main Container */}
  <div className="relative w-full max-w-6xl grid lg:grid-cols-3 gap-6 backdrop-blur-xl bg-white/10 p-8 rounded-2xl shadow-2xl mt-24">

    {/* LEFT - PAYMENT */}
    <div className="lg:col-span-2 text-white">
      <h2 className="text-lg mb-4 tracking-wide">PAYMENT METHOD</h2>

      {/* Payment Options */}
      <div className="space-y-2 mb-6 text-sm">
        <label className="flex items-center gap-2">
          <input type="radio" name="payment" /> UPI
        </label>
        <label className="flex items-center gap-2">
          <input type="radio" name="payment" defaultChecked /> Credit/Debit Card
        </label>
        <label className="flex items-center gap-2">
          <input type="radio" name="payment" /> Net Banking
        </label>
        <label className="flex items-center gap-2">
          <input type="radio" name="payment" /> Cash on Delivery
        </label>
      </div>

      {/* Card Form */}
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Card Number"
          className="w-full p-3 rounded-md bg-white text-black text-sm outline-none"
        />

        <input
          type="text"
          placeholder="Card Holder Name"
          className="w-full p-3 rounded-md bg-white text-black text-sm outline-none"
        />

        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Expiry Date"
            className="p-3 rounded-md bg-white text-black text-sm outline-none"
          />
          <input
            type="text"
            placeholder="CVV"
            className="p-3 rounded-md bg-white text-black text-sm outline-none"
          />
        </div>
      </div>

      {/* Secure Text */}
      <p className="text-xs text-white/70 mt-4">
        🔒 Your payment is securely encrypted
      </p>

      {/* Pay Button */}
      <button className="mt-6 w-full bg-yellow-600 hover:bg-yellow-500 text-black py-3 rounded-lg font-medium">
        Pay ₹9,998 →
      </button>
    </div>

    {/* RIGHT - SUMMARY */}
    <div className="bg-white rounded-xl p-6 text-black">
      <h3 className="text-md font-semibold mb-4">ORDER SUMMARY</h3>

      {/* Item */}
      <div className="flex gap-3 mb-4">
        <div className="w-12 h-14 bg-gray-200 rounded"></div>
        <div className="flex-1 text-sm">
          <p>The Sovereign Linen Shirt</p>
          <p className="text-xs text-gray-500">Size: M</p>
        </div>
        <p className="text-sm">₹4,999</p>
      </div>

      <div className="flex gap-3 mb-4">
        <div className="w-12 h-14 bg-gray-200 rounded"></div>
        <div className="flex-1 text-sm">
          <p>The Regal Silk Shirt</p>
          <p className="text-xs text-gray-500">Size: M</p>
        </div>
        <p className="text-sm">₹3,999</p>
      </div>

      {/* Coupon */}
      <div className="flex border rounded-md overflow-hidden mb-4">
        <input
          type="text"
          placeholder="DISCOUNT CODE"
          className="flex-1 px-3 py-2 text-sm outline-none"
        />
        <button className="px-4 text-sm">APPLY</button>
      </div>

      {/* Pricing */}
      <div className="text-sm space-y-2">
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

      <div className="flex justify-between font-semibold">
        <span>Total</span>
        <span>₹2,908.00</span>
      </div>

      <p className="text-xs text-center text-gray-500 mt-4">
        🔒 Secure Checkout 100% safe payment
      </p>
    </div>
  </div>
</section>
);
}

export default Payment;
