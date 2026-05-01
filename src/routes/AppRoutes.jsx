import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import Layout from "../components/Layout";
import Cart from "../pages/cart/Cart";
import ScrollToTop from "../components/ScrollToTop";
import Collection from "../pages/collection/Collection";
import CollectionDetails from "../pages/collection/CollectionDetails";
import ProductDetails from "../pages/product/ProductDetails";
import Checkout from "../pages/Checkout";
import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/Login";
import Verify from "../pages/auth/Verify";
import ResetPassword from "../pages/auth/ResetPassword";
// import UserProfile from "../components/UserProfile";
import Sidebar from "../components/profileSidebar/Sidebar";
import Dashboard from "../pages/profile/Dashboard";
import Orders from "../pages/profile/Orders";
import Address from "../pages/profile/address/Address";
// import Payment from "../pages/payment";
import Settings from "../pages/profile/Settings";
import Security from "../pages/profile/Security";
import Wishlist from "../pages/wishlist/Wishlist";
import Product from "../pages/product/Product";
import OrderSuccess from "../pages/OrderSuccess";
import Orderdetails from "../pages/profile/Orderdetails";
import TrackOrder from "../pages/profile/TrackOrder";
import Notifications from "../pages/profile/Notification";
import About from "../pages/about/About";
import Contact from "../pages/contact/Contact";
import FAQ from "../pages/faq/Faq";

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
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/collection/:name" element={<CollectionDetails />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product-details/:id" element={<ProductDetails />} />
          {/* <Route path="/product/:id" element={<ProductDetails />} /> */}
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success/:id" element={<OrderSuccess />} />
          {/* <Route path="/payment" element={<Payment />} /> */}

          <Route>
            <Route path="/profile" element={<Sidebar />}>
              <Route index element={<Dashboard />} />
              <Route path="orders" element={<Orders />} />
              <Route path="orders/:id" element={<Orderdetails />} />
              <Route path="track-order/:id" element={<TrackOrder />} />
              <Route path="address" element={<Address />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="settings" element={<Settings />} />
              <Route path="security" element={<Security />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
