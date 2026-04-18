import { motion } from "framer-motion";
import crown from "../assets/images/crown.png";
import cart from "../assets/images/addcart.png";
import knifeImg from "../assets/images/knifes.png";
import exploreImg from "../assets/images/exploreBtn.png";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllProducts } from "../constants/product";

function FeaturedProducts() {
  const [activeImages, setActiveImages] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeatured();
  }, []);

  const fetchFeatured = async () => {
    try {
      const res = await getAllProducts(1, 4);
      if (res.data.success) {
        // Handle both simple array or nested data structures
        const data = res.data.data;
        setProducts(Array.isArray(data) ? data.slice(0, 4) : data.products?.slice(0, 4) || []);
      }
    } catch (err) {
      console.error("Error fetching featured products:", err);
    } finally {
      setLoading(false);
    }
  };

  const getPrice = (pricing) => {
    if (!pricing || !Array.isArray(pricing) || pricing.length === 0)
      return "Price on request";
    const prices = pricing.map((p) => p.productprice);
    return `₹${Math.min(...prices)}`;
  };

  return (
    <section className="bg-[#EDEBE8] py-16 pb-32">
      <div className="container-main text-center">
        {/* Heading */}
        <motion.h2
          className="section-heading mb-2"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          viewport={{ once: false, amount: 0.6 }}
        >
          FEATURED PIECES
        </motion.h2>

        <motion.p
          className="section-subheading text-md text-subheading mb-10 mt-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.2, // 🔥 comes after heading
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          viewport={{ once: false, amount: 0.6 }}
        >
          Handpicked designs from our royal collection
        </motion.p>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {loading ? (
            /* Skeleton State */
            [1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white/50 animate-pulse rounded-xl h-[450px] w-full" />
            ))
          ) : products.length > 0 ? (
            products.map((item, index) => (
              <motion.div
                key={item._id || index}
                initial={{ opacity: 0, scale: 0.7, y: 60 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  ease: [0.25, 0.46, 0.45, 0.94], // smooth premium
                }}
                viewport={{ once: false, amount: 0.4 }}
                className="bg-white rounded-xl p-4 py-8 relative group overflow-hidden"
              >
                {/* Tag with knives */}
                <div className="flex items-center justify-center gap-2 text-primary text-xs mb-4">
                  <img src={knifeImg} className="w-8" />
                  <span>{item.category || "ROYAL PIECE"}</span>
                  <img src={knifeImg} className="w-8 rotate-180" />
                </div>

                {/* Wishlist Icon */}
                <div className="absolute z-10 top-14 right-8 w-10 h-10 border rounded-full flex items-center justify-center cursor-pointer hover:bg-primary/10 transition-colors">
                  <img src={crown} className="w-6 h-6" />
                </div>

                {/* Image */}
                <div className="relative overflow-hidden">
                  <Link to={`/product-details/${item._id}`}>
                    <img
                      key={activeImages[index] || 0}
                      src={item.imagesUrl?.[activeImages[index] || 0] || crown}
                      alt={item.productname}
                      className="w-full h-[180px] object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>

                  <div className="flex justify-center mt-3 gap-2">
                    {item.imagesUrl?.length > 1 &&
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
                      ))}
                  </div>
                </div>

                {/* Content */}
                <div className="mt-4 text-center">
                  <h3 className="text-[17px] text-heading font-medium truncate px-2">
                    {item.productname}
                  </h3>
                  <p className="text-sm text-subheading mt-1 line-clamp-1">
                    {item.abouttheproduct}
                  </p>

                  <p className="text-primaryDark text-2xl mt-3 font-medium">
                    {getPrice(item.pricingid)}
                  </p>
                </div>

                {/* Button */}
                <button
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
            ))
          ) : (
            <div className="col-span-full py-10 opacity-50">No products available.</div>
          )}
        </div>

        {/* Bottom Button */}
        <Link to="/product">
          <button className="mt-14 bg-primary text-black px-8 py-3 rounded-xl font-medium flex items-center gap-2 mx-auto hover:opacity-90 transition-opacity">
            <img src={exploreImg} alt="explore" className="w-5 h-5" />
            View Full Products
          </button>
        </Link>
      </div>
    </section>
  );
}

export default FeaturedProducts;
