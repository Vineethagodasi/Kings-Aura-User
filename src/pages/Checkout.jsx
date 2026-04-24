import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import bgImg from "../assets/images/cart/cartBg.png";
import img1 from "../assets/images/product1.png";
import exploreBtn from "../assets/images/exploreBtn.png";

import axiosInstance from "../services/axiosInstance";
import { fetchCart } from "../redux/cart/cartSlice";
import { addAddress, getAddresses, updateAddress } from "../constants/address";

import AddAddress from "../pages/profile/address/AddAddress";
import { Pencil } from "lucide-react";
import { showSuccess } from "../utils/toast";
import { useNavigate, useLocation } from "react-router-dom";

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { items: cartItems } = useSelector((state) => state.cart);

  // 🛒 Check if this is a "Buy Now" single product order
  const isBuyNow = location.state?.isBuyNow || false;
  const buyNowProduct = location.state?.product || null;

  // Address State
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);

  // Modal Form State (reuse)
  const [formData, setFormData] = useState({
    placeType: "",
    fullname: "",
    mobilenumber: "",
    emailaddress: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    isdefault: false,
  });
  const [editData, setEditData] = useState(null);

  // Payment Mode
  const [paymentMode, setPaymentMode] = useState("COD");

  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [discount, setDiscount] = useState(0);

  const applyCoupon = async () => {
    if (!coupon) return;

    try {
      const res = await axiosInstance.post("/coupon/apply", {
        coupon: coupon,
      });

      if (res.data.success) {
        showSuccess(res.data.message);
        setAppliedCoupon(coupon);

        // fetch coupon details
        const allCoupons = await axiosInstance.get("/coupon/all");

        const couponData = allCoupons.data.data.find(
          (c) => c.couponCode === coupon,
        );

        if (!couponData) return;

        if (couponData.discountType === "percentage") {
          const disc = (totals.subtotal * couponData.discountpercentage) / 100;
          setDiscount(disc);
        } else {
          setDiscount(couponData.discountamount);
        }
      }
    } catch (err) {
      alert(err.response?.data?.message || "Invalid coupon");
    }
  };

  // Fetch cart (only if NOT buy now)
  useEffect(() => {
    if (!isBuyNow) {
      dispatch(fetchCart());
    }
  }, [dispatch, isBuyNow]);

  // Fetch addresses
  const fetchAddresses = async () => {
    try {
      const res = await getAddresses();
      if (res?.data?.success) {
        const data = res.data.data || [];
        setAddresses(data);

        // auto select default
        const defaultAddr = data.find((a) => a.isdefault);
        if (defaultAddr) setSelectedAddress(defaultAddr._id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Handle input change for modal
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleEdit = (item) => {
    setEditData(item);

    setFormData({
      placeType: item.placeType || "",
      fullname: item.contactinfo?.fullname || "",
      mobilenumber: item.contactinfo?.mobilenumber || "",
      emailaddress: item.contactinfo?.emailAddress || "",
      address: item.shippingAddress?.address || "",
      city: item.shippingAddress?.city || "",
      state: item.shippingAddress?.state || "",
      pincode: item.shippingAddress?.pincode || "",
      isdefault: item.isdefault || false,
    });

    setShowModal(true);
  };

  // Submit address (reuse API)
  const handleSubmit = async () => {
    try {
      setLoading(true);
      let res;

      if (editData) {
        // ✏️ UPDATE
        res = await updateAddress(editData._id, formData);
      } else {
        // ➕ ADD
        res = await addAddress(formData);
      }

      if (res?.data?.success) {
        showSuccess(res.data.message);

        setShowModal(false);
        setEditData(null);

        setFormData({
          placeType: "",
          fullname: "",
          mobilenumber: "",
          emailaddress: "",
          address: "",
          city: "",
          state: "",
          pincode: "",
          isdefault: false,
        });

        fetchAddresses();
      }
    } catch (error) {
      console.error("Error saving address:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  // Prepare IDs based on whether it's Buy Now or Cart
  const ids = isBuyNow
    ? buyNowProduct?.productId
    : cartItems.map((item) => item._id).join(",");

  // Create Order
  const createOrder = async () => {
    let payload = {
      addressid: selectedAddress,
      paymentmode: paymentMode,
      couponCode: appliedCoupon || "",
    };

    // 🔥 ADD size, color, quantity ONLY for Buy Now
    if (isBuyNow && buyNowProduct) {
      payload.size = buyNowProduct.size;
      payload.color = buyNowProduct.color;
      payload.cartquantity = buyNowProduct.quantity;
    }

    const res = await axiosInstance.post(`/user/order/${ids}`, payload);
    return res.data;
  };

  // Verify Payment
  const verifyPayment = async (response) => {
    try {
      let orderData = {
        ids: ids,
        addressid: selectedAddress,
      };

      // 🔥 Include size, color, quantity for Buy Now
      if (isBuyNow && buyNowProduct) {
        orderData.size = buyNowProduct.size;
        orderData.color = buyNowProduct.color;
        orderData.cartquantity = buyNowProduct.quantity;
      }

      const res = await axiosInstance.post("/user/order/verify-payment", {
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
        orderData: orderData,
      });

      if (res?.data?.success) {
        const orderId = res.data.order_id;

        setTimeout(() => {
          showSuccess(res.data.message);
          navigate(`/order-success/${orderId}`);
          setProcessingPayment(false);
          setLoading(false);
        }, 800);
      }
    } catch (err) {
      console.log("VERIFY ERROR:", err.response?.data);
      setProcessingPayment(false);
      setLoading(false);
      alert("Payment verification failed");
    }
  };

  // Razorpay
  const handleOnlinePayment = async () => {
    const data = await createOrder();
    console.log("ORDER CREATED:", data);

    const options = {
      key: "rzp_test_P7eTEWTbR1y2Sm",
      amount: data.order.amount,
      currency: "INR",
      name: "Kings Aura",
      description: "Order Payment",
      order_id: data.order.id,
      handler: async function (response) {
        try {
          setProcessingPayment(true);
          await verifyPayment(response);
        } catch (err) {
          alert("Payment verification failed", err.response?.data);
        }
      },
    };

    const rzp = new window.Razorpay(options);

    rzp.on("payment.failed", function (response) {
      console.log(response.error);
      alert("Payment Failed");
    });

    rzp.open();
  };

  // Place Order
  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      alert("Please select address");
      return;
    }

    try {
      setLoading(true);

      if (paymentMode === "COD") {
        const res = await createOrder();

        if (res?.success) {
          setTimeout(() => {
            showSuccess(res.message);
            navigate(`/order-success/${res.order_id}`);
          }, 1200);
        }
      } else {
        await handleOnlinePayment();
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    } finally {
      if (paymentMode === "COD") {
        setLoading(false);
      }
    }
  };

  // 🛒 Get display items (either cart items or single product)
  const displayItems =
    isBuyNow && buyNowProduct
      ? [
          {
            _id: buyNowProduct.productId,
            productDetails: { productname: buyNowProduct.productname },
            cartquantity: buyNowProduct.quantity,
            productprice: buyNowProduct.price || 0,
            prtoducttaxpercentage: buyNowProduct.taxPercentage || 5,
            productshippingcost: buyNowProduct.shippingCost || 0,
            cartImages: buyNowProduct.images || [],
          },
        ]
      : cartItems;

  // Total
  const getPrice = (item) => item?.productprice || 0;

  const totals = displayItems.reduce(
    (acc, item) => {
      const itemSubtotal = getPrice(item) * item.cartquantity;
      const itemTax = (itemSubtotal * (item.prtoducttaxpercentage || 0)) / 100;
      const itemShipping = item.productshippingcost || 0;

      return {
        subtotal: acc.subtotal + itemSubtotal,
        tax: acc.tax + itemTax,
        shipping: acc.shipping + itemShipping,
      };
    },
    { subtotal: 0, tax: 0, shipping: 0 },
  );

  const total = totals.subtotal + totals.tax + totals.shipping - discount;
  if (processingPayment) {
    return (
      <div className="fixed inset-0 bg-black/80 flex flex-col items-center justify-center z-50">
        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-white text-lg font-medium">Processing Payment...</p>
      </div>
    );
  }

  return (
    <section
      className="min-h-screen relative flex items-center justify-center px-4 py-20 pb-32 bg-fixed bg-center bg-cover"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70"></div>

      {/* Main Container */}
      <div className="relative w-full max-w-7xl mt-28">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="font-cinzel text-4xl md:text-5xl text-white mb-3 tracking-wider">
            Checkout
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT SECTION - Address & Payment */}
          <div className="lg:col-span-7 space-y-6">
            {/* DELIVERY ADDRESS CARD */}
            <div className="rounded-2xl backdrop-blur-xl bg-white/10 shadow-2xl border border-white/20 p-6 md:p-8 hover:shadow-primary/10 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <h2 className="font-cinzel text-2xl text-white tracking-wide">
                  Delivery Address
                </h2>
              </div>

              <div className="space-y-3">
                {addresses.map((item, index) => (
                  <div
                    key={item._id}
                    onClick={() => setSelectedAddress(item._id)}
                    className={`group relative z-0 cursor-pointer rounded-xl p-5 border transition-all duration-300 transform ${
                      selectedAddress === item._id
                        ? "border-primary bg-gradient-to-br from-primary/20 to-primary/5 shadow-lg shadow-primary/30 scale-[1.01]"
                        : "border-white/20 bg-white/5 hover:border-primary/50 hover:bg-white/10 hover:scale-[1.01]"
                    }`}
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animation: "slideInLeft 0.5s ease-out forwards",
                    }}
                  >
                    <div className="flex justify-between items-start gap-4">
                      {/* Address Info */}
                      <div className="flex-1">
                        <div className="flex items-center flex-wrap gap-2 mb-2">
                          <span className="inline-block bg-primary text-subheading text-xs px-3 py-1 rounded-md">
                            {item.placeType}
                          </span>

                          <p className="font-semibold text-base text-white">
                            {item.contactinfo?.fullname}
                          </p>
                          {item.isdefault && (
                            <span className="px-2 py-0.5 bg-primary/30 text-primary text-xs rounded-full border border-primary/50">
                              Default
                            </span>
                          )}
                        </div>

                        <p className="text-white/80 text-sm leading-relaxed">
                          {item.shippingAddress?.address}
                        </p>

                        <p className="text-white/70 text-sm mt-1">
                          {item.shippingAddress?.city},{" "}
                          {item.shippingAddress?.state} -{" "}
                          {item.shippingAddress?.pincode}
                        </p>

                        <div className="flex items-center gap-4 mt-3 text-white/60 text-sm">
                          <span className="flex items-center gap-1">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                              />
                            </svg>
                            {item.contactinfo?.mobilenumber}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-4 relative z-99 text-primary">
                        <Pencil
                          onClick={() => handleEdit(item)}
                          size={18}
                          className="cursor-pointer"
                        />
                      </div>

                      {/* Radio Button */}
                      <div className="relative">
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                            selectedAddress === item._id
                              ? "border-primary bg-primary/10 shadow-lg shadow-primary/50"
                              : "border-white/40 group-hover:border-primary/60"
                          }`}
                        >
                          <div
                            className={`w-3 h-3 rounded-full bg-primary transition-all duration-300 ${
                              selectedAddress === item._id
                                ? "scale-100"
                                : "scale-0"
                            }`}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Add New Address Button */}
                {addresses.length < 3 && (
                  <button
                    onClick={() => setShowModal(true)}
                    className="w-full mt-4 py-4 rounded-xl border-2 border-dashed border-white/30 text-white/70 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-300 flex items-center justify-center gap-2 group"
                  >
                    <svg
                      className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    <span className="font-medium">Add New Address</span>
                  </button>
                )}
              </div>
            </div>

            {/* PAYMENT METHOD CARD */}
            <div className="rounded-2xl backdrop-blur-xl bg-white/10 shadow-2xl border border-white/20 p-6 md:p-8 hover:shadow-primary/10 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                </div>
                <h2 className="font-cinzel text-2xl text-white tracking-wide">
                  Payment Method
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Cash on Delivery */}
                <div
                  onClick={() => setPaymentMode("COD")}
                  className={`group cursor-pointer p-6 rounded-xl border-2 text-center transition-all duration-300 transform hover:scale-[1.02] ${
                    paymentMode === "COD"
                      ? "border-primary bg-gradient-to-br from-primary/20 to-primary/5 shadow-lg shadow-primary/30"
                      : "border-white/30 bg-white/5 hover:border-primary/50 hover:bg-white/10"
                  }`}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                        paymentMode === "COD" ? "bg-primary/20" : "bg-white/10"
                      }`}
                    >
                      <svg
                        className={`w-6 h-6 ${paymentMode === "COD" ? "text-primary" : "text-white/70"}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p
                        className={`font-medium transition-colors ${
                          paymentMode === "COD" ? "text-white" : "text-white/80"
                        }`}
                      >
                        Cash on Delivery
                      </p>
                      <p className="text-xs text-white/50 mt-1">
                        Pay when you receive
                      </p>
                    </div>
                  </div>
                </div>

                {/* Online Payment */}
                <div
                  onClick={() => setPaymentMode("online")}
                  className={`group cursor-pointer p-6 rounded-xl border-2 text-center transition-all duration-300 transform hover:scale-[1.02] ${
                    paymentMode === "online"
                      ? "border-primary bg-gradient-to-br from-primary/20 to-primary/5 shadow-lg shadow-primary/30"
                      : "border-white/30 bg-white/5 hover:border-primary/50 hover:bg-white/10"
                  }`}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                        paymentMode === "online"
                          ? "bg-primary/20"
                          : "bg-white/10"
                      }`}
                    >
                      <svg
                        className={`w-6 h-6 ${paymentMode === "online" ? "text-primary" : "text-white/70"}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p
                        className={`font-medium transition-colors ${
                          paymentMode === "online"
                            ? "text-white"
                            : "text-white/80"
                        }`}
                      >
                        Online Payment
                      </p>
                      <p className="text-xs text-white/50 mt-1">
                        UPI, Card, Net Banking
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SECTION - Order Summary */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl backdrop-blur-xl bg-white shadow-2xl p-6 sticky top-28 border border-gray-100">
              <h3 className="font-cinzel text-xl mb-6 text-gray-800 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                Order Summary
              </h3>

              {/* Cart Items */}
              <div className="space-y-4 mb-5 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                {displayItems.map((item, i) => (
                  <div key={i} className="flex gap-3 items-start group">
                    <div className="w-16 h-16 bg-gray-50 rounded-lg overflow-hidden border border-gray-200 group-hover:border-primary/30 transition-colors flex-shrink-0">
                      <img
                        src={item.cartImages?.[0] || img1}
                        className="w-full h-full object-cover"
                        alt={item.productDetails?.productname}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-gray-800 truncate">
                        {item.productDetails?.productname}
                      </p>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-gray-500 text-xs">
                          Qty: {item.cartquantity}
                        </p>
                        <p className="text-primary font-semibold text-sm">
                          ₹
                          {(
                            item.productprice * item.cartquantity
                          ).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="flex-1 border rounded-lg px-3 py-2 text-sm"
                />

                <button
                  onClick={applyCoupon}
                  className="bg-primary text-white px-4 py-2 rounded-lg text-sm"
                >
                  Apply
                </button>
              </div>

              {/* Pricing Breakdown */}
              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{totals.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Shipping</span>
                  {totals.shipping > 0 ? `₹${totals.shipping}` : "Free"}
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Tax (5%)</span>
                  <span>₹{totals.tax.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount</span>
                    <span>- ₹{discount}</span>
                  </div>
                )}
              </div>

              {/* Total */}
              <div className="border-t border-gray-300 mt-4 pt-4">
                <div className="flex justify-between items-center">
                  <span className="font-cinzel text-base text-gray-800">
                    Total
                  </span>
                  <span className="font-bold text-2xl text-primary">
                    ₹{total.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                onClick={handlePlaceOrder}
                disabled={loading}
                className={`w-full mt-6 bg-gradient-to-r from-primary to-primary/90 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2
    ${loading ? "opacity-70 cursor-not-allowed" : "hover:scale-[1.02]"}
  `}
              >
                <img
                  src={exploreBtn}
                  className="w-5 h-5 group-hover:rotate-12 transition-transform"
                  alt=""
                />
                <span>{loading ? "Placing Order..." : "Place Order"}</span>
              </button>

              {/* Security Badge */}
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
                <svg
                  className="w-4 h-4 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <AddAddress
          setShowModal={setShowModal}
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          editData={null}
          loading={loading}
        />
      )}
    </section>
  );
}

export default Checkout;
