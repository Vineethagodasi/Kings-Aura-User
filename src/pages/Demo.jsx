import { motion } from "framer-motion";

export default function Demo() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-10 bg-gray-100">
      
      {/* Fade Up */}
      <motion.div
        className="bg-blue-500 text-white p-6 rounded-lg"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Fade Up
      </motion.div>

      {/* Slide from Left */}
      <motion.div
        className="bg-green-500 text-white p-6 rounded-lg"
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        Slide from Left
      </motion.div>

      {/* Slide from Right */}
      <motion.div
        className="bg-purple-500 text-white p-6 rounded-lg"
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        Slide from Right
      </motion.div>

      {/* Zoom In */}
      <motion.div
        className="bg-red-500 text-white p-6 rounded-lg"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        Zoom In
      </motion.div>

    </div>
  );
}