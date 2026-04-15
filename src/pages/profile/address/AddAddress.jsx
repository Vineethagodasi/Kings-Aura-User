import React from "react";
import closeIcon from "../../../assets/images/close.png";

export default function AddAddress({
  setShowModal,
  formData,
  handleChange,
  handleSubmit,
  editData,
  loading,
}) {
  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={() => setShowModal(false)}
    >
      <div
        className="bg-white w-[90%] md:w-[600px] rounded-3xl p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-5 right-5 border border-primary text-primary w-10 h-10 rounded-full flex items-center justify-center"
        >
          <img src={closeIcon} className="w-5 h-5" alt="" />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-cinzel text-heading mb-6">
          {editData ? "Edit Address" : "Add New Address"}
        </h2>

        {/* Form */}
        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Address Type */}
            <select
              name="placeType"
              value={formData.placeType}
              onChange={handleChange}
              className="col-span-1 md:col-span-2 w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-primary"
            >
              <option>Select Type</option>
              <option value="home">Home</option>
              <option value="office">Office</option>
            </select>

            {/* Full Name */}
            <input
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              type="text"
              placeholder="Full Name"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-primary"
            />

            {/* Phone */}
            <input
              name="mobilenumber"
              value={formData.mobilenumber}
              onChange={handleChange}
              type="text"
              placeholder="Phone Number"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-primary"
            />

            {/* Email */}
            <input
              name="emailaddress"
              value={formData.emailaddress}
              onChange={handleChange}
              type="email"
              placeholder="Email Address"
              className="col-span-1 md:col-span-2 w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-primary"
            />

            {/* Address Line */}
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              type="text"
              placeholder="Address Line"
              className="col-span-1 md:col-span-2 w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-primary"
            />

            {/* City */}
            <input
              name="city"
              value={formData.city}
              onChange={handleChange}
              type="text"
              placeholder="City"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-primary"
            />

            {/* State */}
            <input
              name="state"
              value={formData.state}
              onChange={handleChange}
              type="text"
              placeholder="State"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-primary"
            />

            {/* Pincode */}
            <input
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              type="text"
              placeholder="Pincode"
              className="col-span-1 md:col-span-2 w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-primary"
            />
          </div>

          {/* Button */}
          <button
            onClick={handleSubmit}
            type="button"
            disabled={loading}
            className="w-full bg-primary text-black font-medium py-3 rounded-xl mt-6 disabled:opacity-80"
          >
            {loading
              ? editData
                ? "Updating..."
                : "Saving..."
              : editData
                ? "Update Address →"
                : "Save Address →"}
          </button>
        </form>
      </div>
    </div>
  );
}
