// RoyalStandards.jsx
import { motion } from "framer-motion";
import royalCrown from "../assets/images/royalCrown.png";
import royalCotton from "../assets//images/royalCotton.png";
import royalMedieval from "../assets/images/royalMedieval.png";
import royalDelivery from "../assets/images/royalDelivery.png";

function RoyalStandards() {
  const standards = [
    {
      Image: royalCrown,
      title: "HANDCRAFTED EXCELLENCE",
      desc: "Every stitch reflects mastery and precision",
    },
    {
      Image: royalMedieval,
      title: "PREMIUM FABRICS",
      desc: "Sourced from the finest mills across the world",
    },
    {
      Image: royalCotton,
      title: "LIMITED EDITIONS",
      desc: "Exclusivity reserved for a distinguished few",
    },
    {
      Image: royalDelivery,
      title: "ROYAL DELIVERY",
      desc: "Timely delivery with unmatched service",
    },
  ];

  return (
    <section className="bg-[#0f3d2e] py-36">
      <div className="container-main text-center text-white">
        {/* Heading */}
        <motion.h2
          className="font-cinzel section-heading text-white mb-3"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.6 }}
        >
          THE ROYAL STANDARDS
        </motion.h2>

        <motion.p
          className="text-white/70 mb-14 text-sm md:text-base"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: false, amount: 0.6 }}
        >
          Craftsmanship defined by precision, heritage, and excellence
        </motion.p>

        {/* Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {standards.map((item, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: index * 0.15 }}
              viewport={{ once: false, amount: 0.3 }}
            >
              {/* Icon Circle */}
              <motion.div
                className="w-16 h-16 rounded-full border border-primary 
                 flex items-center justify-center mb-5"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  delay: index * 0.15,
                }}
                viewport={{ once: false }}
              >
                <img src={item.Image} alt="icon" className="w-6 h-6" />
              </motion.div>

              {/* Title */}
              <motion.h3
                className="font-cinzel text-base md:text-[20px] tracking-wide mb-2"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 + 0.1 }}
                viewport={{ once: false }}
              >
                {item.title}
              </motion.h3>

              {/* Description */}
              <motion.p
                className="text-white/60 text-[16px] md:text-[18px] max-w-[220px]"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.15 + 0.2 }}
                viewport={{ once: false }}
              >
                {item.desc}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default RoyalStandards;
