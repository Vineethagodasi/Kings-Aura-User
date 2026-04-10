import { createSlice } from "@reduxjs/toolkit";

const saveToLocalStorage = (items) => {
  localStorage.setItem("cartItems", JSON.stringify(items));
};

// ✅ 1. Function to get data from localStorage
const getCartFromLocalStorage = () => {
  const data = localStorage.getItem("cartItems");
  return data ? JSON.parse(data) : [];
};

// ✅ 2. Use it in initialState
const initialState = {
  items: getCartFromLocalStorage(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;

      const existingItem = state.items.find((item) => item._id === product._id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...product,
          quantity: 1,
        });
      }

      saveToLocalStorage(state.items); // ✅ save
    },

    increaseQty: (state, action) => {
      const item = state.items.find((i) => i._id === action.payload);

      if (item) {
        item.quantity += 1;
      }

      saveToLocalStorage(state.items);
    },

    decreaseQty: (state, action) => {
      const item = state.items.find((i) => i._id === action.payload);

      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter((i) => i._id !== action.payload);
        }
      }

      saveToLocalStorage(state.items);
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload);

      saveToLocalStorage(state.items);
    },

    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cartItems"); // optional
    },
  },
});

export const {
  addToCart,
  increaseQty,
  decreaseQty,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
