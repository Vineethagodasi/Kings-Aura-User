import knife from "../assets/images/knifes.png";
import rightImg from "../assets/images/palace.png"; 
import exploreIcon from "../assets/images/exploreBtn.png";
import leftBg from "../assets/images/palacebg.jpg";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function PalaceSection() {
  return (
    <section className="w-full bg-[#EDEBE8] py-16 pt-32 pb-28">

      <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch">

        {/* LEFT CONTENT */}
       <div
  className="bg-cover bg-center bg-no-repeat h-full flex items-center px-6 py-12 md:px-10 lg:px-16 overflow-hidden"
  style={{ backgroundImage: `url(${leftBg})` }}
>
  <motion.div
    initial={{ x: -60, opacity: 0 }}
    whileInView={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.7, ease: "easeOut" }}
    viewport={{ once: false, amount: 0.3 }}
  >

            {/* Top Label with knives */}
            <div className="flex items-center gap-3 justify-center mb-6">
              <img src={knife} className="w-14" />
              <span className="text-primary text-sm tracking-[0.2em]">
                KING'S AURA STORE
              </span>
              <img src={knife} className="w-14 rotate-180" />
            </div>

             {/* Heading */}
           <h2 className="relative font-cinzel text-3xl md:text-4xl lg:text-5xl leading-[1.2] tracking-[0.02em] mt-16 text-heading text-center">

  {/* Line */}
  <span className="absolute ml-8 -translate-x-1/2 -top-2 w-20 h-[2px] bg-primary"></span>

  STEP INTO THE PALACE

</h2>

            {/* Description */}
            <p className="mt-6 text-sm md:text-base text-subheading text-center">
              Experience craftsmanship in its finest form. A space where every
              detail reflects heritage and elegance.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">

              {/* Primary Button */}
              <button className="bg-primary text-black px-6 py-3 rounded-xl flex items-center justify-center gap-2 font-medium hover:opacity-90 transition">
                <img src={exploreIcon} className="w-5 h-5" />
                Book a Private Visit
              </button>

              {/* Secondary Button */}
             <Link to="/collection">
              <button className="border border-primary text-primary px-6 py-3 rounded-xl font-medium hover:bg-primary/10 transition">
                Explore Store
              </button>
             </Link>

            </div>
          </motion.div>
        </div>

        {/* RIGHT IMAGE */}
      <div className="w-full h-full overflow-hidden">
  <motion.div
    initial={{ x: 60, opacity: 0 }}
    whileInView={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.7, ease: "easeOut" }}
    viewport={{ once: false, amount: 0.3 }}
  >
    <img
      src={rightImg}
      alt="Palace"
      className="w-full h-full object-cover"
    />
  </motion.div>
</div>

      </div>
    </section>
  );
}

export default PalaceSection;