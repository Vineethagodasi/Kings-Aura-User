import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance";
import productImg from "../assets/images/product1.png";
import orderCrown from "../assets/images/orderCrown.png"; 
import { useDispatch } from "react-redux";
import { clearCart, fetchCart } from "../redux/cart/cartSlice";

function OrderSuccess() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);

    const dispatch = useDispatch();


useEffect(() => {
  const fetchOrder = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/user/order/${id}`);
      if (res.data?.success) {
        setOrder(res.data.data);
         dispatch(fetchCart());
        // trigger animation after data loads
        setTimeout(() => setShow(true), 100);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (id) fetchOrder();
}, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-20 min-h-[60vh] mt-32">
        <h2 className="text-2xl font-cinzel text-heading mb-4">Order Not Found</h2>
        <Link to="/" className="text-primary underline">Return to Home</Link>
      </div>
    );
  }

  return (
<section
  className={` min-h-screen pt-36 pb-24 px-4 md:px-8 transition-all duration-700 ease-out ${
    show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
  }`}
>      <div className="max-w-2xl mx-auto text-center flex flex-col items-center">
        
        {/* Crown Icon / Logo area */}
        <div className="mb-6 text-primary flex justify-center">
           {/* Fallback crown via SVG standard */}
           <img src={orderCrown} alt="order crown" className="w-12 h-12" />
        </div>

        {/* Headings */}
        <h1 className="text-3xl md:text-4xl font-cinzel text-heading uppercase tracking-wide mb-3">
          Your Order is Confirmed
        </h1>
        <p className="text-gray-600 mb-6 text-sm md:text-base">
          Your royal attire is being prepared and will be delivered soon.
        </p>

        {/* Order Metadata */}
        <div className="flex flex-wrap justify-center items-center gap-4 text-xs md:text-sm text-gray-500 mb-8 w-full">
          <p>Order ID: <span className="font-semibold text-primary">#{order.orderId}</span></p>
          <span className="hidden md:inline-block text-primary/30">|</span>
          <p>Estimated Delivery: <span className="font-semibold text-gray-700">3-5 days</span></p>
        </div>

        {/* Decorative Divider */}
        {/* <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent mb-10"></div> */}

        {/* Order Card Container */}
        <div className="w-full max-w-xl bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 text-left">
          
          {/* Items List */}
          <div className="space-y-6 mb-6">
            {order.products?.map((item) => (
              <div key={item._id || item.productId} className="flex gap-4 items-center">
                <img
                  src={item.productimages || productImg}
                  alt={item.productname}
                  className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-xl border border-gray-100"
                />
                
                <div className="flex-1">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-cinzel text-sm md:text-base text-heading leading-tight">
                      {item.productname}
                    </h3>
                    <p className="font-semibold text-primary text-sm md:text-base whitespace-nowrap">
                      ₹{item.productprice?.toLocaleString("en-IN")}
                    </p>
                  </div>
                  
                  <p className="text-xs text-gray-500 mt-1 capitalize">
                    Size: {item.size} <span className="mx-1">|</span> Color: {item.color}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <hr className="border-gray-100 mb-6" />

          {/* Total */}
          <div className="flex justify-between items-center mb-8">
            <p className="font-medium text-gray-600">Total Paid:</p>
            <p className="text-xl font-cinzel font-semibold text-primary">
              ₹{order.orderamount?.toLocaleString("en-IN")}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap md:flex-nowrap gap-3">
            <button 
              onClick={() => navigate(`/profile/orders/${order._id}`)}
              className="w-full bg-primary text-white py-3 md:py-4 rounded-xl text-sm md:text-base transition-transform hover:-translate-y-0.5 shadow-md flex items-center justify-center gap-2"
            >
              Track Your Order <span>&rarr;</span>
            </button>
            <button 
              onClick={() => navigate("/collection")}
              className="w-full border border-primary text-primary py-3 md:py-4 rounded-xl text-sm md:text-base transition-colors hover:bg-primary/5"
            >
              Return to Store
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

export default OrderSuccess;