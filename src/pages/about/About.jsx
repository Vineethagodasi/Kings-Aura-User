import React from "react";
import { motion } from "framer-motion";
import Hero from "../../components/Hero";
import { Crown, Sword, Castle } from "lucide-react";
import aboutImg from "../../assets/images/about/aboutImg.png";
import closeBlackKnifes from "../../assets/images/about/closeBlackKnifes.png";
import aboutStory from "../../assets/images/about/aboutStory.png";
import aboutCraftImg from "../../assets/images/about/aboutCraftImg.png";
import founder from "../../assets/images/about/founder.png";
import palaceImg from "../../assets/images/about/palaceImg.png";

export default function About() {
  return (
    <div className="bg-[#FDFBF7]">
      <Hero
        bgImage={aboutImg}
        title="A LEGACY OF ELEGANCE"
        description="Where timeless craftsmanship meets modern royalty"
        classes={{
          wrapper: "justify-center",
          content: "text-center",
          buttonWrapper: "justify-center",
        }}
        buttons={[
          {
            text: "Explore Collection",
            link: "/collection",
            variant: "primary",
            icon: closeBlackKnifes,
          },
        ]}
      />

      {/* Our Story Section */}
      <section className="pt-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col-reverse lg:flex-row items-center justify-center relative">
            {/* Text Card */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="z-20 flex flex-col relative -ml-0 lg:-ml-20 w-full lg:w-[480px] xl:w-[580px] h-auto lg:h-[404px] bg-[#F8F5F0] p-8 lg:pt-[50px] lg:pr-[40px] lg:pb-[50px] lg:pl-[80px] gap-[24px] top-0"
            >
              <div className="flex flex-col gap-4">
                <span className="text-[#b68c5a] uppercase tracking-[0.25em] text-xs block font-medium">
                  Our Story
                </span>

                <h2 className="text-3xl lg:text-4xl font-semibold leading-[1.2] uppercase font-cinzel text-heading">
                  Crafting Identity Through <br /> Elegance
                </h2>

                <div className="w-16 h-[2px] bg-[#b68c5a]"></div>
              </div>

              <div className="space-y-6 text-gray-700 leading-relaxed text-[16px] font-inter">
                <p>
                  Born from a vision to redefine elegance, The King's Aura is
                  more than fashion — it is a symbol of presence.
                </p>
                <p>
                  Every piece we create is designed to reflect confidence,
                  crafted for those who lead, not follow.
                </p>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="relative z-10 -mt-10 lg:mt-0 lg:-ml-[150px] xl:-ml-[221px] w-full lg:w-[640px] xl:w-[922px] h-[300px] md:h-[400px] lg:h-[500px]"
            >
              <div className="overflow-hidden h-full">
                <img
                  src={aboutStory}
                  alt="Kings Aura Boutique"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center justify-center relative">
            {/* Image (Left) */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="w-full lg:w-[65%] z-10 h-[300px] md:h-[400px] lg:h-[500px]"
            >
              <div className="shadow-2xl overflow-hidden h-full">
                <img
                  src={aboutCraftImg}
                  alt="Tailoring Process"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Text Card (Right, Overlapping) */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="z-20 flex flex-col relative -ml-0 lg:-ml-20 xl:-ml-40 w-full lg:w-[480px] xl:w-[580px] h-auto lg:h-[404px] bg-[#F8F5F0] p-8 lg:pt-[50px] lg:pr-[40px] lg:pb-[50px] lg:pl-[40px] gap-[24px] top-0"
            >
              <div className="flex flex-col gap-4">
                <span className="text-[#b68c5a] uppercase tracking-[0.25em] text-xs block font-medium">
                  Craftsmanship
                </span>

                <h2 className="text-3xl lg:text-4xl font-semibold leading-[1.2] uppercase font-cinzel text-heading">
                  Crafted With Precision
                </h2>

                <div className="w-16 h-[2px] bg-[#b68c5a]"></div>
              </div>

              <div className="space-y-4 text-gray-700 leading-relaxed text-[16px] font-inter">
                <p>Every garment begins with intention.</p>
                <p>
                  From selecting the finest fabrics to executing every stitch
                  with precision, our process reflects a commitment to
                  perfection.
                </p>
                <p>
                  We don't just create clothing — we craft experiences that
                  define elegance.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-24 bg-[#111111] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold font-cinzel mb-4 tracking-wider uppercase">
              The Pillars of Our Kingdom
            </h2>
            <p className="text-gray-400 font-inter text-sm lg:text-base">
              Guided by values that define timeless elegance
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Crown className="w-8 h-8 text-[#b68c5a]" />,
                title: "Royal Quality",
                desc: "Only the finest fabrics and finishes crafted to perfection",
              },
              {
                icon: <Sword className="w-8 h-8 text-[#b68c5a]" />,
                title: "Strength & Identity",
                desc: "Clothing that reflects confidence, power, and presence.",
              },
              {
                icon: <Castle className="w-8 h-8 text-[#b68c5a]" />,
                title: "Timeless Design",
                desc: "Styles that transcend trends and remain forever relevant.",
              },
            ].map((pillar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-[#1A1A1A] p-10 rounded-2xl border border-white/5 hover:border-[#b68c5a]/30 transition-all duration-500 group"
              >
                <div className="mb-6 flex justify-center group-hover:scale-110 transition-transform duration-500">
                  {pillar.icon}
                </div>
                <h3 className="text-xl font-bold font-cinzel mb-4 tracking-wide uppercase">
                  {pillar.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed font-inter">
                  {pillar.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder's Note Section */}
      <section className="py-20 flex flex-col items-center justify-center text-center bg-[#FDFBF7] overflow-hidden w-full min-h-[662px] p-6 md:p-12 lg:p-[80px] gap-[12px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative mb-6"
        >
          {/* <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-[#b68c5a] p-1">
            <img
              src={founder}
              alt="Ashok Saruyui"
              className="w-full h-full object-cover rounded-full"
            />
          </div> */}
          <div className="w-36 h-44 md:w-44 md:h-56 rounded-[50%] border-2 border-[#b68c5a] flex items-center justify-center">
            <div className="w-[92%] h-[92%] rounded-[50%] overflow-hidden">
              <img
                src={founder}
                alt="Ashok Saruyui"
                className="w-full h-full object-cover grayscale"
              />
            </div>
          </div>
        </motion.div>

        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-[#b68c5a] font-medium uppercase tracking-[0.2em] text-sm mb-2"
        >
          Founder's Note
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="font-cinzel text-2xl md:text-4xl lg:text-[40px] leading-[1.3] max-w-4xl font-bold uppercase tracking-wide mb-6"
        >
          "Style is not what you wear — <br className="hidden md:block" /> it's
          who you become."
        </motion.h2>

        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: 80 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="h-[2px] bg-[#b68c5a] mb-8"
        ></motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          viewport={{ once: true }}
          className="text-gray-600 font-inter text-base md:text-lg max-w-2xl leading-relaxed mb-10"
        >
          At The King's Aura, we design not just clothing, but identity — a
          reflection of confidence, strength, and timeless elegance.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          viewport={{ once: true }}
        >
          <p className="font-cinzel text-xl font-bold uppercase tracking-widest text-heading">
            Ashok Saruyui
          </p>
          <p className="text-gray-500 font-inter text-sm uppercase tracking-[0.1em] mt-1">
            Founder
          </p>
        </motion.div>
      </section>

      {/* Final Hero CTA */}
      <Hero
        bgImage={palaceImg}
        title="Step Into The Kingdom"
        description="Discover a collection crafted for those who lead with presence and style."
        classes={{
          section: "h-[600px]",
          wrapper: "justify-center",
          content: "text-center",
          buttonWrapper: "justify-center",
        }}
        buttons={[
          {
            text: "Explore Collection",
            link: "/collection",
            variant: "primary",
            icon: closeBlackKnifes,
          },
        ]}
      />
    </div>
  );
}
