import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Hero({
  bgImage,
  label,
  line,
  title,
  description,
  buttons = [],
  children,
  classes = {},
}) {
  return (
    <section
      className={`relative h-screen bg-cover bg-center ${classes.section || ""}`}
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black/50 ${classes.overlay || ""}`}
      ></div>

      {/* Wrapper */}
      <div
        className={`relative z-10 container-main h-full flex items-center ${
          classes.wrapper || ""
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: 90 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.4 }}
          className={`text-white max-w-5xl ${classes.content || ""}`}
        >
          {/* 🔥 Custom content (override everything) */}
          {children ? (
            children
          ) : (
            <>
              {/* Label */}
              {label && (
                <>
                  <p
                    className={`text-sm tracking-widest mb-2 ${
                      classes.label || ""
                    }`}
                  >
                    {label}
                  </p>
                </>
              )}

             {line && ( <span
                className={`block w-20 h-[1px] bg-primary ${
                  classes.line || ""
                }`}
              ></span>)}

              {/* Title */}
              {title && (
                <h1
                  className={`font-cinzel mt-2 font-bold text-4xl md:text-6xl lg:text-7xl !leading-[1.2] tracking-wider ${
                    classes.title || ""
                  }`}
                >
                  {title}
                </h1>
              )}

              {/* Description */}
              {description && (
                <p
                  className={`mt-6 text-sm md:text-base text-white ${
                    classes.description || ""
                  }`}
                >
                  {description}
                </p>
              )}

              {/* Buttons */}
              {buttons.length > 0 && (
                <div
                  className={`flex flex-wrap gap-4 mt-10 ${
                    classes.buttonWrapper || ""
                  }`}            
                >
                  {buttons.map((btn, i) => (
                   <Link to={btn.link} key={i}>
                    <button
                      key={i}
                      className={`px-6 py-3 rounded-xl font-medium flex items-center gap-3 ${
                        btn.variant === "primary"
                          ? "bg-primary text-heading"
                          : "border border-primary text-primary"
                      } ${classes.button || ""} ${btn.className || ""}`}
                    >
                      {btn.icon && <img src={btn.icon} className="w-5 h-5" />}
                      {btn.text}
                    </button>
                   </Link>
                  ))}
                </div>

                                                             
              )}
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
