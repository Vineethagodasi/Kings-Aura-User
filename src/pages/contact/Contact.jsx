import React, { useState } from "react";
import { motion } from "framer-motion";
import Hero from "../../components/Hero";
import contactBg from "../../assets/images/contactBg.jpg";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import axiosInstance from "../../services/axiosInstance";
import { showSuccess } from "../../utils/toast";

export default function Contact() {

  const [formData, setFormData] = useState({
  name: "",
  email: "",
  subject: "",
  message: "",
});

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

const submitContact = async (data) => {
  return axiosInstance.post(
    "/user/query",
    data
  );
};

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await submitContact(formData);

    if (res.data.success) {
      showSuccess("Message sent successfully");

      // reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    }
  } catch (err) {
    console.error(err);
  }
};

  return (
    <div className="bg-[#FDFBF7] min-h-screen relative overflow-x-hidden">
      {/* Hero Section */}
      <Hero
        bgImage={contactBg}
        title="CONNECT WITH THE KINGDOM"
        description="We're here to assist you with anything you need."
        classes={{
          wrapper: "justify-center",
          content: "text-center",
                   buttonWrapper: "justify-center",
        }}
        buttons={[
              {
            text: "Send message",
            link: "/contact",
            variant: "primary",
          //  icon:,
          },
        ]}
      />

      {/* Contact Section */}
      <section className="py-24 bg-[#f4efe9] overflow-hidden">
        <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-12 lg:gap-8">

                    {/* Right Card: SEND A MESSAGE (Styles from Image 2: 500px, glassmorphism) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full lg:w-[500px] bg-white/90 backdrop-blur-[24px] rounded-[16px] border border-white/30 p-8 flex flex-col gap-8 shadow-[0_20px_60px_rgba(0,0,0,0.16)]"
          >
            <div className="text-center">
              <div className="w-12 h-[1px] bg-[#b68c5a] mx-auto mb-2"></div>
              <h2 className="font-cinzel text-xl font-bold text-heading uppercase tracking-widest">
                Send a Message
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col gap-1 border-b border-gray-200 py-2">
                <input
                  type="text"
                    name="name"
  value={formData.name}
  onChange={handleChange}
                  placeholder="Enter your Name"
                  className="bg-transparent border-none outline-none font-inter text-sm text-gray-700 placeholder:text-gray-400 focus:placeholder:opacity-0 transition-all"
                />
              </div>
              <div className="flex flex-col gap-1 border-b border-gray-200 py-2">
                <input
                  type="email"
                  name="email"
  value={formData.email}
  onChange={handleChange}

                  placeholder="Enter your Email"
                  className="bg-transparent border-none outline-none font-inter text-sm text-gray-700 placeholder:text-gray-400 focus:placeholder:opacity-0 transition-all"
                />
              </div>
              <div className="flex flex-col gap-1 border-b border-gray-200 py-2">
                <input
                  type="text"
                    name="subject"
  value={formData.subject}
  onChange={handleChange}
                  placeholder="Subject"
                  className="bg-transparent border-none outline-none font-inter text-sm text-gray-700 placeholder:text-gray-400 focus:placeholder:opacity-0 transition-all"
                />
              </div>
              <div className="flex flex-col gap-1 border-b border-gray-200 py-2">
                <textarea
                  name="message"
  value={formData.message}
  onChange={handleChange}
                  placeholder="Message"
                  rows="3"
                  className="bg-transparent border-none outline-none font-inter text-sm text-gray-700 placeholder:text-gray-400 focus:placeholder:opacity-0 transition-all resize-none"
                />
              </div>

              <div className="w-full h-[1px] bg-gray-200 mt-2"></div>

              <button type="submit" className="w-full bg-[#b68c5a] text-white font-inter font-medium py-4 rounded-[8px] flex items-center justify-center gap-2 hover:bg-[#a37b4d] transition-all group shadow-md">
                Send message <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </motion.div>
          
          {/* Left Card: GET IN TOUCH (Styles from Image 3: 436px) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full lg:w-[436px] bg-white rounded-[16px] p-8 flex flex-col gap-4 shadow-xl"
          >
            <div>
              <div className="w-12 h-[1px] bg-[#b68c5a] mb-2"></div>
              <h2 className="font-cinzel text-xl font-bold text-heading uppercase tracking-widest">
                Get In Touchss
              </h2>
            </div>

            <div className="flex flex-col gap-8 mt-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#b68c5a]/5 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-[#b68c5a]" />
                </div>
                <div className="flex flex-col gap-1 border-b border-gray-100 pb-2 w-full">
                  <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Email</span>
                  <p className="text-gray-700 font-inter text-sm font-medium tracking-tight">Support@Kingaura.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#b68c5a]/5 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-[#b68c5a]" />
                </div>
                <div className="flex flex-col gap-1 border-b border-gray-100 pb-2 w-full">
                  <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Phone</span>
                  <p className="text-gray-700 font-inter text-sm font-medium tracking-tight">+91 87654 66544</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#b68c5a]/5 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[#b68c5a]" />
                </div>
                <div className="flex flex-col gap-1 pb-2 w-full">
                  <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Location</span>
                  <p className="text-gray-700 font-inter text-sm font-medium tracking-tight">Hyderabad, India</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Luxury Quote Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-32 text-center"
        >
          <h2 className="font-cinzel text-2xl md:text-3xl lg:text-4xl text-heading leading-tight tracking-[0.1em] max-w-5xl mx-auto uppercase">
            "LUXURY IS IN EVERY DETAIL OF COMMUNICATION."
          </h2>
        </motion.div>

        {/* Map Section */}
        <div className="mt-32 flex flex-col lg:flex-row items-center gap-8  p-6 lg:p-10 rounded-[24px] border border-white/40 shadow-sm">
          {/* Map Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="w-full lg:flex-1 h-[400px] rounded-[16px] overflow-hidden shadow-inner grayscale hover:grayscale-0 transition-all duration-700"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121781.42371900115!2d78.29177196237793!3d17.47545934426543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb91f3f972b273%3A0x9da37210e408a267!2sKukatpally%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1713781234567!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>

          {/* Location Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full lg:w-[380px] bg-white rounded-[16px] p-8 shadow-xl flex flex-col gap-6"
          >
            <div>
              <h3 className="font-cinzel text-lg font-bold text-heading uppercase tracking-widest mb-1">
                The King's Aura Studio
              </h3>
              <div className="w-10 h-[1px] bg-[#b68c5a]"></div>
            </div>

            <div className="text-gray-600 font-inter text-sm leading-relaxed">
              <p>Kukatpally, Hyderabad</p>
              <p>Telangana, India</p>
            </div>

            <button 
              onClick={() => window.open('https://maps.app.goo.gl/9uK6XyXW8H8Z8Y8Z8', '_blank')}
              className="w-fit bg-[#b68c5a] text-white font-inter font-medium py-3 px-6 rounded-[8px] flex items-center gap-2 hover:bg-[#a37b4d] transition-all group shadow-md text-sm"
            >
              Get Direction <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}


