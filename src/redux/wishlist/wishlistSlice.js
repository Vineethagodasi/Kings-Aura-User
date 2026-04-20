import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getWishlist,
  addToWishlist,
  deleteWishlistItem,
} from "../../constants/wishlist";

// 🔥 FETCH
export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async () => {
    const res = await getWishlist();
    return res.data.data?.wishlist || [];
  }
);

// 🔥 ADD
export const addWishlistItem = createAsyncThunk(
  "wishlist/addWishlistItem",
  async (data) => {
    const res = await addToWishlist(data);
    return res.data.data; // new wishlist item
  }
);

// 🔥 DELETE
export const deleteWishlist = createAsyncThunk(
  "wishlist/deleteWishlist",
  async (wishlistid) => {
    await deleteWishlistItem(wishlistid);
    return wishlistid;
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [],
    loading: false,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.items = action.payload;
      })

      // ADD
      .addCase(addWishlistItem.fulfilled, (state, action) => {
        state.items.push(action.payload[0]); 
        // ⚠️ your API returns array → take first item
      })

      // DELETE
      .addCase(deleteWishlist.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item._id !== action.payload
        );
      });
  },
});

export default wishlistSlice.reducer;