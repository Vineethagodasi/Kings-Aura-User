// Wishlist.jsx

import bgImg from "../../assets/images/wishlist/wishlistBg.png";
import trash from "../../assets/images/cart/trash.png";
import closeIcon from "../../assets/images/wishlist/close.png";
import cart from "../../assets/images/addcart.png";
import crown from "../../assets/images/crown.png";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWishlist,
  deleteWishlist,
  removeWishlistItem,
} from "../../redux/wishlist/wishlistSlice";
import { showSuccess, showError } from "../../utils/toast";
import ProtectedButton from "../../components/ProtectedButton";

function Wishlist() {
  const [activeImages, setActiveImages] = useState({});

  const dispatch = useDispatch();
  const { items: wishlistItems, loading } = useSelector(
    (state) => state.wishlist
  );
  const { isLoggedIn } = useSelector((state) => state.user);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchWishlist());
    }
  }, [dispatch, isLoggedIn]);

const handleDelete = async (id) => {
  dispatch(removeWishlistItem(id));

  try {
    const res = await dispatch(deleteWishlist(id)).unwrap();
    showSuccess(res.message);
  } catch {
    dispatch(fetchWishlist());
    showError("Failed to delete");
  }
};
  return (
    <section
      className="min-h-screen relative flex items-center justify-center px-4 py-20 pb-32 bg-fixed bg-center bg-cover"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className={`absolute inset-0 bg-black/50 z-0`}></div>

      {/* Glass Card */}
      <div className="relative z-10 w-full max-w-7xl rounded-2xl shadow-2xl p-6 md:p-10 mt-6">
        {/* Heading */}
        <div className="mb-8">
          <h2 className="section-heading text-white">Your Royal Wishlist</h2>
          <p className="section-subheading text-white/90 mt-4">
            Curated pieces you've chosen to revisit
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-10">
            <div className="inline-block w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
          </div>
        )}

        {/* Not Logged In State */}
        {!loading && !isLoggedIn && (
          <div className="text-center py-20 pt-0 pb-32">
            <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <img src={crown} className="w-12 h-12" alt="Wishlist" />
            </div>
            <h3 className="text-white font-cinzel text-2xl md:text-3xl">
              Sign In to View Your Wishlist
            </h3>
            <p className="text-white/60 mt-4 max-w-sm mx-auto">
              Please login to see your saved royal pieces and continue shopping.
            </p>
            <Link to="/login">
              <button className="mt-10 bg-primary text-black px-10 py-4 rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/20">
                Login to Continue
              </button>
            </Link>
          </div>
        )}

        {/* Empty Wishlist (Logged In) */}
        {!loading && isLoggedIn && wishlistItems.length === 0 && (
          <div className="text-center py-20 pt-0 pb-32">
            <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <img src={crown} className="w-12 h-12" alt="Empty Wishlist" />
            </div>
            <h3 className="text-white font-cinzel text-2xl md:text-3xl">
              Your Wishlist is Empty
            </h3>
            <p className="text-white/60 mt-4 max-w-sm mx-auto">
              You haven't saved any royal pieces yet. Explore our collections to find your perfect attire.
            </p>
            <Link to="/product">
              <button className="mt-10 bg-primary text-black px-10 py-4 rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/20">
                Explore Collection
              </button>
            </Link>
          </div>
        )}

        {/* Cards */}
        {!loading && wishlistItems.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {wishlistItems.map((item, index) => {
              const product = item.productId;
              const images = product?.imagesUrl || [];

              return (
                <div
                  key={item._id}
                  className="bg-white rounded-xl p-4 py-8 relative group overflow-hidden"
                >
                  {/* Remove Icon */}
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="absolute z-10 top-4 right-4 w-10 h-10 border rounded-full flex items-center justify-center hover:bg-red-50 transition"
                  >
                    <img src={closeIcon} className="w-5 h-5 cursor-pointer" alt="Remove" />
                  </button>

                  {/* Image */}
                  <div className="overflow-hidden">
                    <Link to={`/product-details/${product?._id}`}>
                      <img
                        key={activeImages[index] || 0}
                        src={images[activeImages[index] || 0] || crown}
                        alt={product?.productname}
                        className="w-full h-[180px] object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                    </Link>

                    {/* Image Dots */}
                    {images.length > 1 && (
                      <div className="flex justify-center mt-3 gap-2">
                        {images.map((_, i) => (
                          <button
                            key={i}
                            onClick={() =>
                              setActiveImages((prev) => ({
                                ...prev,
                                [index]: i,
                              }))
                            }
                            className={`h-2.5 rounded-full transition-all duration-300 ${
                              (activeImages[index] || 0) === i
                                ? "bg-primary w-4"
                                : "bg-gray-300 w-2.5"
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="mt-4 text-center">
                    <h3 className="text-[18px] text-heading font-medium truncate px-2">
                      {product?.productname || "Product"}
                    </h3>

                    <div className="flex justify-center gap-3 mt-2 text-xs text-subheading">
                      <span className="bg-gray-100 px-2 py-1 rounded">Size: {item.size}</span>
                      <span className="bg-gray-100 px-2 py-1 rounded">Color: {item.color}</span>
                    </div>

                    <span
                      className={`inline-block mt-2 text-xs px-3 py-1 rounded-full font-medium ${
                        product?.availability === "In Stock"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {product?.availability || "Unknown"}
                    </span>
                  </div>

                  {/* Add to Cart Button */}
                  <ProtectedButton
                    onClick={() => handleAddToCart(item)}
                    disabled={item.availability === "Out of Stock"}
                    className=""
                    addCartCss={true}
                  >
                    <img src={cart} className="w-7 h-7" alt="cart" />
                    Add to Cart
                  </ProtectedButton>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default Wishlist;