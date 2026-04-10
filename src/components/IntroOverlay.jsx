import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import leftDoor from "../assets/images/leftDoor.png";
import rightDoor from "../assets/images/rightDoor.png";
import heroImg from "../assets/images/heroImg.png";
import crownIcon from "../assets/images/king.png"; // your icon image
import logo from "../assets/images/logo.png";

const IntroOverlay = ({ onFinish }) => {
  const [isOpening, setIsOpening] = useState(false);
  const [isDone, setIsDone] = useState(false);

// IntroOverlay.jsx — key changes
const handleStart = () => {
  setIsOpening(true);
  // Call onFinish at ~3.5s so the page mounts DURING the door swing,
  // not after — by the time doors finish, content is already rendered.
  setTimeout(() => {
    if (onFinish) onFinish();
  }, 3500);
  // Mark overlay as done slightly after so exit animation overlaps
  setTimeout(() => {
    setIsDone(true);
  }, 4800);
};
  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-[#020202] overflow-hidden flex items-center justify-center p-0 m-0"
        >
          {/* Hero Image Background (Revealed as doors open) */}
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={
              isOpening
                ? {
                    opacity: 1,
                    scale: 1,
                    transition: {
                      opacity: { duration: 2, delay: 0.5 },
                      scale: { duration: 5, ease: "easeOut" },
                    },
                  }
                : { opacity: 0, scale: 1.8 }
            }
            className="absolute inset-0 z-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImg})` }}
          >
            <div className="absolute inset-0 bg-black/40" />
          </motion.div>

          {/* Subtle Fog Layer */}
          <div className="absolute inset-0 z-10 opacity-40 pointer-events-none">
            <div className="absolute bottom-[-10%] left-[-10%] w-[120%] h-[50%] bg-gradient-to-t from-[#B8860B]/10 to-transparent blur-[120px] animate-fog" />
            <div className="absolute bottom-[-5%] right-[-5%] w-[100%] h-[40%] bg-gradient-to-t from-yellow-700/5 to-transparent blur-[100px] animate-fog [animation-delay:2s]" />
          </div>

          {/* Light Leak Behind Doors - Vertical glow at the center seam */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
            <div
              className={`w-[2px] h-[70vh] bg-gradient-to-b from-transparent via-yellow-400/30 to-transparent blur-[4px] transition-opacity duration-1000 ${isOpening ? "opacity-0" : "opacity-100"}`}
            />
          </div>

          {/* Camera Zoom Container */}
          <motion.div
            animate={isOpening ? {} : {}}
            className="relative z-30 w-screen h-screen flex items-center justify-center -space-x-1"
          >
            {/* Left Door */}
            <div className="relative w-1/2 h-full perspective-[2000px] overflow-visible">
              <motion.div
                initial={{ rotateY: 0 }}
                animate={
                  isOpening
                    ? {
                        rotateY: -115,
                        x: -50,
                        transition: { duration: 5, ease: [0.25, 0.1, 0.25, 1] },
                      }
                    : {}
                }
                className="w-full h-full bg-cover bg-right origin-left intro-door-shadow border-r border-yellow-700/10"
                style={{
                  backgroundImage: `url(${leftDoor})`,
                  backgroundSize: "cover",
                }}
              >
                {/* Texture Overlay */}
                <div className="absolute inset-0 bg-black/30 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
              </motion.div>
            </div>

            {/* Right Door */}
            <div className="relative w-1/2 h-full perspective-[2000px] overflow-visible">
              <motion.div
                initial={{ rotateY: 0 }}
                animate={
                  isOpening
                    ? {
                        rotateY: 115,
                        x: 50,
                        transition: { duration: 5, ease: [0.25, 0.1, 0.25, 1] },
                      }
                    : {}
                }
                className="w-full h-full bg-cover bg-left origin-right intro-door-shadow border-l border-yellow-700/10"
                style={{
                  backgroundImage: `url(${rightDoor})`,
                  backgroundSize: "cover",
                }}
              >
                {/* Texture Overlay */}
                <div className="absolute inset-0 bg-black/30 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-transparent to-transparent" />
              </motion.div>
            </div>
          </motion.div>

          {/* Intro UI */}
          <AnimatePresence>
            {!isOpening && (
              <motion.div
                initial={{ opacity: 1 }}
                exit={{
                  opacity: 0,
                  y: -20,
                  transition: { duration: 1, ease: "easeIn" },
                }}
                className="absolute inset-0 z-[100] flex flex-col items-center justify-center -mt-[150px] -ml-[10px] gap-2 bg-black/10"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 8 }} // start zoomed-in
                  animate={{ opacity: 1, scale: 1 }} // zoom out to normal
                  transition={{
                    duration: 3.5,
                    ease: [0.2, 1, 0.3, 1], // smooth cinematic easing
                  }}
                >
                  <img
                    src={logo}
                    alt="Logo"
                    className="w-48 md:w-64 lg:w-80 object-contain 
               drop-shadow-[0_0_25px_rgba(255,215,0,0.4)]"
                  />
                </motion.div>
                <motion.button
                  initial={{ opacity: 0, scale: 1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 40px rgba(212, 160, 23, 0.4)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  onClick={handleStart}
                  className="group flex items-center gap-3 px-5 py-3
             bg-primary text-black 
              tracking-[0.2em] text-sm font-medium
             rounded-xl transition-all duration-500 overflow-hidden"
                >
                  {/* Icon */}
                  <img
                    src={crownIcon}
                    alt="icon"
                    className="w-7 h-7 object-contain"
                  />

                  {/* Text */}
                  <span className="relative z-10">Start Shopping</span>

                  {/* Shine effect */}
                  <div
                    className="absolute inset-0 bg-gradient-to-r 
                  from-transparent via-white/20 to-transparent 
                  -translate-x-full group-hover:animate-[shimmer_2s_infinite]"
                  />
                </motion.button>

                {/* Sound Hint */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.4 }}
                  className="absolute bottom-8 text-[10px] text-yellow-700/50 uppercase tracking-[0.2em]"
                >
                  Immersive Experience
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroOverlay;
