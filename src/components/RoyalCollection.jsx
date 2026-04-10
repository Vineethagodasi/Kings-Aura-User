import React from "react";
import { motion } from "framer-motion";
import royalImg from "../assets/images/royal.png";

export default function RoyalCollection() {
  const collections = [
    {
      title: "THE CLASSIC REGIMENT",
      desc: "Crafted for timeless authority",
      image: royalImg,
    },
    {
      title: "THE EVENING REGALIA",
      desc: "For nights of command",
      image: royalImg,
    },
    {
      title: "THE HERITAGE COLLECTION",
      desc: "Crafted with legacy",
      image: royalImg,
    },
  ];

  //  Parent animation (stagger effect)
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  //  Each card animation
  const cardVariants = {
    hidden: { opacity: 0, y: 80 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="section bg-[#EDEBE8]">
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

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
        >
          {collections.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group relative h-[500px] rounded-xl overflow-hidden cursor-pointer"
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
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
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-white/70 mt-2">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
