/**
 * API Related Constants (Function-Based)
 */

import axiosInstance from "../services/axiosInstance";

//  * Endpoints as functions

export const getAddresses = (data) => {
  return axiosInstance.get("/user/address/list", data);
};

export const addAddress = (data) => {
  return axiosInstance.post("/user/address", data);
}

export const updateAddress = (id, data) => {
  return axiosInstance.put(`/user/address/${id}`, data);
};

export const deleteAddress = (id) => {
  return axiosInstance.delete(`/user/address/${id}`);
};