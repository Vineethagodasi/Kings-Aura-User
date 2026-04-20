// ProductDetails.jsx
import { motion } from "framer-motion";

import crown from "../../assets/images/crown.png";
import cart from "../../assets/images/addcart.png";
import arrow from "../../assets/images/collection/arrow.png";
import Hero from "../../components/Hero";
import productBg from "../../assets/images/collection/productBg.png";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFilteredProducts, getFilterNames } from "../../constants/product";
import { useCollections } from "../../hooks/useCollections";
import { showSuccess } from "../../utils/toast";
import { addToCart } from "../../constants/cart";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem } from "../../redux/cart/cartSlice";

function ProductList({ collectionName = "" }) {
  const [activeImages, setActiveImages] = useState({});

  const { name } = useParams();
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isFilterUpdating, setIsFilterUpdating] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    collections: [],
    categories: [],
    sizes: [],
    fabrics: [],
  });

  const [filters, setFilters] = useState({
    collection: collectionName,
    category: "",
    size: "",
    fabric: "",
    minprice: "",
    maxprice: "",
  });

  const [page, setPage] = useState(1);
  const [limit] = useState(8);
  const [totalPages, setTotalPages] = useState(1);

  const priceMap = {
    1: { min: 0, max: 500 },
    2: { min: 500, max: 1000 },
    3: { min: 1000, max: 2000 },
    4: { min: 2000, max: "" },
  };

  const handleChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
    setPage(1);
    setIsFilterUpdating(true);
  };

  const { collections } = useCollections();

  const collection = collections.find((col) => col.collection_name === name);

  useEffect(() => {
    fetchFilters();
  }, []);

  const fetchFilters = async () => {
    try {
      const res = await getFilterNames();

      if (res.data.success) {
        setFilterOptions(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchProducts = async (currentPage = 1) => {
    try {
      const cleanFilters = Object.fromEntries(
        Object.entries({
          ...filters,
          collection: collectionName || filters.collection,
          page: currentPage,
          limit,
        }).filter(([_, value]) => value !== ""),
      );

      const res = await getFilteredProducts(cleanFilters);

      if (res.data.success) {
        const data = res.data.data;

        const newProducts = data.products || [];

        setTotalPages(data.totalpages || 1);
        setTotalProducts(data.totalProducts || 0);

        if (currentPage === 1) {
          setProducts(newProducts);
        } else {
          setProducts((prev) => [...prev, ...newProducts]);
        }
      }
    } catch (error) {
      if (currentPage === 1) setProducts([]);
      setTotalProducts(0);
    } finally {
      setLoading(false);
      setIsFilterUpdating(false);
      setIsLoadingMore(false);
    }
  };

  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const handleRevealMore = () => {
    if (page < totalPages) {
      setIsLoadingMore(true);
      const nextPage = page + 1;
      setPage(nextPage);
      fetchProducts(nextPage);
    }
  };

  useEffect(() => {
    setPage(1);
    setLoading(true);
    fetchProducts(1);
  }, [name, filters]);

  const getPrice = (pricing) => {
    if (!pricing || !Array.isArray(pricing) || pricing.length === 0)
      return "Price on request";
    const prices = pricing.map((p) => p.productprice);
    return `₹${Math.min(...prices)}`;
  };

  const inputStyle =
    "border border-primary text-heading px-4 py-3 rounded-md min-w-[180px] text-sm focus:outline-none";

    const {items: cartItems} = useSelector((state) => state.cart); 
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
;

  return (
    <>
      <Hero
        bgImage={productBg}
        line={true}
        title={`${collection?.collection_name || name || "featured products"}`}
        description={`${collection?.collection_statement || "Explore our exclusive collection of royal attire, crafted with exquisite fabrics and timeless designs to elevate your style."}`}
      />

      <section className="bg-[#EDEBE8] my-6 ">
        <div className="flex flex-wrap items-center container-main bg-white p-6 justify-around gap-4">
          {/* Left Filters */}
          <div className="flex flex-wrap justify-center gap-4 items-center">
            {/* collection */}

            {!collectionName && (
              <select
                className={inputStyle}
                value={filters.collection}
                onChange={(e) => handleChange("collection", e.target.value)}
              >
                <option value="">Collection</option>

                {filterOptions.collections.map((col) => (
                  <option key={col._id} value={col.collection_name}>
                    {col.collection_name}
                  </option>
                ))}
              </select>
            )}

            {/* Category */}
            <select
              className={inputStyle}
              value={filters.category}
              onChange={(e) => handleChange("category", e.target.value)}
            >
              <option value="">Category</option>

              {filterOptions.categories.map((cat) => (
                <option key={cat._id} value={cat.categery_name}>
                  {cat.categery_name}
                </option>
              ))}
            </select>

            {/* Size */}
            <select
              className={inputStyle}
              value={filters.size}
              onChange={(e) => handleChange("size", e.target.value)}
            >
              <option value="">Size</option>

              {filterOptions.sizes.map((s) => (
                <option key={s._id} value={s.size_name}>
                  {s.size_name}
                </option>
              ))}
            </select>

            {/* Fabric */}
            <select
              className={inputStyle}
              value={filters.fabric}
              onChange={(e) => handleChange("fabric", e.target.value)}
            >
              <option value="">Fabric</option>

              {filterOptions.fabrics.map((f, i) => (
                <option key={i} value={f}>
                  {f}
                </option>
              ))}
            </select>

            {/* Price */}
            <select
              className={inputStyle}
              onChange={(e) => {
                const selected = priceMap[e.target.value] || {};

                setFilters((prev) => ({
                  ...prev,
                  minprice: selected.min || "",
                  maxprice: selected.max || "",
                }));
                setPage(1);
                setIsFilterUpdating(true);
              }}
            >
              <option value="">Price</option>
              <option value="1">₹0 - ₹500</option>
              <option value="2">₹500 - ₹1000</option>
              <option value="3">₹1000 - ₹2000</option>
              <option value="4">₹2000+</option>
            </select>

            {/* Sort By */}
            <select className={inputStyle}>
              <option>Sort By</option>
              <option>Low to High</option>
              <option>High to Low</option>
            </select>
          </div>

          {/* Right Side Count */}
          <div className="text-heading text-sm">{totalProducts} Pieces</div>
        </div>
      </section>

      <section className="bg-[#EDEBE8] py-16 pb-32 min-h-screen">
        <div className="container-main text-center relative">
          {/* Loading state for initial fetch or filter updating */}
          {(loading || isFilterUpdating) && (
            <div className="absolute inset-0 bg-white/30 backdrop-blur-sm z-10 flex items-center justify-center rounded-xl min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          )}

          {/* Cards */}
          {loading ? (
            /* Skeleton Cards */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div
                  key={i}
                  className="bg-white/50 animate-pulse rounded-xl h-[400px] w-full"
                />
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.7, y: 60 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{
                    duration: 0.7,
                    ease: [0.25, 0.46, 0.45, 0.94], // smooth premium
                  }}
                  viewport={{ once: true, amount: 0.4 }}
                  className="bg-white rounded-xl p-4 py-8 relative group overflow-hidden"
                >
                  {/* Wishlist Icon */}
                  <div className="absolute cursor-pointer z-10 top-6 right-8 w-10 h-10 border rounded-full flex items-center justify-center">
                    <img src={crown} className="w-6 h-6" />
                  </div>

                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <Link to={`/product-details/${item._id}`}>
                      <img
                        key={activeImages[index] || 0}
                        src={
                          item.imagesUrl?.[activeImages[index] || 0] || crown
                        }
                        alt={item.productname}
                        className="w-full h-[180px] object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                    </Link>

                    <div className="flex justify-center mt-3 gap-2">
                      {item.imagesUrl?.length > 0 ? (
                        item.imagesUrl.map((_, i) => (
                          <button
                            key={i}
                            onClick={() =>
                              setActiveImages((prev) => ({
                                ...prev,
                                [index]: i,
                              }))
                            }
                            className={`h-2.5 rounded-full transition-all duration-300
              ${
                (activeImages[index] || 0) === i
                  ? "bg-primary w-4"
                  : "bg-gray-300 w-2.5"
              }
            `}
                          />
                        ))
                      ) : (
                        <div className="h-2.5 w-2.5 rounded-full bg-gray-300"></div>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="mt-4 text-center">
                    <h3 className="text-[18px] text-heading font-medium">
                      {item.productname || "Product"}
                    </h3>
                    <p className="text-sm text-subheading mt-1">
                      {item.abouttheproduct || ""}
                    </p>

                    <p className="text-primaryDark text-2xl mt-3 font-medium">
                      {getPrice(item.pricingid)}
                    </p>
                  </div>

                  {/* Button */}
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="mt-5 w-full border border-primaryDark text-md rounded-lg py-3 
                             flex items-center justify-center gap-2
                             text-primaryDark font-medium
                             transition-all duration-300
                             hover:bg-primary hover:text-black"
                  >
                    <img src={cart} className="w-7 h-7" />
                    Add to Cart
                  </button>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="py-20">
              <p className="text-2xl font-semibold text-heading">
                No Products Found
              </p>
              <p className="text-subheading mt-2">
                Sorry, there are no products available in this collection.
              </p>
            </div>
          )}

          {/* Bottom Button */}
          {products.length > 0 && page < totalPages && (
            <button
              onClick={handleRevealMore}
              disabled={isLoadingMore}
              className="mt-14 border border-primary text-primary px-8 py-3 rounded-xl font-medium flex items-center gap-2 mx-auto disabled:opacity-50"
            >
              {isLoadingMore ? "Loading..." : "Reveal More"}
              {!isLoadingMore && (
                <img src={arrow} alt="explore" className="w-5 h-5 ml-2" />
              )}
            </button>
          )}
        </div>
      </section>
    </>
  );
}

export default ProductList;
