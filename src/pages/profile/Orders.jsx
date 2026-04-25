import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../services/axiosInstance";
import productImg from "../../assets/images/product1.png";
import { showError, showSuccess } from "../../utils/toast";

export default function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState("all");
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [cancelLoading, setCancelLoading] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, [page, filter]);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      let url = `/user/order/myorders?page=${page}&limit=5`;

      // 🔥 add filter params
      if (filter === "delivered") url += "&delivered=true";
      if (filter === "processing") url += "&processing=true";
      if (filter === "cancelled") url += "&cancelled=true";

      const response = await axiosInstance.get(url);

      if (response.data?.success) {
        setOrders(response.data.data || []);
        setTotalPages(response.data.totalpages || 1);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (value) => {
    setFilter(value);
    setPage(1); // reset to first page
  };

  const openCancelModal = (id) => {
    setSelectedOrderId(id);
    setShowCancelModal(true);
  };

  const handleCancelOrder = async () => {
    try {
      setCancelLoading(true);

      const res = await axiosInstance.put(
        `/user/order/cancel/${selectedOrderId}`,
      );

      if (res.data?.success) {
        showSuccess(res.data.message);
        setShowCancelModal(false);
        fetchOrders(); // refresh
      }
    } catch (err) {
      showError(err.response?.data?.message || "Failed to cancel order");
    } finally {
      setCancelLoading(false);
    }
  };

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
        <button
          onClick={() => handleFilterChange("all")}
          className={`px-5 py-2 rounded-full text-sm ${
            filter === "all" ? "bg-primary text-white" : "border"
          }`}
        >
          All Orders
        </button>

        <button
          onClick={() => handleFilterChange("delivered")}
          className={`px-5 py-2 rounded-full text-sm ${
            filter === "delivered" ? "bg-primary text-white" : "border"
          }`}
        >
          Delivered
        </button>

        <button
          onClick={() => handleFilterChange("processing")}
          className={`px-5 py-2 rounded-full text-sm ${
            filter === "processing" ? "bg-primary text-white" : "border"
          }`}
        >
          Processing
        </button>

        <button
          onClick={() => handleFilterChange("cancelled")}
          className={`px-5 py-2 rounded-full text-sm ${
            filter === "cancelled" ? "bg-primary text-white" : "border"
          }`}
        >
          Cancelled
        </button>
      </div>

      {/* Orders List */}
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : error ? (
        <p className="text-red-500 text-center py-10">{error}</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-500 py-10">
          You have no orders yet.
        </p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => {
            const firstProduct = order.products?.[0];
            return (
              <div
                key={order._id || order.orderId}
                className="bg-white border border-gray-200 rounded-2xl p-4 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >
                {/* LEFT */}
                <div className="flex flex-col sm:flex-row gap-4 md:gap-5">
                  {/* Image */}
                  <div className="border p-2 rounded-xl flex-shrink-0">
                    <img
                      src={firstProduct?.productimages || productImg}
                      alt={firstProduct?.productname || "Product"}
                      className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <h3 className="font-cinzel text-base md:text-lg text-heading">
                      {firstProduct?.productname || "N/A"}{" "}
                      {order.products?.length > 1 && (
                        <span className="text-sm text-gray-500 lowercase">
                          (+{order.products.length - 1} more)
                        </span>
                      )}
                    </h3>

                    {/* Order Details */}
                    <div className="flex flex-col md:flex-row md:gap-8 text-xs md:text-sm text-gray-600 mt-2 space-y-1 md:space-y-0">
                      <p>Order #{order.orderId}</p>

                      <p>
                        Qty:{" "}
                        {order.products?.reduce(
                          (acc, p) => acc + (p.cartquantity || 1),
                          0,
                        ) || 1}
                      </p>
                    </div>

                    <div className="flex my-4 md:hidden md:flex-col justify-between md:items-end items-center gap-2 md:gap-4 mt-2 md:mt-0">
                      <p className="text-primary font-semibold text-base md:text-lg">
                        ₹{order.orderamount?.toLocaleString("en-IN") || 0}
                      </p>

                      <span className="bg-green-100 text-green-700 px-3 md:px-4 py-1 rounded-full text-xs md:text-sm capitalize">
                        {order.status?.replace(/_/g, " ")}
                      </span>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row flex-wrap gap-2 md:gap-4 mt-3 md:mt-4">
                      <button
                        onClick={() =>
                          navigate(`/profile/track-order/${order._id}`)
                        }
                        className="bg-primary text-white px-4 md:px-5 py-2 rounded-full text-xs md:text-sm w-full sm:w-auto"
                      >
                        Track Order
                      </button>

                      <button
                        onClick={() => navigate(`/profile/orders/${order._id}`)}
                        className="border border-primary text-primary px-4 md:px-5 py-2 rounded-full text-xs md:text-sm w-full sm:w-auto"
                      >
                        View Details
                      </button>

                      <button
                        disabled={
                          order.status === "delivered" ||
                          order.status === "cancelled"
                        }
                        onClick={() => openCancelModal(order._id)}
                        className={`px-4 md:px-5 py-2 rounded-full text-xs md:text-sm w-full sm:w-auto border
                        ${
                          order.status === "delivered" ||
                          order.status === "cancelled"
                            ? "border-gray-300 text-gray-400 cursor-not-allowed"
                            : "border-red-500 text-red-500"
                        }
                      `}
                      >
                        Cancel Order
                      </button>
                    </div>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="hidden md:flex md:flex-col justify-between md:items-end items-center gap-2 md:gap-4 mt-2 md:mt-0">
                  <p className="text-primary font-semibold text-base md:text-lg mt-auto">
                    ₹{order.orderamount?.toLocaleString("en-IN") || 0}
                  </p>

                  <span className="bg-green-100 text-green-700 px-3 md:px-4 py-1 rounded-full text-xs md:text-sm capitalize mt-auto">
                    {order.status?.replace(/_/g, " ")}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="flex justify-center items-center gap-4 mt-8">
        {/* Previous */}
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className={`px-4 py-2 rounded-full border bg-primary text-sm ${
            page === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-primary/90"
          }`}
        >
          Previous
        </button>

        {/* Page Info */}
        <span className="text-sm text-gray-600">
          Page {page} of {totalPages}
        </span>

        {/* Next */}
        <button
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className={`px-4 py-2 rounded-full border bg-primary text-sm ${
            page === totalPages
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-primary/90"
          }`}
        >
          Next
        </button>
      </div>

      {showCancelModal && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={() => setShowCancelModal(false)}
        >
          <div
            className="bg-white w-[90%] md:w-[520px] space-y-6 rounded-3xl p-8 text-center shadow-xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Title */}
            <h2 className="text-2xl font-semibold text-heading mb-2">
              Cancel Order
            </h2>

            {/* Message */}
            <p className="text-subheading text-base mb-6 leading-relaxed">
              Are you sure you want to cancel this order?
            </p>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-2.5 rounded-xl hover:bg-gray-100 transition"
              >
                No
              </button>

              <button
                onClick={handleCancelOrder}
                disabled={cancelLoading}
                className="flex-1 bg-primary text-white py-2.5 rounded-xl hover:bg-red-600 transition disabled:opacity-50"
              >
                {cancelLoading ? "Cancelling..." : "Yes, Cancel"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
