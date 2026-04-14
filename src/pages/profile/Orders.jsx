import productImg from "../../assets/images/product1.png";

export default function Orders() {
  const orders = [1, 2, 3];

  return (
    <div className="md:p-6 rounded-3xl">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-cinzel text-heading">
          Your Orders
        </h1>
        <p className="text-gray-600 mt-2">
          Track and manage all your purchases
        </p>
      </div>

      {/* Filters */}
      <div className="flex gap-5 mb-8 flex-wrap">
        <button className="bg-primary text-white px-5 py-2 rounded-full text-sm">
          All Orders
        </button>
        <button className="border px-5 py-2 rounded-full text-sm">
          Delivered
        </button>
        <button className="border px-5 py-2 rounded-full text-sm">
          Processing
        </button>
        <button className="border px-5 py-2 rounded-full text-sm">
          Cancelled
        </button>
      </div>

      {/* Orders List */}
    {/* Orders List */}
<div className="space-y-6">
  {orders.map((_, i) => (
    <div
      key={i}
      className="bg-white border border-gray-200 rounded-2xl p-4 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
    >
      {/* LEFT */}
      <div className="flex flex-col sm:flex-row gap-4 md:gap-5">

        {/* Image */}
        <div className="border p-2 rounded-xl flex-shrink-0">
          <img
            src={productImg}
            alt=""
            className="w-20 h-20 md:w-24 md:h-24 object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex-1">
          <h3 className="font-cinzel text-base md:text-lg text-heading">
            The Sovereign Linen Shirt
          </h3>

          {/* Order Details */}
          <div className="flex flex-col md:flex-row md:gap-8 text-xs md:text-sm text-gray-600 mt-2 space-y-1 md:space-y-0">
            <p>Order #KA20481</p>
            <p>Placed on 12 Feb 2026</p>
            <p>Qty: 1</p>
          </div>

              <div className="flex my-4 md:hidden md:flex-col justify-between md:items-end items-center gap-2 md:gap-4 mt-2 md:mt-0">
        <p className="text-primary font-semibold text-base md:text-lg">
          ₹4,999
        </p>

        <span className="bg-green-100 text-green-700 px-3 md:px-4 py-1 rounded-full text-xs md:text-sm">
          Delivered
        </span>
      </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 md:gap-4 mt-3 md:mt-4">
            <button className="bg-primary text-white px-4 md:px-5 py-2 rounded-full text-xs md:text-sm w-full sm:w-auto">
              Track Order
            </button>

            <button className="border border-primary text-primary px-4 md:px-5 py-2 rounded-full text-xs md:text-sm w-full sm:w-auto">
              View Details
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex hidden md:flex md:flex-col justify-between md:items-end items-center gap-2 md:gap-4 mt-2 md:mt-0">
        <p className="text-primary font-semibold text-base md:text-lg">
          ₹4,999
        </p>

        <span className="bg-green-100 text-green-700 px-3 md:px-4 py-1 rounded-full text-xs md:text-sm">
          Delivered
        </span>
      </div>
    </div>
  ))}
</div>
    </div>
  );
}