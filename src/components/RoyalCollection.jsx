import React from "react";
import { motion } from "framer-motion";
import royalImg from "../assets/images/royal.png";
import exploreImg from "../assets/images/exploreBtn.png";
import { Link } from "react-router-dom";
import { useCollections } from "../hooks/useCollections";

export default function RoyalCollection() {
  
  const { collections, loading } = useCollections(3);

  return (
    <section className="section bg-[#EDEBE8] min-h-[600px]">
      <div className="container-main text-center">
        {/* Heading */}
        <motion.h2
          className="section-heading mb-2"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
        >
          THE ROYAL COLLECTIONS
        </motion.h2>

        <motion.p
          className="section-subheading text-md text-subheading mb-10 mt-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: false }}
        >
          Curated pieces crafted for every royal occasion
        </motion.p>

        {loading ? (
          /* Skeleton Loader to prevent layout shift */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, index) => (
              <div 
                key={index} 
                className="h-[500px] bg-gray-300/30 animate-pulse rounded-xl"
              />
            ))}
          </div>
        ) : (
          /* Cards */
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
            }}
            viewport={{ once: false }}
          >
            {collections.map((item, index) => (
              <Link to={`/collection/${item.collection_name}`} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 80 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.7,
                    ease: "easeOut",
                  }}
                  viewport={{ once: false }}
                  className="group relative h-[500px] rounded-xl overflow-hidden cursor-pointer"
                >
                  {/* Image */}
                  <img
                    src={item.image || royalImg}
                    alt={item.collection_name}
                    className="w-full h-full object-cover 
                             transition-transform duration-500 
                             group-hover:scale-105"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/30"></div>

                  {/* Bottom Gradient Overlay */}
                  <div
                    className="absolute bottom-0 left-0 w-full h-40 
                  bg-gradient-to-t from-black/90 to-transparent
                  opacity-70 group-hover:opacity-100
                  transition-all duration-500"
                  ></div>

                  {/* Content */}
                  <div className="absolute bottom-6 left-6 text-left text-white z-10">
                    {/* Animated Border */}
                    <div
                      className="mt-2 h-[2px] bg-primary 
                               w-10 transition-all duration-300 
                               group-hover:w-24"
                    ></div>

                    {/* Title */}
                    <h3
                      className="font-cinzel text-lg md:text-xl font-medium tracking-wide 
                               transition-all duration-500 
                               group-hover:text-primary"
                    >
                      {item.collection_name}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-white/70 mt-2">{item.collection_statement}</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        )}
        
        <Link to="/collection" className="flex justify-center">
          <button className="mt-14 bg-primary text-black px-8 py-3 rounded-xl font-medium flex items-center gap-2">
            <img src={exploreImg} alt="explore" className="w-5 h-5" />
            View Full Collection
          </button>
        </Link>
      </div>
    </section>
  );
}
