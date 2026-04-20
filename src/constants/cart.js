import axiosInstance from "../services/axiosInstance";

// GET all cart items
export const getCartItems = () => {
  return axiosInstance.get("/products/carts/mycarts");
};

// ADD to cart
export const addToCart = (id, data) => {
  return axiosInstance.post(`/products/cart/${id}`, data);
};

// UPDATE quantity
export const updateCart = (id, data) => {
  return axiosInstance.put(`/products/cart/${id}`, data);
};

// DELETE item
export const deleteCartItem = (id) => {
  return axiosInstance.delete(`/products/cart/${id}`);
};