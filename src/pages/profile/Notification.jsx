import { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosInstance";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get("/user/notification");

      if (res.data?.success) {
        setNotifications(res.data.data || []);
      }
    } catch (err) {
      console.log("Notification error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:p-6 rounded-3xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="section-heading">Notifications</h1>
        <p className="section-subheading">
          Stay updated with your latest activity
        </p>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin h-8 w-8 border-b-2 border-primary rounded-full"></div>
        </div>
      ) : notifications.length === 0 ? (
        <p className="text-center text-subheading py-12">
          No notifications found
        </p>
      ) : (
        <div className="space-y-6">
          {notifications.map((item) => (
            <div
              key={item._id}
              className="bg-white border border-gray-100 rounded-2xl p-5 md:p-6 flex flex-col gap-4 hover:shadow-md transition"
            >
              <div className="flex flex-wrap sm:justify-end items-start">
                <span className="text-xs text-subheading/60 whitespace-nowrap">
                  {new Date(item.createdAt).toLocaleString("en-IN")}
                </span>
              </div>
              {/* TOP */}
              <div className="flex flex-wrap justify-between items-start gap-4">
                <h3 className="font-cinzel text-primary text-lg md:text-xl">
                  {item.notificationtitle}
                </h3>
              </div>

              {/* MESSAGE */}
              <p className="text-subheading text-sm md:text-base">
                {item.notificationmessage}
              </p>

              {/* DETAILS GRID */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs md:text-sm text-subheading/80">
                <div>
                  <p className="text-subheading/60">Type</p>
                  <p className="capitalize font-medium text-heading">
                    {item.notificationtype}
                  </p>
                </div>

                <div>
                  <p className="text-subheading/60">Status</p>
                  <p className="capitalize font-medium text-heading">
                    {item.notificationstatus}
                  </p>
                </div>

                <div>
                  <p className="text-subheading/60">Delivery</p>
                  <p className="capitalize font-medium text-heading">
                    {item.delivery_status}
                  </p>
                </div>

                <div>
                  <p className="text-subheading/60">Scheduled</p>
                  <p className="font-medium text-heading">
                    {item.scheduletime
                      ? new Date(item.scheduletime).toLocaleDateString("en-IN")
                      : "Instant"}
                  </p>
                </div>
              </div>

              {/* BADGES */}
              <div className="flex gap-3 flex-wrap">
                <span
                  className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize
                ${
                  item.notificationtype?.toLowerCase() === "order"
                    ? "bg-primary/10 text-primaryDark"
                    : item.notificationtype?.toLowerCase() === "offer"
                      ? "bg-primary/20 text-primaryDark"
                      : "bg-primary/10 text-primary"
                }
              `}
                >
                  {item.notificationtype}
                </span>

                <span className="px-4 py-1.5 rounded-full text-xs bg-primary/10 text-primaryDark capitalize">
                  {item.delivery_status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Notifications;
