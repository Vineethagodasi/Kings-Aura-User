// cartSlice.js - Updated version

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCartItems,
  addToCart,
  updateCart,
  deleteCartItem,
} from "../../constants/cart";

// 🔥 GET CART
export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const res = await getCartItems();
  return res.data.data || [];
});

// 🔥 ADD TO CART
export const addCartItem = createAsyncThunk(
  "cart/addCartItem",
  async ({ id, data }, { dispatch }) => {
    await addToCart(id, data);
    dispatch(fetchCart());
  },
);

// 🔥 UPDATE CART - No refetch
export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ id, data }) => {
    const res = await updateCart(id, data);
    return { id, data }; // Return the update info
  },
);

// 🔥 DELETE CART - No refetch
export const deleteCart = createAsyncThunk("cart/deleteCart", async (id) => {
  await deleteCartItem(id);
  return id; // Return the deleted id
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    loading: false,
  },
  reducers: {
    // Add optimistic update reducer
    updateItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item._id === id);
      if (item) {
        item.cartquantity = quantity;
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state) => {
        state.loading = false;
      })
      // Handle update success
      .addCase(updateCartItem.fulfilled, (state, action) => {
        const { id, data } = action.payload;
        const item = state.items.find((item) => item._id === id);
        if (item && data.quantity) {
          item.cartquantity = data.quantity;
        }
      })
      // Handle delete success
      .addCase(deleteCart.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
      });
  },
});

export const { updateItemQuantity, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
