import React from "react";

export default function PaymentMethods() {
  const cards = [
    {
      id: 1,
      bank: "HDFC Bank",
      number: "•••• •••• •••• 4587",
      name: "Ajay Beerla",
      expiry: "12/28",
      default: true,
    },
    {
      id: 2,
      bank: "HDFC Bank",
      number: "•••• •••• •••• 4587",
      name: "Ajay Beerla",
      expiry: "12/28",
      default: false,
    },
  ];

  return (
    <div className="w-full">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6 md:mb-10">

        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-cinzel font-bold text-heading">Payment Methods</h1>
          <p className="text-sm md:text-base text-gray-600 mt-2">
            Manage your cards and payment options securely
          </p>
        </div>

        <button className="bg-primary text-white px-4 md:px-6 py-2 md:py-3 rounded-lg hover:bg-primaryDark transition flex items-center gap-2 text-sm md:text-base whitespace-nowrap">
          + Add New Method
        </button>

      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">

        {cards.map((card) => (
          <div
            key={card.id}
            className={`relative p-6 md:p-12 lg:py-16 rounded-xl md:rounded-2xl text-white 
            bg-gradient-to-br from-[#111] to-[#3a3a3a]
            ${card.default ? "border-2 border-primary" : ""}`}
          >

            {/* Badge */}
            <span className="absolute top-4 md:top-6 right-4 md:right-6 text-xs px-2 md:px-3 py-0.5 md:py-1 rounded-full bg-primary/20 text-primary">
              {card.default ? "Default" : "Set as Default"}
            </span>

            {/* Bank */}
            <p className="text-xs md:text-sm text-gray-300 mb-4 md:mb-6">
              {card.bank}
            </p>

            {/* Card Number */}
            <h3 className="text-base md:text-lg tracking-widest mb-4 md:mb-6">
              {card.number}
            </h3>

            {/* Bottom */}
            <div className="flex justify-between items-center">

              <div>
                <p className="text-xs md:text-sm text-gray-300">
                  {card.name}
                </p>
              </div>

              <div className="text-xs md:text-sm text-gray-300">
                {card.expiry}
              </div>

            </div>

            {/* Mastercard */}
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
              alt="mastercard"
              className="absolute right-4 md:right-6 bottom-1/2 w-8 md:w-10"
            />

          </div>
        ))}

      </div>
    </div>
  );
}