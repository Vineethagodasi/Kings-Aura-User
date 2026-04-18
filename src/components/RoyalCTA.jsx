// RoyalCTA.jsx

import bgImg from "../assets/images/royalBg.png"; // your background image
import exploreIcon from "../assets/images/exploreBtn.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function RoyalCTA() {
  return (
    <section className="relative w-full h-[400px] md:h-[500px] overflow-hidden mb-16">
      {/* Background Image */}
      <motion.img
        src={bgImg}
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
        <motion.h2
          className="font-cinzel font-semibold text-white text-3xl md:text-5xl lg:text-[56px] !leading-[1.2] tracking-[0.06em]"
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.6 }}
        >
          WEAR THE POWER OF <br /> ROYALTY
        </motion.h2>

        {/* Subtext */}
        <motion.p
          className="mt-4 text-white/80 text-sm md:text-base max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: false }}
        >
          Step into a world where elegance defines presence.
        </motion.p>

        {/* Button */}
       <Link to="/collection">
        <motion.button
          className="mt-8 bg-primary text-black px-8 py-3 rounded-xl flex items-center gap-2 font-medium hover:opacity-90 transition"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: false }}
        >
          <img src={exploreIcon} className="w-5 h-5" />
          Explore Collection
        </motion.button>
       </Link>
      </div>
    </section>
  );
}

export default RoyalCTA;
