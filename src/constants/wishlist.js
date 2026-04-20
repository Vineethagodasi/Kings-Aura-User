import axiosInstance from "../services/axiosInstance";

// GET
export const getWishlist = () => {
  return axiosInstance.get("/user/getwishlist");
};

// ADD
export const addToWishlist = (data) => {
  return axiosInstance.post("/user/wishlist", data);
};

// DELETE
export const deleteWishlistItem = (wishlistid) => {
  return axiosInstance.delete(`/user/deletewishlist?wishlistid=${wishlistid}`);
};