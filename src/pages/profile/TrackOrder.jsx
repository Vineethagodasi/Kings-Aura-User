import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../services/axiosInstance";

export default function TrackOrder() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      const res = await axiosInstance.get(
        `/user/tackorder?orderid=${id}`
      );

      if (res.data.success) {
        setOrder(res.data.data.orderdetails);
        setProducts(res.data.data.products);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!order) return <p className="text-center">Order not found</p>;

  const steps = [
    { label: "orderPlaced", value: order.orderPlaced },
    { label: "inProgress", value: order.inProgress },
    { label: "onTheWay", value: order.onTheWay },
    { label: "delivered", value: order.delivered },
  ];

  const getCurrentStep = () => {
  if (order.delivered) return 3;
  if (order.onTheWay) return 2;
  if (order.inProgress) return 1;
  if (order.orderPlaced) return 0;
  return -1;
};

const currentStep = getCurrentStep();

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-10 px-4 md:px-10">

      {/* 🔥 HEADER */}
      <div className="bg-[#EAE6E1] p-6 rounded-xl text-center mb-8">
        <h1 className="text-2xl font-cinzel">Order Details</h1>
        <p className="text-sm text-gray-600 mt-2">
          Track your order status
        </p>
      </div>

      {/* 🔥 ORDER STATUS */}
      <div className="bg-white p-6 rounded-xl mb-8">
        <h2 className="text-lg font-semibold mb-4">Order Status</h2>

<div className="flex justify-between items-center relative">
  {steps.map((step, index) => (
    <div key={index} className="flex-1 flex flex-col items-center relative">

      {/* Line */}
      {index !== steps.length - 1 && (
        <div
          className={`absolute top-4 left-1/2 w-full h-[2px] ${
            index < currentStep ? "bg-green-500" : "bg-gray-300"
          }`}
        ></div>
      )}

      {/* Circle */}
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
          index <= currentStep
            ? "bg-green-500 text-white"
            : "bg-gray-200 text-gray-400"
        }`}
      >
        ✓
      </div>

      <p className="text-xs mt-2 text-center">{step.label}</p>
    </div>
  ))}
</div>
      </div>

      {/* 🔥 ITEMS */}
      <div className="bg-white p-6 rounded-xl mb-8">
        <h2 className="text-lg font-semibold mb-4">
          Items in your order
        </h2>

        {products.map((item, i) => (
          <div key={i} className="flex justify-between items-center border p-4 rounded-lg mb-4">

            <div className="flex gap-4">
              <img
                src={item.image}
                className="w-20 h-20 rounded object-cover"
              />

              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">
                  Qty: {item.cartquantity}
                </p>
              </div>
            </div>

            <p className="font-semibold">₹{item.productprice}</p>
          </div>
        ))}
      </div>

      {/* 🔥 ADDRESS + PAYMENT */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* Address */}
        <div className="bg-white p-6 rounded-xl">
          <h3 className="font-semibold mb-3">Delivery Address</h3>
          <p className="text-sm text-gray-600">
            Hyderabad, Telangana <br />
            (from your API you can map full address later)
          </p>
        </div>

        {/* Payment */}
        <div className="bg-white p-6 rounded-xl">
          <h3 className="font-semibold mb-3">Payment Details</h3>

          <div className="text-sm text-gray-600 space-y-2">
            <div className="flex justify-between">
              <span>Total</span>
              <span>₹{order.orderamount}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}