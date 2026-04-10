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