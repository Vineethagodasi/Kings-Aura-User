// Cart.jsx

import bgImg from "../../assets/images/cart/cartBg.png";
import crown from "../../assets/images/crown.png";
import exploreBtn from "../../assets/images/exploreBtn.png";
import trash from "../../assets/images/cart/trash.png";
import cartIcon from "../../assets/images/addcart.png";
import img1 from "../../assets/images/product1.png";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
  updateCartItem,
  deleteCart,
  updateItemQuantity,
  removeItem,
} from "../../redux/cart/cartSlice"; // adjust path
import { showSuccess } from "../../utils/toast";

function Cart() {
  const dispatch = useDispatch();
  const { items: cartItems, loading } = useSelector((state) => state.cart);
  const { isLoggedIn } = useSelector((state) => state.user);


  const handleUpdate = async (id, qty) => {
    if (qty < 1) {
      handleDelete(id);
      return;
    }

    // Optimistic update - update UI immediately
    dispatch(updateItemQuantity({ id, quantity: qty }));

    try {
      // Then sync with server
      await dispatch(updateCartItem({ id, data: { quantity: qty } })).unwrap();
      showSuccess("Item updated");
    } catch (err) {
      console.log(err);
      // Revert on error by refetching
      dispatch(fetchCart());
    }
  };

  const handleDelete = async (id) => {
    // Optimistic delete
    dispatch(removeItem(id));

    try {
      await dispatch(deleteCart(id)).unwrap();
      showSuccess("Item removed");
    } catch (err) {
      console.log(err);
      // Revert on error
      dispatch(fetchCart());
    }
  };

  const getPrice = (item) => {
    return item?.productprice || 0;
  };

  const totals = cartItems.reduce(
    (acc, item) => {
      const itemSubtotal = getPrice(item) * item.cartquantity;
      const itemTax = (itemSubtotal * (item.prtoducttaxpercentage || 0)) / 100;
      const itemShipping = item.productshippingcost || 0;

      return {
        subtotal: acc.subtotal + itemSubtotal,
        tax: acc.tax + itemTax,
        shipping: acc.shipping + itemShipping,
      };
    },
    { subtotal: 0, tax: 0, shipping: 0 },
  );

  const total = totals.subtotal + totals.tax + totals.shipping;

  return (
    <section
      className="min-h-screen relative flex items-center justify-center px-4 py-20 pb-32 bg-fixed bg-center bg-cover"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className={`absolute inset-0 bg-black/30`}></div>

      {/* Glass Card */}
      <div className="w-full max-w-6xl rounded-2xl backdrop-blur-xl mt-28 bg-white/10 shadow-2xl p-6 md:p-10">
        {/* Loading State */}
        {loading && (
          <div className="text-center py-10">
            <div className="inline-block w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
          </div>
        )}

        {/* Heading */}
        {!loading && cartItems.length > 0 && (
          <div className="text-center mb-8">
            <h2 className="font-cinzel text-2xl md:text-3xl text-white">
              Your Royal Cart
            </h2>
            <p className="text-white/70 text-sm mt-2">
              Review your selected pieces before proceeding
            </p>
          </div>
        )}

        {/* Content */}
        {!loading && cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEFT: Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item, i) => (
                <div
                  key={item._id || i}
                  className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-8"
                >
                  {/* Trash Icon */}
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="absolute top-3 right-3 md:top-5 md:right-5 opacity-80 hover:opacity-100 transition"
                  >
                    <img src={trash} className="w-5 h-5" alt="Delete" />
                  </button>

                  {/* Image */}
                  <Link to={`/product-details/${item.productDetails?._id}`}>
                    <div className="w-full sm:w-28 sm:h-32 bg-white rounded-lg p-3 mt-4 md:mt-0 flex-shrink-0 overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        src={item.cartImages?.[0] || img1}
                        alt={item.productDetails?.productname}
                      />
                    </div>
                  </Link>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white/90 font-cinzel text-base tracking-wide md:text-xl relative md:bottom-8 font-medium mb-2">
                      {item.productDetails?.productname || "Product"}
                    </h3>

                    <div className="flex flex-wrap max-w-xs gap-3 items-center md:justify-between text-xs text-white/60">
                      <span className="text-primary font-medium text-sm md:text-base">
                        ₹{getPrice(item)}
                      </span>
                      <span className="text-sm">Size: {item.size}</span>
                      <span className="flex text-sm items-center gap-2">
                        Color:
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: item.color }}
                        ></span>
                      </span>
                    </div>
                  </div>

                  {/* Qty */}
                  <div className="flex items-center gap-3 border border-white/20 rounded-md px-3 py-1 text-white">
                    <button
                      onClick={() =>
                        handleUpdate(item._id, item.cartquantity - 1)
                      }
                    >
                      −
                    </button>

                    <span>{item.cartquantity}</span>

                    <button
                      onClick={() =>
                        handleUpdate(item._id, item.cartquantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT: Summary */}
            <div className="bg-white rounded-xl p-6 text-black h-fit sticky top-1/4">
              <h3 className="font-cinzel text-lg mb-4">ORDER SUMMARY</h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{totals.subtotal.toLocaleString()}</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>
                    {totals.shipping > 0 ? `₹${totals.shipping}` : "Free"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>₹{totals.tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t my-4"></div>

              <div className="flex justify-between font-medium text-sm">
                <span>Total</span>
                <span className="text-primaryDark text-lg">
                  ₹{total.toLocaleString()}
                </span>
              </div>

              {/* Button */}
              <Link to="/checkout">
                <button className="mt-6 w-full bg-primary text-black py-3 rounded-lg flex items-center justify-center gap-2 font-medium hover:opacity-90 transition">
                  <img src={exploreBtn} className="w-5 h-5" alt="Checkout" />
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </div>
        ) : (
          !loading && (
            <div className="text-center py-20 pt-0 pb-32">
              <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <img src={cartIcon} className="w-12 h-12" alt="Cart" />
              </div>
              <h3 className="text-white font-cinzel text-2xl md:text-3xl">
                {isLoggedIn ? "Your Cart is Empty" : "you haven't logged in"} <br />
                <span className="text-primary">
                  {!isLoggedIn && "please login"}
                </span>
              </h3>
              <p className="text-white/60 mt-4 max-w-sm mx-auto">
                {isLoggedIn
                  ? "You haven't added any royal pieces to your cart yet. Explore our collections to find your perfect attire."
                  : ""}
              </p>
              <Link to={!isLoggedIn ? "/login" : "/collection"}>
                <button className="mt-10 bg-primary text-black px-10 py-4 rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/20">
                  {isLoggedIn ? "Explore Collection" : "Login to Continue"}
                </button>
              </Link>
            </div>
          )
        )}
      </div>
    </section>
  );
}

export default Cart;
