import React, { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Phone } from "lucide-react";
import {
  addAddress,
  deleteAddress,
  getAddresses,
  updateAddress,
} from "../../../constants/address";
import { showError, showSuccess } from "../../../utils/toast";
import AddAddress from "./AddAddress";

export default function Address() {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [addresses, setAddresses] = useState([]);

  const fetchAddresses = async () => {
    try {
      const res = await getAddresses();

      if (res?.data?.success) {
        setAddresses(res.data.data || []);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchAddresses();
  }, []);

  const [formData, setFormData] = useState({
    placeType: "",
    fullname: "",
    mobilenumber: "",
    emailaddress: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [editData, setEditData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
    });

    setShowModal(true);
  };

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
        });

        fetchAddresses();
      }
    } catch (error) {
      console.error("Error saving address:", error);
      // showError(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false); // ✅ stop loading
    }
  };

  const handleDelete = async () => {
    try {
      setDeleteLoading(true);

      const res = await deleteAddress(deleteId);

      if (res?.data?.success) {
        showSuccess(res.data.message);

        setShowDeleteModal(false);
        setDeleteId(null);

        fetchAddresses(); // refresh list
      }
    } catch (error) {
      showError(error?.response?.data?.message || "Something went wrong");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="w-full md:p-6 rounded-3xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-10 flex-wrap gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-cinzel text-heading">
            Saved Addresses
          </h1>
          <p className="text-gray-600 mt-2">Manage your delivery locations</p>
        </div>

        <button
          onClick={() => {
            setEditData(null); // 🔥 reset edit mode
            setFormData({
              placeType: "",
              fullname: "",
              mobilenumber: "",
              emailaddress: "",
              address: "",
              city: "",
              state: "",
              pincode: "",
            });
            setShowModal(true);
          }}
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
            key={item._id || index}
            className="bg-white border border-gray-200 rounded-2xl p-5"
          >
            {/* Top */}
            <div className="flex justify-between items-center mb-3">
              {item.isDefault ? (
                <span className="border border-primary text-primary text-sm px-4 py-1 rounded-lg">
                  Default Address
                </span>
              ) : (
                <span className="text-gray-500 text-sm cursor-pointer">
                  Set as Default
                </span>
              )}

              <div className="flex gap-4 text-primary">
                <Pencil
                  onClick={() => handleEdit(item)}
                  size={18}
                  className="cursor-pointer"
                />
                <Trash2
                  size={18}
                  className="cursor-pointer"
                  onClick={() => {
                    setDeleteId(item._id);
                    setShowDeleteModal(true);
                  }}
                />{" "}
              </div>
            </div>

            {/* Type */}
            <span className="inline-block bg-[#F3EFE6] text-primary text-xs px-3 py-1 rounded-md">
              {item.placeType}
            </span>

            {/* Info */}
            <div className="mt-4">
              <h3 className="font-semibold text-heading text-lg">
                {item.contactinfo?.fullname}
              </h3>

              <p className="text-primaryDark text-sm mb-3">
                {item.contactinfo?.emailAddress}
              </p>

              <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                {item.shippingAddress?.address}, {item.shippingAddress?.city},{" "}
                {item.shippingAddress?.state} - {item.shippingAddress?.pincode}
              </p>

              <div className="flex items-center gap-2 mt-3 text-sm text-gray-600">
                <Phone size={14} className="text-primary" />
                {item.contactinfo?.mobilenumber}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {showModal && (
        <AddAddress
          loading={loading}
          formData={formData}
          handleChange={handleChange}
          setShowModal={setShowModal}
          handleSubmit={handleSubmit}
          editData={editData}
        />
      )}

      {showDeleteModal && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={() => setShowDeleteModal(false)}
        >
          <div
            className="bg-white w-[90%] md:w-[520px]  space-y-6 rounded-3xl p-8 text-center shadow-xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Icon */}

            {/* Title */}
            <h2 className="text-2xl font-semibold text-heading mb-2">
              Delete Address
            </h2>

            {/* Message */}
            <p className="text-subheading text-base mb-6 leading-relaxed">
              Are you sure you want to delete this address? <br />
            </p>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-2.5 rounded-xl hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                disabled={deleteLoading}
                className="flex-1 bg-primary text-white py-2.5 rounded-xl hover:bg-red-600 transition disabled:opacity-50"
              >
                {deleteLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}
