import { Camera } from "lucide-react";
import React, { useState } from "react";
import { showError, showSuccess } from "../../utils/toast";
import { changePassword } from "../../constants/auth";
import { Eye, EyeOff } from "lucide-react";

export default function Security() {
  const [passwordData, setPasswordData] = useState({
    oldpassword: "",
    newpassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
  old: false,
  new: false,
  confirm: false,
});

const toggleVisibility = (field) => {
  setShowPassword((prev) => ({
    ...prev,
    [field]: !prev[field],
  }));
};

  function handleChange(e) {
    const { name, value } = e.target;
    setPasswordData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const payload = {
      oldpassword: passwordData.oldpassword,
      newpassword: passwordData.newpassword,
      confirmPassword: passwordData.confirmPassword,
    };

    const res = await changePassword(payload);

    if (res?.data?.message) {
      showSuccess(res.data.message);

      // clear form
      setPasswordData({
        oldpassword: "",
        newpassword: "",
        confirmPassword: "",
      });
    }
  } catch (error) {
    // showError(error?.response?.data?.message || "Something went wrong");
    console.error("Error changing password:", error);
  }
};


  let inputStyles =
    "w-full border rounded-lg md:rounded-xl px-3 md:px-4 py-2 md:py-3 text-sm md:text-base focus:outline-none focus:border-primary";
  
  
    return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6 md:mb-10">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-cinzel font-bold text-heading">
          Security Settings
        </h1>
        <p className="text-sm md:text-base text-gray-600 mt-2">
          Manage your security settings and password
        </p>
      </div>

      {/* Forms */}
      <div className="grid grid-cols-1 mb-8 md:mb-14">
        <form onSubmit={handleSubmit}>
          {/* Security */}
          <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 shadow-sm border">
            <h2 className="font-cinzel text-lg md:text-xl text-heading mb-4 md:mb-6">
              Security
            </h2>

            <div className="space-y-3 md:space-y-5">
          <div className="relative">
  <input
    name="oldpassword"
    type={showPassword.old ? "text" : "password"}
    placeholder="Current Password"
    className={inputStyles}
    value={passwordData.oldpassword}
    onChange={handleChange}
  />
  <span
    onClick={() => toggleVisibility("old")}
    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
  >
    {showPassword.old ? <EyeOff size={18} /> : <Eye size={18} />}
  </span>
</div>
  <div className="relative">
  <input
    name="newpassword"
    type={showPassword.new ? "text" : "password"}
    placeholder="New Password"
    className={inputStyles}
    value={passwordData.newpassword}
    onChange={handleChange}
  />
  <span
    onClick={() => toggleVisibility("new")}
    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
  >
    {showPassword.new ? <EyeOff size={18} /> : <Eye size={18} />}
  </span>
</div>
     <div className="relative">
  <input
    name="confirmPassword"
    type={showPassword.confirm ? "text" : "password"}
    placeholder="Confirm Password"
    className={inputStyles}
    value={passwordData.confirmPassword}
    onChange={handleChange}
  />
  <span
    onClick={() => toggleVisibility("confirm")}
    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
  >
    {showPassword.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
  </span>
</div>
            </div>
          </div>
          {/* Save Button */}
          <div className=" mt-6">
            <button
              type="submit"
              className="bg-primary font-medium w-full max-w-[300px]  hover:bg-primaryDark text-black px-6 md:px-8 lg:px-10 py-2 md:py-3 lg:py-4 rounded-lg md:rounded-xl font-inter transition"
            >
              Save Changes →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
