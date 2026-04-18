import axiosInstance from "../services/axiosInstance";

export const getFilteredProducts = (params) => {
  return axiosInstance.get("/products/productfilter", {
    params, // axios handles query params
  });
};

export const getAllProducts = (page = 1, limit = 10) => {
  return axiosInstance.get("/products/", { params: { page, limit } });
};

export const getProductById = (id) => {
  return axiosInstance.get(`/products/${id}`);
};

export const getRelatedProducts = (id) => {
  return axiosInstance.get(`/products/${id}`); // Response includes relatedProducts
};

export const searchProducts = (query) => {
  return axiosInstance.get(`/products/search`, { params: { query } });
};

export const getRandomProducts = () => {
  return axiosInstance.get("/products/randomproducts");
};

export const getFilterNames = () => {
  return axiosInstance.get("/products/getfilternames");
};