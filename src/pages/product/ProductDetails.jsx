import { useEffect, useState } from "react";
import arrow from "../../assets/images/collection/arrow.png";
import crown from "../../assets/images/crown.png";
import crown2 from "../../assets/images/productDetails/crown.png";
import cart from "../../assets/images/addcart.png";
import exploreImg from "../../assets/images/exploreBtn.png";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { getProductById } from "../../constants/product";
import { addCartItem } from "../../redux/cart/cartSlice";
import {
  addToWishlist,
  deleteWishlist,
  fetchWishlist,
  removeWishlistItem,
} from "../../redux/wishlist/wishlistSlice";
import { showError, showSuccess } from "../../utils/toast";
import { useDispatch, useSelector } from "react-redux";
import ProtectedButton from "../../components/ProtectedButton";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await getProductById(id);
        if (res.data.success) {
          const productData = res.data.data;
          setProduct(productData);
          setRelatedProducts(res.data.relatedProducts || []);

          // Set defaults
          if (productData.imagesUrl?.length > 0) setActiveImage(0);
          if (productData.pricingid?.length > 0) {
            setSelectedSize(productData.pricingid[0].size);
            setSelectedColor(productData.pricingid[0].color);
          }
        }
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const { items: cartItems } = useSelector((state) => state.cart);
  const { items: wishlistItems } = useSelector((state) => state.wishlist);

  const dispatch = useDispatch();

  const handleAddToCart = async (item) => {
    const payload = {
      quantity: 1, // Note: your API expects 'quantity'
      size: item.pricingid?.[0]?.size || "M",
      color: item.pricingid?.[0]?.color || "Default",
    };

    dispatch(addCartItem({ id: item._id, data: payload }));
    showSuccess("Added to cart");
  };

  const handleWishlistToggle = async (item) => {
    const existingItem = wishlistItems.find(
      (w) => w.productId._id === item._id,
    );

    if (existingItem) {
      // 🔴 REMOVE
      dispatch(removeWishlistItem(existingItem._id));

      try {
        const res = await dispatch(deleteWishlist(existingItem._id)).unwrap();
        showSuccess("Product deleted from wishlist");
      } catch {
        dispatch(fetchWishlist());
        showError("Failed to remove");
      }
    } else {
      // 🟢 ADD
      const payload = {
        productid: item._id,
        size: item.pricingid?.[0]?.size || "M",
        color: item.pricingid?.[0]?.color || "Default",
        productprice: 0,
      };

      try {
        const res = await dispatch(addToWishlist(payload)).unwrap();
        showSuccess(res.message || "Added to wishlist");
      } catch (err) {
        showError(err?.message || "Failed to add");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#EDEBE8]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#EDEBE8]">
        <p className="text-xl font-medium">Product not found</p>
      </div>
    );
  }

  // Extract unique sizes and colors
  const availableSizes = [...new Set(product.pricingid.map((p) => p.size))];
  const availableColors = [...new Set(product.pricingid.map((p) => p.color))];

  // Find price for currently selected variant
  const selectedVariant =
    product.pricingid.find(
      (p) => p.size === selectedSize && p.color === selectedColor,
    ) || product.pricingid[0];

  const getPriceRange = (pricing) => {
    if (!pricing || pricing.length === 0) return "Price on request";
    const prices = pricing.map((p) => p.productprice);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    return minPrice === maxPrice
      ? `₹${minPrice}`
      : `₹${minPrice} - ₹${maxPrice}`;
  };

  return (
    <>
      <section className="bg-[#EDEBE8] py-32 md:pt-44">
        <div className="container-main grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* ================= LEFT IMAGE SECTION ================= */}
          <div className="flex flex-col items-center">
            {/* Main Image - Fixed Size Container to prevent jumping */}
            <div className="w-full max-w-[450px] aspect-square border border-primary rounded-xl flex items-center justify-center bg-white overflow-hidden p-6 shadow-sm">
              <img
                key={activeImage}
                src={product.imagesUrl[activeImage] || cart}
                alt={product.productname}
                className="w-full h-full object-contain transition-all duration-300"
              />
            </div>

            {/* Thumbnails */}
            <div className="flex flex-wrap gap-4 mt-6 justify-center">
              {product.imagesUrl.map((img, index) => (
                <div
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`cursor-pointer border rounded-lg p-1 w-[60px] h-[70px] md:w-[70px] md:h-[80px] flex items-center justify-center transition-all duration-300 bg-white
                    ${
                      activeImage === index
                        ? "border-primary scale-105"
                        : "border-gray-300 opacity-70"
                    }
                  `}
                >
                  <img
                    src={img}
                    alt={`${product.productname} thumb ${index}`}
                    className="h-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ================= RIGHT CONTENT ================= */}
          <div>
            {/* Breadcrumb */}
            <p className="text-sm text-gray-500 mb-2">
              Home / Collections /{" "}
              <span className="text-primary">{product.collection}</span>
            </p>

            {/* Title */}
            <h1 className="section-heading lg:text-[36px] my-4 font-medium uppercase">
              {product.productname}
            </h1>

            {/* Price + Rating */}
            <div className="flex items-center gap-4 md:gap-12 mt-2">
              <div className="flex flex-col">
                <p className="text-primary md:text-2xl font-semibold">
                  ₹{selectedVariant?.productprice || 0}
                </p>
                {selectedVariant?.mainprice > selectedVariant?.productprice && (
                  <p className="text-gray-400 line-through text-sm">
                    ₹{selectedVariant.mainprice}
                  </p>
                )}
              </div>
              <div className="text-primaryDark md:text-2xl">★ ★ ★ ★ ★</div>
              <span className="text-subheading text-sm">120 reviews</span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 my-6">
              {selectedVariant?.mainprice > selectedVariant?.productprice && (
                <span className="bg-primary/30 text-primary px-2 md:px-4 py-2 text-xs md:text-sm font-medium rounded-md">
                  {Math.round(
                    ((selectedVariant.mainprice -
                      selectedVariant.productprice) /
                      selectedVariant.mainprice) *
                      100,
                  )}
                  % OFF
                </span>
              )}
              <span className="bg-white/50 text-subheading px-2 md:px-4 py-2 text-xs md:text-sm rounded">
                {product.availability === "In Stock"
                  ? "Delivery in 3-5 days"
                  : product.availability}
              </span>
              <span className="bg-primary text-black px-2 md:px-4 py-2 text-xs md:text-sm rounded">
                Royal Pick
              </span>
            </div>

            {/* Description */}
            <p className="text-[16px] text-subheading max-w-md mt-4">
              {product.abouttheproduct}
            </p>

            {/* ================= SIZE ================= */}
            <div className="mt-6">
              <p className="text-sm mb-2 font-medium">Select Size</p>
              <div className="flex gap-3 flex-wrap">
                {availableSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-md text-sm transition-all
                      ${
                        selectedSize === size
                          ? "bg-primary/30 text-black border-primary font-bold"
                          : "border-gray-300 bg-white/50 hover:border-primary/50"
                      }
                    `}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* ================= COLORS ================= */}
            <div className="mt-6">
              <p className="text-sm mb-2 font-medium">Select Color</p>
              <div className="flex gap-3 flex-wrap">
                {availableColors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 border rounded-md text-sm transition-all
                      ${
                        selectedColor === color
                          ? "bg-primary/30 text-black border-primary font-bold"
                          : "border-gray-300 bg-white/50 hover:border-primary/50"
                      }
                    `}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* ================= BUTTONS ================= */}
            <div className="mt-8 flex flex-col max-w-[360px] gap-3">
              {/* Add to Cart */}
              <button className="bg-[#C8A96A] text-black py-3 rounded-lg flex items-center justify-center gap-2 font-medium hover:bg-primary transition-all shadow-md">
                <img src={cart} className="w-7 h-7" alt="cart" />
                Add to Royal Cart
              </button>

              {/* Wishlist */}
              <button className="border border-primaryDark mt-2 text-primary py-3 rounded-lg flex items-center justify-center gap-2 font-medium hover:bg-primary/10 transition-all">
                <img src={crown} className="w-5 h-5" alt="crown" />
                Add to Wishlist
              </button>
            </div>

            {/* Extra Info */}
            <p className="text-base text-subheading mt-5">
              Free delivery above ₹999 · Easy returns
            </p>

            {/* ================= ACCORDION ================= */}
            <div className="mt-10 border-b border-black/10 pb-4">
              <div
                onClick={() => setOpen(!open)}
                className="flex justify-between items-center cursor-pointer py-2"
              >
                <h3 className="section-heading lg:text-[24px] uppercase tracking-wide">
                  Product Details
                </h3>
                <span className="text-2xl text-heading">
                  {open ? "−" : "+"}
                </span>
              </div>

              {/* Content */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  open ? "max-h-[500px] mt-4" : "max-h-0"
                }`}
              >
                <ul className="space-y-4 text-sm text-subheading">
                  {product.productdetails.map(
                    (detail, idx) =>
                      detail && (
                        <li key={idx} className="flex items-start gap-3">
                          <img
                            src={arrow}
                            className="w-4 h-4 mt-1 flex-shrink-0"
                            alt="arrow"
                          />
                          <span>{detail}</span>
                        </li>
                      ),
                  )}
                  <li className="flex items-start gap-3">
                    <img
                      src={arrow}
                      className="w-4 h-4 mt-1 flex-shrink-0"
                      alt="arrow"
                    />
                    <span>Fabric: {product.fabric_name}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <img
                      src={arrow}
                      className="w-4 h-4 mt-1 flex-shrink-0"
                      alt="arrow"
                    />
                    <span>Availability: {product.availability}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <img
                      src={arrow}
                      className="w-4 h-4 mt-1 flex-shrink-0"
                      alt="arrow"
                    />
                    <span>Stock: {product.stock} items available</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= RELATED PRODUCTS ================= */}
      {relatedProducts.length > 0 && (
        <section className="bg-[#EDEBE8] py-16">
          <div className="container-main">
            <div className="mb-12">
              <span className="block w-16 h-[2px] mb-2 bg-primary"></span>
              <h2 className="section-heading lg:text-[32px] text-left">
                Complete Your Royal Look
              </h2>
              <p className="section-subheading text-left">
                Curated pieces to elevate your presence
              </p>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((item, index) => {
                const isWishlisted = wishlistItems.some(
                  (w) => w.productId._id === item._id,
                );

                return (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1,
                    }}
                    viewport={{ once: true, amount: 0.2 }}
                    className="bg-white rounded-xl p-4 py-8 relative group overflow-hidden shadow-sm hover:shadow-lg transition-all"
                  >
                    {/* Wishlist Icon */}
                    <ProtectedButton onClick={() => handleWishlistToggle(item)}>
                      <div className="absolute top-6 right-8 w-10 h-10 border rounded-full flex items-center justify-center bg-white/80 cursor-pointer z-10">
                        <img
                          src={isWishlisted ? crown2 : crown}
                          className="w-5 h-5"
                          alt="crown"
                        />
                      </div>
                    </ProtectedButton>

                    {/* Image */}
                    <div className="overflow-hidden aspect-square flex items-center justify-center">
                      <Link to={`/product-details/${item._id}`}>
                        <img
                          src={item.imagesUrl?.[0] || cart}
                          alt={item.productname}
                          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                        />
                      </Link>
                    </div>

                    {/* Content */}
                    <div className="mt-6 text-center">
                      <h3 className="text-[17px] text-heading font-medium truncate px-2">
                        {item.productname}
                      </h3>
                      <p className="text-xs text-subheading mt-1 uppercase tracking-widest">
                        {item.category}
                      </p>

                      <p className="text-primaryDark text-xl mt-3 font-semibold">
                        {getPriceRange(item.pricingid)}
                      </p>
                    </div>

                    {/* Button */}
                    <ProtectedButton
                      onClick={() => handleAddToCart(item)}
                      className=""
                      addCartCss={true}
                    >
                      <img src={cart} className="w-7 h-7" />
                      Add to Cart
                    </ProtectedButton>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom Button */}
            <div className="mt-14 flex justify-center">
              <Link to="/collection">
                <button className="bg-primary text-black px-10 py-4 rounded-xl font-medium flex items-center gap-2 hover:opacity-90 transition-all shadow-md">
                  <img src={exploreImg} alt="explore" className="w-5 h-5" />
                  View Full Collection
                </button>
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default ProductDetails;
