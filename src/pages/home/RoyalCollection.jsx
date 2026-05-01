import React from "react";
import { motion } from "framer-motion";
import royalImg from "../../assets/images/royal.png";
import exploreImg from "../../assets/images/exploreBtn.png";
import { Link } from "react-router-dom";
import { useCollections } from "../../hooks/useCollections";

/* Reusable card component */
function CollectionCard({ item, className = "", delay = 0 }) {
  return (
    <Link to={`/collection/${item.collection_name}`} className={className}>
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut", delay }}
        viewport={{ once: false }}
        className="group relative w-full h-full rounded-xl overflow-hidden cursor-pointer"
      >
        {/* Image */}
        <img
          src={item.image || royalImg}
          alt={item.collection_name}
          className="w-full h-full object-contain 
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
          <p className="text-xs text-white/70 mt-2">
            {item.collection_statement}
          </p>
        </div>
      </motion.div>
    </Link>
  );
}

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
          /* Skeleton Loader – matches the asymmetric layout */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-[520px] bg-gray-300/30 animate-pulse rounded-xl" />
            <div className="flex flex-col gap-6">
              <div className="h-[248px] bg-gray-300/30 animate-pulse rounded-xl" />
              <div className="h-[248px] bg-gray-300/30 animate-pulse rounded-xl" />
            </div>
          </div>
        ) : (
          /* Cards – Asymmetric grid: 1 tall left, 2 stacked right */
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: false }}
          >
            {/* Left – tall card */}
            {collections[0] && (
              <CollectionCard
                item={collections[0]}
                className="h-[520px]"
                delay={0}
              />
            )}

            {/* Right – two stacked cards */}
            <div className="flex flex-col gap-6">
              {collections[1] && (
                <CollectionCard
                  item={collections[1]}
                  className="h-[248px]"
                  delay={0.15}
                />
              )}
              {collections[2] && (
                <CollectionCard
                  item={collections[2]}
                  className="h-[248px]"
                  delay={0.3}
                />
              )}
            </div>
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
