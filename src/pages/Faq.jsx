import React, { useState } from 'react';
import starIcon from '../assets/images/faq/star.png';
import knifeIcon from '..//assets/images/faq/knife.png';

const faqData = [
  {
    question: "HOW CAN I TRACK MY ORDER ?",
    answer: "You can track your order from your account dashboard under \"Orders\"."
  },
  {
    question: "DO YOU OFFER INTERNATIONAL SHIPPING?",
    answer: "Yes we ship world wide with additonal shippping charges"
  },
  {
    question: "WHAT IS YOUR RETURN POLICY",
    answer: "Returns are accepted with in 7 days of delivery"
  },
  {
    question: "WHAT PAYMENT METHODS DO YOU ACCEPT?",
    answer: "We accept cards, UPI, and net banking.You can update your profile in the settings section."
  },
  {
    question: "HOW DO I UPDATE MY PROFILE ?",
    answer: "You can update your profile in the settings section."
  }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen mt-12 bg-[#F8F5F0] font-inter">
      {/* Header Section */}
      <div className="bg-[#1A1A1A] text-white py-32 md:py-40 px-6 text-center">
        <h1 className="font-cinzel text-3xl md:text-5xl lg:text-6xl font-normal tracking-[0.1em] mb-4">
          ROYAL ASSISTANCEs
        </h1>
        <p className="text-gray-400 text-sm md:text-base lg:text-lg max-w-2xl mx-auto font-light">
          Find answers to your questions and explore our services
        </p>
      </div>

      {/* FAQ Content Section */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-10 lg:px-20 py-16">
        <div className="flex flex-col gap-4 max-w-[900px] mx-auto">
          {faqData.map((item, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl transition-all duration-300 overflow-hidden border ${
                activeIndex === index ? 'border-[#C19A6B] bg-[#f3eadf]' : 'border-transparent'
              }`}
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none"
              >
                <span className="font-cinzel text-[#1A1A1A] text-sm md:text-base lg:text-lg tracking-[0.05em] font-medium">
                  {item.question}
                </span>
                <img
                  src={activeIndex === index ? knifeIcon : starIcon}
                  alt="icon"
                  className={`w-5 h-5 md:w-6 md:h-6 object-contain transition-transform duration-300 ${
                    activeIndex === index ? 'rotate-0' : 'rotate-90'
                  }`}
                />
              </button> 
              
              <div
                className={`transition-all duration-300 ease-in-out ${
                  activeIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 md:px-8 pb-6 md:pb-8 text-gray-600 text-sm md:text-base leading-relaxed">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
