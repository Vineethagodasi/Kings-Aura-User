/**
 * API Related Constants (Function-Based)
 */

import axiosInstance from "../services/axiosInstance";

//  * Endpoints as functions

export const signupUser = (data) => {
  return axiosInstance.post("/user/signup", data);
};

export const verifyUser = (verificationKey) => {
  return axiosInstance.get("/user/verify", {
    params: {
      verificationKey,
    },
  });
};

export const loginUser = (data) => {
  return axiosInstance.post("/user/signin", data);
};

export const getMe = () => {
  return axiosInstance.get("/user/me");
};

export const forgetPassword = (data) => {
  return axiosInstance.post("/user/password/forget", data);
};

export const setNewPassword = (data) => {
  return axiosInstance.put("/user/password/setNew", data);
};

export const changePassword = (data) => {
  return axiosInstance.post("/user/password/change", data);
};

export const profilePictureUpload = (formData) => {
  return axiosInstance.post("/user/profilepic", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateUserDetails = (data) => {
  return axiosInstance.put("/user/update", data);
}

export const logoutUser = () => {
  return axiosInstance.put("/user/logout");
};

