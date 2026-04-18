import axiosInstance from "../services/axiosInstance";

export const getAllCollections = () => {
  return axiosInstance.get("/products/get-all-collections");
};
