import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import leftDoor from "../assets/images/leftDoor.png";
import rightDoor from "../assets/images/rightDoor.png";
import heroImg from "../assets/images/heroImg2.png";
import afterVedioImg from "../assets/images/afterVedioImg.png";
import crownIcon from "../assets/images/king.png";
import logo from "../assets/images/logo.png";

const IntroOverlay = ({ onFinish }) => {
  // Phases: 'video' → 'ready' → 'opening' → 'done'
  const [phase, setPhase] = useState("video");
  const videoRef = useRef(null);

  // When video ends, transition to door image
  const handleVideoEnd = () => {
    setPhase("ready");
  };

  // When "Start Shopping" is clicked:
  // 1. Zoom afterVedioImg (starts immediately)
  // 2. Open doors (starts with a delay)
  const handleStart = () => {
    setPhase("opening");

    // onFinish happens mid-swing
    setTimeout(() => {
      if (onFinish) onFinish();
    }, 5500);

    // Overlay cleanup
    setTimeout(() => {
      setPhase("done");
    }, 5500);
  };

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-[#020202] overflow-hidden flex items-center justify-center p-0 m-0"
        >
          {/* 1. Full-Screen Video Phase */}
          {phase === "video" && (
            <motion.div
              initial={{ opacity: 1 }}
              className="absolute inset-0 z-50 bg-black"
            >
              <video
                ref={videoRef}
                src="/vedio/theKings.mp4"
                autoPlay
                muted
                playsInline
                onEnded={handleVideoEnd}
                className="w-full h-full object-cover"
              />
            </motion.div>
          )}

          {/* 2. Static Image (shown after video) */}
          <AnimatePresence>
            {(phase === "ready" || phase === "opening") && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={
                  phase === "opening"
                    ? {
                        scale: 3, // Sequential step 1: Zoom the image
                        opacity: 0,   // Fade out as it zooms so doors appear through it
                        transition: {
                          scale: { duration: 3, ease: "easeIn" },
                          opacity: { duration: 2, delay: 1.5 },
                        },
                      }
                    : { opacity: 1, scale: 1 }
                }
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-40 bg-cover bg-center"
                style={{ backgroundImage: `url(${afterVedioImg})` }}
              >
                <div className="absolute inset-0 bg-black/20" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* 3. Opening Animation Phase (Doors revealed behind the zooming image) */}
          {(phase === "ready" || phase === "opening") && (
            <>
              {/* Background Revealed Behind Doors */}
              <motion.div
                initial={{ opacity: 0, scale: 3 }}
                animate={
                  phase === "opening"
                    ? {
                        opacity: 1,
                        scale: 1,
                        transition: {
                          opacity: { duration: 2, delay: 1.5 }, // Wait for zoom to progress
                          scale: { duration: 5, ease: "easeOut" },
                        }
                      }
                    : { opacity: 0, scale: 1.8 }
                }
                className="absolute inset-0 z-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${heroImg})` }}
              >
                <div className="absolute inset-0 bg-black/40" />
              </motion.div>

              {/* Fog Layer */}
              <div className="absolute inset-0 z-10 opacity-40 pointer-events-none">
                <div className="absolute bottom-[-10%] left-[-10%] w-[120%] h-[50%] bg-gradient-to-t from-[#B8860B]/10 to-transparent blur-[120px] animate-fog" />
              </div>

              {/* Light Leak seam at center */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                <div
                  className={`w-[2px] h-[70vh] bg-gradient-to-b from-transparent via-yellow-400/30 to-transparent blur-[4px] transition-opacity duration-1000 ${
                    phase === "opening" ? "opacity-0" : "opacity-100"
                  }`}
                />
              </div>

              {/* Door Container */}
              <motion.div
                className="relative z-80 w-screen h-screen flex items-center justify-center -space-x-1"
                animate={
                  phase === "opening"
                    ? { 
                        scale: 1.2, 
                        transition: { duration: 6, delay: 2, ease: "easeOut" } 
                      }
                    : {}
                }
              >
                {/* Left Door */}
                <div className="relative w-1/2 h-full perspective-[2000px] overflow-visible">
                  <motion.div
                    initial={{ rotateY: 0 }}
                    animate={
                      phase === "opening"
                        ? {
                            rotateY: -115,
                            x: -50,
                            transition: { 
                              duration: 5, 
                              delay: 1.5, // Sequential step 2: Open doors after zoom starts
                              ease: [0.25, 0.1, 0.25, 1] 
                            },
                          }
                        : {}
                    }
                    className={`w-full h-full bg-cover bg-right origin-left border-r border-yellow-700/10 ${
                      phase === "ready" ? "opacity-0" : "opacity-100"
                    }`}
                    style={{
                      backgroundImage: `url(${leftDoor})`,
                      backgroundSize: "cover",
                    }}
                  >
                    <div className="absolute inset-0 bg-black/30 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
                  </motion.div>
                </div>

                {/* Right Door */}
                <div className="relative w-1/2 h-full perspective-[2000px] overflow-visible">
                  <motion.div
                    initial={{ rotateY: 0 }}
                    animate={
                      phase === "opening"
                        ? {
                            rotateY: 115,
                            x: 50,
                            transition: { 
                              duration: 5, 
                              delay: 1.5, // Same delay for symmetry
                              ease: [0.25, 0.1, 0.25, 1] 
                            },
                          }
                        : {}
                    }
                    className={`w-full h-full bg-cover bg-left origin-right border-l border-yellow-700/10 ${
                      phase === "ready" ? "opacity-0" : "opacity-100"
                    }`}
                    style={{
                      backgroundImage: `url(${rightDoor})`,
                      backgroundSize: "cover",
                    }}
                  >
                    <div className="absolute inset-0 bg-black/30 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-transparent to-transparent" />
                  </motion.div>
                </div>
              </motion.div>

              {/* Start Shopping UI */}
              <AnimatePresence>
                {phase === "ready" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{
                      opacity: 0,
                      transition: { duration: 0.5, ease: "easeIn" },
                    }}
                    className="absolute inset-0 z-[100] flex flex-col items-center justify-center gap-6"
                  >
                    {/* Logo */}
                    <motion.div
                      initial={{ opacity: 0, scale: 2 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 2.5, ease: [0.2, 1, 0.3, 1] }}
                    >
                      <img
                        src={logo}
                        alt="Logo"
                        className="w-48 md:w-64 lg:w-80 object-contain 
                                   drop-shadow-[0_0_25px_rgba(255,215,0,0.4)]"
                      />
                    </motion.div>

                    {/* Button */}
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 0 40px rgba(212, 160, 23, 0.4)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.6, delay: 1 }}
                      onClick={handleStart}
                      className="group flex items-center gap-3 px-5 py-3
                                 bg-primary text-black 
                                 tracking-[0.2em] text-sm font-medium
                                 rounded-xl transition-all duration-500 overflow-hidden relative shadow-lg"
                    >
                      <img
                        src={crownIcon}
                        alt="icon"
                        className="w-7 h-7 object-contain"
                      />
                      <span className="relative z-10">Start Shopping</span>
                      <div
                        className="absolute inset-0 bg-gradient-to-r 
                                   from-transparent via-white/20 to-transparent 
                                   -translate-x-full group-hover:animate-[shimmer_2s_infinite]"
                      />
                    </motion.button>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.4 }}
                      transition={{ delay: 1.5 }}
                      className="absolute bottom-8 text-[10px] text-yellow-700/50 uppercase tracking-[0.2em]"
                    >
                      Immersive Experience
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroOverlay;
