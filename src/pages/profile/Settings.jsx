import { Camera } from "lucide-react";
import React, { useEffect, useState } from "react";
import { getMe, updateUserDetails } from "../../constants/auth";
import { showError, showSuccess } from "../../utils/toast";
import { setUser } from "../../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Settings() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  const [preferences, setPreferences] = useState({
    email: true,
    orders: true,
  });

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        emailnotifications: preferences.email,
        orderupdates: preferences.orders,
      };

      // ✅ add only if exists
      if (formData.fullname) payload.fullname = formData.fullname;
      if (formData.email) payload.email = formData.email;
      if (formData.phone) payload.phone = Number(formData.phone);
      if (formData.gender) payload.gender = formData.gender;

      const res = await updateUserDetails(payload);

      if (res?.data?.success) {
        const userRes = await getMe();

        if (userRes?.data?.user_response) {
          // Update Redux state so it persists
          dispatch(setUser(userRes.data.user_response));
        }

        showSuccess(res.data.message || "Profile updated successfully");
      }

    } catch (error) {
      showError(error?.response?.data?.message || "Something went wrong");
    }
  };

useEffect(() => {
  if (user) {
    setPreferences({
      email: user.emailnotifications ?? false,
      orders: user.orderupdates ?? false,
    });

    setFormData({
      fullname: user.fullname || "",
      email: user.email || "",
      phone: user.phone || "",
      gender: user.gender || "",
    });
  }
}, [user]);

  let inputStyles =
    "w-full border rounded-lg md:rounded-xl px-3 md:px-4 py-2 md:py-3 text-sm md:text-base focus:outline-none focus:border-primary";
  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6 md:mb-10">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-cinzel font-bold text-heading">
          Account Settings
        </h1>
        <p className="text-sm md:text-base text-gray-600 mt-2">
          Manage your personal details and preferences
        </p>
      </div>

      {/* Forms */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 mb-8 md:mb-14">
          {/* Profile Info */}
          <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 shadow-sm border">
            <h2 className="font-cinzel text-lg md:text-xl text-heading mb-4 md:mb-6">
              Profile Information
            </h2>

            <div className="space-y-3 md:space-y-5">
              <input
                name="fullname"
                type="text"
                placeholder="Full Name"
                className={inputStyles}
                value={formData.fullname}
                onChange={handleChange}
              />

              <input
                name="email"
                type="email"
                placeholder="Email address"
                className={inputStyles}
                value={formData.email}
                onChange={handleChange}
              />

              <input
                name="phone"
                type="text"
                placeholder="Phone Number"
                className={inputStyles}
                value={formData.phone}
                onChange={handleChange}
              />
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                id="gender"
                className={inputStyles}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="mb-8 md:mb-10">
          <h2 className="font-cinzel text-lg md:text-xl text-heading mb-4 md:mb-6">
            Preferences
          </h2>

          <div className="space-y-4 md:space-y-6">
            {/* Email Notifications */}
            <div className="flex justify-between items-center">
              <label
                htmlFor="email-notifications"
                className="font-inter text-subheading text-sm md:text-base cursor-pointer"
              >
                Email Notifications
              </label>

              <label
                htmlFor="email-notifications"
                className={`w-10 md:w-12 h-5 md:h-6 flex items-center rounded-full p-0.5 md:p-1 transition cursor-pointer
          ${preferences.email ? "bg-primary" : "bg-gray-300"}`}
              >
                <input
                  type="checkbox"
                  id="email-notifications"
                  name="emailnotifications"
                  checked={preferences.email}
                  onChange={(e) =>
                    setPreferences({
                      ...preferences,
                      email: e.target.checked,
                    })
                  }
                  className="sr-only"
                />
                <div
                  className={`bg-white w-3 md:w-4 h-3 md:h-4 rounded-full shadow-md transform transition pointer-events-none
            ${preferences.email ? "translate-x-5 md:translate-x-6" : "translate-x-0"}`}
                />
              </label>
            </div>

            {/* Order Updates */}
            <div className="flex justify-between items-center">
              <label
                htmlFor="order-updates"
                className="font-inter text-subheading text-sm md:text-base cursor-pointer"
              >
                Order Updates
              </label>

              <label
                htmlFor="order-updates"
                className={`w-10 md:w-12 h-5 md:h-6 flex items-center rounded-full p-0.5 md:p-1 transition cursor-pointer
          ${preferences.orders ? "bg-primary" : "bg-gray-300"}`}
              >
                <input
                  type="checkbox"
                  id="order-updates"
                  name="orderupdates"
                  checked={preferences.orders}
                  onChange={(e) =>
                    setPreferences({
                      ...preferences,
                      orders: e.target.checked,
                    })
                  }
                  className="sr-only"
                />
                <div
                  className={`bg-white w-3 md:w-4 h-3 md:h-4 rounded-full shadow-md transform transition pointer-events-none
            ${preferences.orders ? "translate-x-5 md:translate-x-6" : "translate-x-0"}`}
                />
              </label>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <button
          type="submit"
          className="bg-primary w-full max-w-[400px] hover:bg-primaryDark text-black px-6 md:px-8 lg:px-10 py-2 md:py-3 lg:py-4 rounded-lg md:rounded-xl font-inter transition text-sm md:text-base"
        >
          Save Changes →
        </button>
      </form>
    </div>
  );
}
