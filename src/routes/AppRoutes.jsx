

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Layout from "../components/Layout";
import Cart from "../pages/Cart";
import ScrollToTop from "../components/ScrollToTop";
import Collection from "../pages/Collection";
import CollectionDetails from "../pages/CollectionDetails";
import ProductDetails from "../pages/ProductDetails";
import Checkout from "../pages/Checkout";
import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/Login";
import Verify from "../pages/auth/Verify";
import ResetPassword from "../pages/auth/ResetPassword";
// import UserProfile from "../components/UserProfile";
import Sidebar from "../components/profileSidebar/Sidebar";
import Dashboard from "../pages/profile/Dashboard";
import Orders from "../pages/profile/Orders";
import Address from "../pages/profile/Address";
import Payment from "../pages/profile/Payment";
import Settings from "../pages/profile/Settings";

function AppRoutes() {
  return (
    <BrowserRouter>
     <ScrollToTop />
      <Routes>
        <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/verify" element={<Verify />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                {/* <Route path="/profile" element={<UserProfile />} /> */}

        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/collection" element={<Collection />} /> 
          <Route path="/collection-details" element={<CollectionDetails />} />
          <Route path="/product-details" element={<ProductDetails />} />
          {/* <Route path="/product/:id" element={<ProductDetails />} /> */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          
              <Route>
            <Route path="/profile" element={<Sidebar />}>
              <Route index element={<Dashboard />} />
              <Route path="orders" element={<Orders />} />
              <Route path="address" element={<Address />} />
              <Route path="payment" element={<Payment />} />
              <Route path="settings" element={<Settings />} />
         
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
