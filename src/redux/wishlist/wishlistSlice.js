// wishlistSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getWishlist,
  addWishlist,
  deleteWishlistItem,
} from "../../constants/wishlist";

// 🔥 GET WISHLIST
export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async () => {
    const res = await getWishlist();
    return res.data.data.wishlist || [];
  }
);

// 🔥 ADD TO WISHLIST
export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async (data, { dispatch }) => {
    const res = await addWishlist(data);

    dispatch(fetchWishlist());

    return res.data; // ✅ return backend response
  }
);

// 🔥 DELETE WISHLIST ITEM (No refetch)
export const deleteWishlist = createAsyncThunk(
  "wishlist/deleteWishlist",
  async (id) => {
    const res = await deleteWishlistItem(id);
    return { id, message: res.data.message }; // ✅ return message
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [],
    loading: false,
  },

  reducers: {
    // 🔥 Optimistic remove
    removeWishlistItem: (state, action) => {
      state.items = state.items.filter(
        (item) => item._id !== action.payload
      );
    },

    // 🔥 Clear on logout
    clearWishlist: (state) => {
      state.items = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state) => {
        state.loading = false;
      })

      // Handle delete success
      .addCase(deleteWishlist.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item._id !== action.payload
        );
      });
  },
});

export const { removeWishlistItem, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;