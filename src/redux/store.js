import { configureStore } from "@reduxjs/toolkit";
import counterReducer from '../redux/cart/cartCount';
import cartReducer from './cart/cartSlice';
import userReducer from './user/userSlice';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        cart: cartReducer,
        user: userReducer,
    },
});