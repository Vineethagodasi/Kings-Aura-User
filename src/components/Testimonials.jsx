// Testimonials.jsx

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import heroImg from "../assets/images/testimonial.png";
import crown from "../assets/images/crown.png";
import rightArrow from "../assets/images/rightArrow.png";
import logo from "../assets/images/logo.png";
import knife from "../assets/images/colorKnife.png";
import whiteKnife from "../assets/images/whiteKnife.png";

function Testimonials() {
  const testimonials = [
    {
      text: "Feels like wearing authority. Every detail reflects precision and class.",
      name: "ARJUN MEHTA",
      role: "Entrepreneur",
    },
    {
      text: "The quality is unmatched. Truly a royal experience.",
      name: "RAHUL SHARMA",
      role: "Designer",
    },
    {
      text: "Elegant, powerful, and premium. Loved every piece.",
      name: "KARAN VERMA",
      role: "Businessman",
    },
  ];

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setDirection(-1);
    setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const variants = {
    initial: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
    }),
  };

  return (
<section className="w-full pt-32 pb-0 md:pb-12 bg-[#EDEBE8] overflow-hidden py-16">
  <div className="flex flex-col lg:flex-row items-center gap-10 px-6">

    {/* LEFT IMAGE */}
    <motion.div
      initial={{ opacity: 0, x: -80, scale: 0.95 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.4 }}
      className="w-full h-auto md:h-[400px] lg:h-[600px]"
    >
      <img
        src={heroImg}
        alt="Testimonial"
        className="w-full h-full rounded-md object-cover"
      />
    </motion.div>

    {/* RIGHT CONTENT */}
    <motion.div
      initial={{ opacity: 0, x: 80 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      viewport={{ once: false, amount: 0.4 }}
      className="w-full lg:w-1/2"
    >
      <div className="bg-white p-8 md:p-10 rounded-xl border border-primary shadow-lg">

        {/* Icon */}
        <motion.img
          src={crown}
          className="w-8 h-8 mb-4"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: false }}
        />

        {/* Text */}
     <div className="overflow-hidden relative h-[80px]">
  <AnimatePresence mode="wait" custom={direction}>
    <motion.p
      key={index}
      custom={direction}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4 }}
      className="absolute w-full text-gray-700 text-base md:text-lg italic leading-relaxed"
    >
      "{testimonials[index].text}"
    </motion.p>
  </AnimatePresence>
</div>
        {/* Author */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: false }}
        >
          <h4 className="text-primary font-semibold text-sm tracking-wide">
            {testimonials[index].name}
          </h4>
          <p className="text-gray-500 text-xs">
            {testimonials[index].role}
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          className="flex items-center justify-between mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: false }}
        >
          {/* Arrows */}
          <div className="flex gap-3">
            <button
              onClick={prev}
              className="w-9 h-9 rounded-full bg-primary flex items-center justify-center"
            >
              <img src={rightArrow} className="w-4 rotate-180" />
            </button>
            <button
              onClick={next}
              className="w-9 h-9 rounded-full bg-primary flex items-center justify-center"
            >
              <img src={rightArrow} className="w-4" />
            </button>
          </div>

          {/* Dots */}
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <div
                key={i}
                onClick={() => setIndex(i)}
                className={`w-2.5 h-2.5 rounded-full cursor-pointer transition ${
                  index === i ? "bg-primary" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </motion.div>

      </div>
    </motion.div>
  </div>
</section>
  );
}

export default Testimonials;
