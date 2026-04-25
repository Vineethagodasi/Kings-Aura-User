import React, { useState, useEffect } from "react";
import productImg from "../../assets/images/product1.png";
import axiosInstance from "../../services/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalOrders: 0,
    totalAddress: 0,
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // 🔥 Orders API (same as Orders page)
      const ordersRes = await axiosInstance.get(
        "/user/order/myorders?page=1&limit=4"
      );

      if (ordersRes.data?.success) {
        setOrders(ordersRes.data.data || []);

        // 👇 stats from same response (adjust if API differs)
        setStats({
          totalOrders: ordersRes.data.TotalOrders || 0,
          totalAddress: ordersRes.data.TotalAddressLocations || 0,
        });
      }
    } catch (err) {
      console.log("Dashboard error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 md:gap-8 lg:gap-11">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-cinzel font-bold text-heading">
          Your Dashboard
        </h1>
        <p className="text-sm md:text-base text-gray-600 mt-2">
          Manage your account and orders
        </p>
      </div>

      {/* ✅ Stats (Dynamic) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl px-4 py-6 text-center shadow-sm border">
          <h3 className="text-primary text-xl font-semibold">
            {stats.totalOrders}
          </h3>
          <p className="text-gray-600 text-sm mt-2">Total Orders</p>
        </div>

        <div className="bg-white rounded-xl px-4 py-6 text-center shadow-sm border">
          <h3 className="text-primary text-xl font-semibold">
            {stats.totalAddress}
          </h3>
          <p className="text-gray-600 text-sm mt-2">Saved Addresses</p>
        </div>
      </div>

      {/* ✅ Recent Orders */}
      <div className="mt-4">
        <h2 className="text-2xl md:text-3xl font-cinzel text-heading mb-6">
          Recent Orders
        </h2>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : orders.length === 0 ? (
          <p className="text-gray-500 text-center">No orders found</p>
        ) : (
          <div className="grid xl:grid-cols-2 gap-6">
            {orders.map((order) => {
              const firstProduct = order.products?.[0];

              return (
                <div
                  key={order._id}
                  className="bg-white rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-5 border border-gray-200"
                >
                  {/* Image */}
                  <img
                    onClick={() => navigate(`/profile/orders/${order._id}`)}
                    src={firstProduct?.productimages || productImg}
                    alt="product"
                    className="w-24 h-24 object-cover cursor-pointer rounded-lg"
                  />
                  

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="text-heading text-lg font-medium">
                        {firstProduct?.productname || "N/A"}
                      </h3>
                    </div>

                    <div className="flex md:justify-end items-center mt-2">
                      <p className="text-primaryDark text-lg font-medium">
                        ₹
                        {order.orderamount?.toLocaleString("en-IN") || 0}
                      </p>
                    </div>

                    {/* Order Info */}
                    <div className="text-sm text-gray-600 mt-3 space-y-1">
          
                      <div className="flex justify-between">
                        <p>Order Status</p>
                        <p className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs capitalize">
                          {order.status?.replace(/_/g, " ")}
                        </p>
                      </div>

                      <p className="text-xs text-gray-500 mt-2">
                        {new Date(order.createdAt).toLocaleDateString("en-IN")}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}