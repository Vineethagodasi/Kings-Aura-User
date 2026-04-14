import { Camera } from "lucide-react";
import React, { useState } from "react";

export default function Settings() {
  const [preferences, setPreferences] = useState({
    email: true,
    orders: true,
    promo: false,
  });

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

      {/* Profile Image */}
      <div className="mb-6 md:mb-10">
        <div className="relative w-16 md:w-20 lg:w-24 h-16 md:h-20 lg:h-24">
          <img
            src="https://i.pravatar.cc/150"
            alt="profile"
            className="w-full h-full rounded-full border-4 border-primary object-cover"
          />
          <div className="absolute bottom-0 right-0 bg-primary text-white p-0.5 md:p-1 rounded-full">
            <Camera size={14} className="md:w-4 md:h-4" />
          </div>
        </div>
      </div>

      {/* Forms */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10 mb-8 md:mb-14">
        {/* Profile Info */}
        <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 shadow-sm border">
          <h2 className="font-cinzel text-lg md:text-xl text-heading mb-4 md:mb-6">
            Profile Information
          </h2>

          <div className="space-y-3 md:space-y-5">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border rounded-lg md:rounded-xl px-3 md:px-4 py-2 md:py-3 text-sm md:text-base focus:outline-none focus:border-primary"
            />
            <input
              type="email"
              placeholder="Email address"
              className="w-full border rounded-lg md:rounded-xl px-3 md:px-4 py-2 md:py-3 text-sm md:text-base focus:outline-none focus:border-primary"
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="w-full border rounded-lg md:rounded-xl px-3 md:px-4 py-2 md:py-3 text-sm md:text-base focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* Security */}
        <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 shadow-sm border">
          <h2 className="font-cinzel text-lg md:text-xl text-heading mb-4 md:mb-6">
            Security
          </h2>

          <div className="space-y-3 md:space-y-5">
            <input
              type="password"
              placeholder="Current Password"
              className="w-full border rounded-lg md:rounded-xl px-3 md:px-4 py-2 md:py-3 text-sm md:text-base focus:outline-none focus:border-primary"
            />
            <input
              type="password"
              placeholder="New Password"
              className="w-full border rounded-lg md:rounded-xl px-3 md:px-4 py-2 md:py-3 text-sm md:text-base focus:outline-none focus:border-primary"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full border rounded-lg md:rounded-xl px-3 md:px-4 py-2 md:py-3 text-sm md:text-base focus:outline-none focus:border-primary"
            />
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="mb-8 md:mb-10">
        <h2 className="font-cinzel text-lg md:text-xl text-heading mb-4 md:mb-6">
          Preferences
        </h2>

        <div className="space-y-4 md:space-y-6 ">
          {/* Email Notifications */}
          <div className="flex justify-between items-center">
            <span className="font-inter text-subheading text-sm md:text-base">
              Email Notifications
            </span>

            <button
              onClick={() =>
                setPreferences({
                  ...preferences,
                  email: !preferences.email,
                })
              }
              className={`w-10 md:w-12 h-5 md:h-6 flex items-center rounded-full p-0.5 md:p-1 transition
        ${preferences.email ? "bg-primary" : "bg-gray-300"}`}
            >
              <div
                className={`bg-white w-3 md:w-4 h-3 md:h-4 rounded-full shadow-md transform transition
          ${preferences.email ? "translate-x-5 md:translate-x-6" : "translate-x-0"}`}
              />
            </button>
          </div>

          {/* Order Updates */}
          <div className="flex justify-between items-center">
            <span className="font-inter text-subheading text-sm md:text-base">
              Order Updates
            </span>

            <button
              onClick={() =>
                setPreferences({
                  ...preferences,
                  orders: !preferences.orders,
                })
              }
              className={`w-10 md:w-12 h-5 md:h-6 flex items-center rounded-full p-0.5 md:p-1 transition
        ${preferences.orders ? "bg-primary" : "bg-gray-300"}`}
            >
              <div
                className={`bg-white w-3 md:w-4 h-3 md:h-4 rounded-full shadow-md transform transition
          ${preferences.orders ? "translate-x-5 md:translate-x-6" : "translate-x-0"}`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <button className="bg-primary w-full max-w-[400px] hover:bg-primaryDark text-black px-6 md:px-8 lg:px-10 py-2 md:py-3 lg:py-4 rounded-lg md:rounded-xl font-inter transition text-sm md:text-base">
        Save Changes →
      </button>
    </div>
  );
}
