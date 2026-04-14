import React, { useState } from "react";
import { Plus, Pencil, Trash2, Phone } from "lucide-react";
import closeIcon from "../../assets/images/close.png";


export default function Address() {
  const [showModal, setShowModal] = useState(false);

  const addresses = [
    {
      name: "Ajay Beerla",
      type: "Home",
      default: true,
      address:
        "Flat 204, Royal Heights Kukatpally, Hyderabad Telangana - 500072",
      phone: "+91 98765 43210",
    },
    {
      name: "Ajay Beerla",
      type: "Home",
      default: false,
      address:
        "Flat 204, Royal Heights Kukatpally, Hyderabad Telangana - 500072",
      phone: "+91 98765 43210",
    },
  ];

  return (
    <div className="w-full md:p-6 rounded-3xl">

      {/* Header */}
      <div className="flex justify-between items-center mb-10 flex-wrap gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-cinzel text-heading">
            Saved Addresses
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your delivery locations
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-primary text-white px-5 py-2 rounded-md"
        >
          <Plus size={18} />
          Add New Address
        </button>
      </div>

      {/* Address Cards */}
      <div className="grid md:grid-cols-2 gap-6">

        {addresses.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-2xl p-5"
          >

            {/* Top */}
            <div className="flex justify-between items-center mb-3">

              {item.default ? (
                <span className="border border-primary text-primary text-sm px-4 py-1 rounded-lg">
                  Default Address
                </span>
              ) : (
                <span className="text-gray-500 text-sm cursor-pointer">
                  Set as Default
                </span>
              )}

              <div className="flex gap-4 text-primary">
                <Pencil size={18} className="cursor-pointer" />
                <Trash2 size={18} className="cursor-pointer" />
              </div>
            </div>

            {/* Type */}
            <span className="inline-block bg-[#F3EFE6] text-primary text-xs px-3 py-1 rounded-md">
              {item.type}
            </span>

            {/* Info */}
            <div className="mt-4">
              <h3 className="font-semibold text-heading text-lg">
                {item.name}
              </h3>

              <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                {item.address}
              </p>

              <div className="flex items-center gap-2 mt-3 text-sm text-gray-600">
                <Phone size={14} className="text-primary" />
                {item.phone}
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* MODAL */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white w-[90%] md:w-[500px] rounded-3xl p-8 relative"
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
              Add New Address
            </h2>

            {/* Form */}
            <div className="space-y-4">

              <input
                type="text"
                placeholder="Full Name"
                className="w-full border border-gray-300 focus:outline-none focus:border-primary rounded-xl px-4 py-3 outline-none"
              />

              <input
                type="text"
                placeholder="Phone Number"
                className="w-full border border-gray-300 focus:outline-none focus:border-primary rounded-xl px-4 py-3 outline-none"
              />

              <input
                type="text"
                placeholder="Address Line"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:outline-none focus:border-primary"
              />

                <input
                  type="text"
                  placeholder="City"
                  className="w-full border border-gray-300 rounded-xl focus:outline-none focus:border-primary px-4 py-3 outline-none"
                />
                <input
                  type="text"
                  placeholder="State"
                  className="w-full border border-gray-300 rounded-xl focus:outline-none focus:border-primary px-4 py-3 outline-none"
                />

              <input
                type="text"
                placeholder="Pincode"
                className="w-full border border-gray-300 focus:outline-none focus:border-primary rounded-xl px-4 py-3 outline-none"
              />

              <button className="w-full bg-primary text-black font-medium py-3 rounded-xl mt-4">
                Save Address →
              </button>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}