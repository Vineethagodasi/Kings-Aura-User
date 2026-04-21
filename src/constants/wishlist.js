import axiosInstance from "../services/axiosInstance";

// GET wishlist
export const getWishlist = () => {
  return axiosInstance.get("/user/getwishlist");
};

// ADD wishlist
export const addWishlist = (data) => {
  return axiosInstance.post("/user/wishlist", data);
};

// DELETE wishlist
export const deleteWishlistItem = (id) => {
  return axiosInstance.delete(`/user/deletewishlist?wishlistid=${id}`);
};