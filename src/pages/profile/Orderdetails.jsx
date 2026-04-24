import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "../../services/axiosInstance";
import productImg from "../../assets/images/product1.png";

export default function Orderdetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/user/order/${id}`);
        if (response.data?.success) {
          setOrder(response.data.data);
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load order details");
        console.error("Error fetching order details:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchOrderDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="md:p-6 flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="md:p-6 py-20 text-center">
        <p className="text-red-500 mb-4">{error || "Order not found"}</p>
        <Link to="/profile/orders" className="text-primary underline flex items-center justify-center gap-2">
          <span>&larr;</span> Back to Orders
        </Link>
      </div>
    );
  }

  // Calculate generic subtotal properly based on products
  const productsSubtotal = order.products?.reduce((acc, p) => acc + (p.productprice * p.cartquantity), 0) || 0;

  return (
    <div className="md:p-6 rounded-3xl">
      {/* Header & Back */}
      <div className="mb-6 flex flex-col gap-2">
        <Link to="/profile/orders" className="text-sm text-gray-500 hover:text-primary transition-colors flex items-center gap-1 w-fit">
          <span>&larr;</span> Back to Orders
        </Link>
        <h1 className="text-3xl md:text-4xl font-cinzel text-heading flex items-center gap-3">
          Order Details
        </h1>
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mt-1">
          <p>Order #{order.orderId}</p>
          <span className="text-gray-300">|</span>
          <p>Placed on {new Date(order.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Items and Status */}
        <div className="lg:col-span-2 space-y-6">
          {/* Status Box */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 md:p-6">
             <h2 className="font-cinzel text-xl mb-4">Order Status</h2>
             <div className="flex items-center gap-3 mb-2">
               <span className="bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-medium capitalize">
                 {order.status?.replace(/_/g, " ")}
               </span>
             </div>
             <p className="text-sm text-gray-600 mt-3 pt-3 border-t">
               {order.status === "delivered" 
                  ? "Your package has been successfully delivered."
                  : order.status === "out_for_delivery" 
                  ? "Your package is currently out for delivery and will arrive shortly."
                  : "We are currently processing and packing your order."}
             </p>
          </div>

          {/* Items */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 md:p-6">
            <h2 className="font-cinzel text-xl mb-4">Items Ordered</h2>
            <div className="space-y-4">
              {order.products?.map((item) => (
                <div key={item._id || item.productId} className="flex gap-4 p-3 border border-gray-100 rounded-xl items-center">
                  <div className="border border-gray-200 p-2 rounded-lg flex-shrink-0">
                    <img src={item.productimages || productImg} alt={item.productname} className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-md" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-heading text-sm md:text-base">{item.productname}</h3>
                    <p className="text-xs md:text-sm text-gray-500 mt-1 capitalize">
                      Size: {item.size} | Color: {item.color} | Qty: {item.cartquantity}
                    </p>
                    <p className="text-primary font-semibold mt-2 text-sm md:text-base">₹{item.productprice?.toLocaleString("en-IN")}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Summary, Address, Payment */}
        <div className="space-y-6">
           {/* Order Summary */}
           <div className="bg-white border border-gray-200 rounded-2xl p-5 md:p-6">
              <h2 className="font-cinzel text-lg mb-4">Order Summary</h2>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex justify-between">
                  <p>Subtotal</p>
                  <p className="font-medium text-heading">₹{productsSubtotal.toLocaleString("en-IN")}</p>
                </div>
                <div className="flex justify-between">
                  <p>Shipping</p>
                  <p className="font-medium text-heading">₹{order.paymentid?.shippingcost || 0}</p>
                </div>
                <div className="flex justify-between">
                  <p>Tax</p>
                  <p className="font-medium text-heading">₹{order.paymentid?.tax || 0}</p>
                </div>
                {order.discountamount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <p>Discount</p>
                    <p className="font-medium">-₹{order.discountamount}</p>
                  </div>
                )}
                <div className="border-t pt-3 mt-3 flex justify-between font-semibold text-lg text-primary">
                  <p>Total</p>
                  <p>₹{order.orderamount?.toLocaleString("en-IN")}</p>
                </div>
              </div>
           </div>

           {/* Shipping Address */}
           <div className="bg-white border border-gray-200 rounded-2xl p-5 md:p-6">
              <h2 className="font-cinzel text-lg mb-3 flex justify-between items-center">
                Delivery Address
                {order.shipping_address?.placeType && (
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded capitalize font-sans">{order.shipping_address.placeType}</span>
                )}
              </h2>
              <div className="text-sm text-gray-600 space-y-1">
                <p className="font-medium text-heading text-base mb-1">{order.shipping_address?.contactinfo?.fullname}</p>
                <p>{order.shipping_address?.shippingAddress?.address}</p>
                <p>{order.shipping_address?.shippingAddress?.city}, {order.shipping_address?.shippingAddress?.state} {order.shipping_address?.shippingAddress?.pincode}</p>
                
                <div className="mt-3 pt-3 border-t">
                  <p>Phone: {order.shipping_address?.contactinfo?.mobilenumber}</p>
                  <p>Email: {order.shipping_address?.contactinfo?.emailAddress}</p>
                </div>
              </div>
           </div>

           {/* Payment Details */}
           <div className="bg-white border border-gray-200 rounded-2xl p-5 md:p-6">
              <h2 className="font-cinzel text-lg mb-3">Payment Info</h2>
              <div className="text-sm text-gray-600 space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Method</span>
                  <span className="uppercase">{order.paymentid?.payment_mode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Status</span>
                  <span className="capitalize">{order.paymentid?.payment_status}</span>
                </div>
                <div className="flex justify-between mt-2 pt-2 border-t">
                  <span className="font-medium">Invoice No.</span>
                  <span>{order.paymentid?.invoice}</span>
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}