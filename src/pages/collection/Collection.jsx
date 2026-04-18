import React from "react";
import Hero from "../../components/Hero";
import collectionBg from "../../assets/images/collectionPage/collectionBg.png";
import { motion } from "framer-motion";
import royalImg from "../../assets/images/royal.png";
import exploreBtnIcon from "../../assets/images/exploreBtn.png";
import exploreColorBtn from "../../assets/images/collectionPage/exploreColorBtn.png";
import { useState, useEffect } from "react";
import dressesBg from "../../assets/images/collectionPage/dresses.jpg";
import exploreIcon from "../../assets/images/exploreBtn.png";
import { Link } from "react-router-dom";
// import { getAllCollections } from "../../constants/collection";
import { useCollections } from "../../hooks/useCollections";

export default function Collection() {
  const [isHover, setIsHover] = useState(false);

  const { collections, loading } = useCollections();
  
  // Persist count to maintain same page height during skeleton phase
  const [savedCount, setSavedCount] = useState(() => {
    return parseInt(sessionStorage.getItem("collection_count") || "4");
  });

  useEffect(() => {
    if (collections.length > 0) {
      sessionStorage.setItem("collection_count", collections.length.toString());
      setSavedCount(collections.length);
    }
  }, [collections.length]);

  const skeletonArray = Array.from({ length: savedCount });

  return (
    <>
      <Hero
        bgImage={collectionBg}
        line={true}
        title="THE COLLECTIONS"
        description="Timeless pieces crafted for everyday authority"
      />

      <section className="py-16 md:py-24 bg-[#EDEBE8] min-h-screen">
        <div className="container-main">
          {/* Heading */}
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 60, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94], // 🔥 smooth luxury easing
            }}
            viewport={{ amount: 0.35 }}
          >
            <h2 className="section-heading tracking-widest">
              THE ROYAL COLLECTIONS
            </h2>
            <p className="mt-4 tracking-wider section-subheading">
              Step into a wardrobe crafted for modern royalty
            </p>
          </motion.div>

          {loading ? (
            /* Skeleton State - Dynamically sized to preserve height */
            <div className="flex flex-col gap-6 md:gap-16">
              {skeletonArray.map((_, i) => (
                <div key={i} className="bg-white/50 animate-pulse rounded-2xl h-[520px] w-full" />
              ))}
            </div>
          ) : (
            /* Collection Cards */
            <div className="flex flex-col gap-6 md:gap-16">
              {collections.map((item, index) => {
                const isReverse = index % 2 !== 0;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.65, ease: "easeOut" }}
                    viewport={{ once: false, amount: 0.1 }}
                    className={`
                      flex flex-col
                      ${isReverse ? "md:flex-row-reverse" : "md:flex-row"}
                      bg-white rounded-2xl overflow-hidden
                    `}
                    style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}
                  >
                    {/* Image Side - Responsive Height */}
                    <div
                      className="w-full md:w-[40%] flex-shrink-0 overflow-hidden"
                      style={{ height: "300px", mdHeight: "420px" }} // Stable height for mobile
                    >
                      <img
                        src={item.image || royalImg}
                        alt={item.collection_name}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>

                    {/* Content Side */}
                    <div className="flex flex-col justify-center px-8 py-8 md:px-12 md:py-10 w-full md:w-[58%]">
                      <h3 className="font-cinzel section-heading xl:text-[32px] font-medium opacity-80 text-heading mb-2">
                        {item.collection_name}
                      </h3>

                      <p className="section-subheading">
                        {item.collection_statement}
                      </p>
                      <span className="block w-20 h-[2px] bg-primary mb-12 mt-2"></span>

                      {/* Explore Button */}
                      <Link to={`/collection/${item.collection_name}`}>
                        {" "}
                        <motion.button
                          onMouseEnter={() => setIsHover(true)}
                          onMouseLeave={() => setIsHover(false)}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className="flex items-center gap-2 self-start 
                                  border border-primary
                                  text-primary 
                                  px-4 py-2
                                  sm:px-6 sm:py-3
                                  rounded-md 
                                  text-base tracking-wider font-medium
                                  transition-all duration-300
                                  hover:bg-primary hover:text-black"
                        >
                          <img
                            src={isHover ? exploreBtnIcon : exploreColorBtn}
                            alt="explore"
                            className="w-4 h-4 transition-all duration-300"
                          />
                          Explore Collection
                        </motion.button>
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Bottom Tagline */}
          <motion.div
            className="text-center mt-14 md:mt-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: false, amount: 0.5 }}
          >
            <div className={`block w-full h-[1.4px] bg-primary mb-14`}></div>
            <p className="section-heading lg:text-[32px] tracking-[0.06em] font-medium uppercase">
              Crafted with precision. Worn with presence.
            </p>
            <div
              className={`block w-[70%] h-[1px] mx-auto bg-heading mt-14`}
            ></div>
          </motion.div>
        </div>
      </section>

      <section className="relative w-full h-[400px] md:h-[500px] overflow-hidden mb-16">
        {/* Background Image */}
        <motion.img
          src={dressesBg}
          alt="Royal Background"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.2 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          viewport={{ once: false }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          {/* Heading */}
          <p className="text-xs tracking-widest text-primary mb-4">
            {" "}
            FEATURED COLLECTION{" "}
          </p>
          <motion.h2
            className="font-cinzel font-semibold text-white text-3xl md:text-5xl lg:text-[56px] !leading-[1.2] tracking-[0.05em]"
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.6 }}
          >
            THE SIGNATURE <br /> COLLECTION
          </motion.h2>

          {/* Subtext */}
          <motion.p
            className="mt-4 text-white/80 text-sm md:text-base max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: false }}
          >
            A statement crafted for those who command attention and
            presence.{" "}
          </motion.p>

          {/* Button */}
          <motion.button
            className="mt-8 bg-primary text-black px-8 py-3 rounded-xl flex items-center gap-2 font-medium hover:opacity-90 transition"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: false }}
          >
            <img src={exploreIcon} className="w-5 h-5" />
            Explore Now
          </motion.button>
        </div>
      </section>

      <section className="bg-[#ffffff] pb-20 mt-24 ">
        <div className="container-main">
          {/* Heading */}
          <h3 className="text-center section-heading tracking-wider mb-4 font-cinzel">
            EXPLORE MORE
          </h3>
          <span className="block w-40 m-auto text-center h-[1.4px] bg-primary mb-14"></span>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {loading ? (
               /* Skeletons - Now matches the saved count to prevent overshoot */
               skeletonArray.map((_, i) => (
                 <div key={i} className="bg-gray-100/50 animate-pulse rounded-xl h-[280px] w-full" />
               ))
            ) : (
              collections.map((item, i) => (
              <Link to={`/collection/${item.collection_name}`} key={i}>
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  className="group relative rounded-xl h-[280px] overflow-hidden cursor-pointer 
                       transition-all duration-500"
                >
                  {/* Image Wrapper */}
                  <div className="w-full h-full overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.collection_name}
                      className="w-full h-full object-cover object-top 
                           transition-transform duration-700 
                           group-hover:scale-110"
                    />
                  </div>

                  {/* Overlay */}
                  <div
                    className="absolute inset-0 bg-black/40 
                         transition-all duration-500
                         group-hover:bg-black/45"
                  ></div>

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end pb-16 items-center text-center px-4">
                    <h4
                      className="font-cinzel text-2xl text-white 
                           transition-all duration-500
                           group-hover:text-primary"
                    >
                      {item.collection_name}
                    </h4>

                    <p
                      className="text-base text-white/80 mt-2 
                           transition-all duration-500
                           group-hover:text-white"
                    >
                      {item.collection_statement}
                    </p>
                  </div>

                  {/* Shadow on Hover */}
                  <div
                    className="absolute inset-0 rounded-xl 
                         shadow-lg opacity-0 
                         transition-all duration-500
                         group-hover:opacity-100"
                  ></div>
                </motion.div>
              </Link>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
}
