

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Layout from "../components/Layout";
import Cart from "../pages/Cart";
import ScrollToTop from "../components/ScrollToTop";
import Collection from "../pages/Collection";
import CollectionDetails from "../pages/CollectionDetails";
import ProductDetails from "../pages/ProductDetails";
import Checkout from "../pages/Checkout";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Verify from "../pages/Verify";

function AppRoutes() {
  return (
    <BrowserRouter>
     <ScrollToTop />
      <Routes>
        <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/verify" element={<Verify />} />

        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/collection" element={<Collection />} /> 
          <Route path="/collection-details" element={<CollectionDetails />} />
          <Route path="/product-details" element={<ProductDetails />} />
          {/* <Route path="/product/:id" element={<ProductDetails />} /> */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
