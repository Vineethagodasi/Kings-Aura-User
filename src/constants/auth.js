/**
 * API Related Constants (Function-Based)
 */

import axiosInstance from "../services/axiosInstance";

/**
 * Endpoints as functions
 */

export const signupUser = (data) => {
  return axiosInstance.post("/signup", data);
};

export const verifyUser = (verificationKey) => {
  return axiosInstance.get("/verify", {
    params: {
      verificationKey,
    },
  });
};

export const loginUser = (data) => {
  return axiosInstance.post("/signin", data);
};

// Backend route is /me/:id — it uses JWT to auth but needs id in URL to match the route.
// We decode id from the stored JWT token (already in localStorage after login).
export const getMe = () => {
  return axiosInstance.get("/me");
};

export const forgetPassword = (data) => {
  return axiosInstance.post("/password/forget", data);
};

export const setNewPassword = (data) => {
  return axiosInstance.put("/password/setNew", data);
};

export const profilePictureUpload = (formData) => {
  return axiosInstance.post("/profilepic", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};


/**
 * Logout user - clears authentication token on backend
 * Token is automatically sent by axiosInstance interceptor
 */
export const logoutUser = () => {
  return axiosInstance.put("/logout");
};

