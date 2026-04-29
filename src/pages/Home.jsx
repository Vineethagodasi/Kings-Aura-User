// Hero.jsx

import FeaturedProducts from "../components/FeaturedProducts";
import RoyalStandards from "../components/RoyalStandards";
import Testimonials from "../components/Testimonials";
import PalaceSection from "../components/PalaceSection";
import RoyalCTA from "../components/RoyalCTA";
import RoyalCollection from "../components/RoyalCollection";
import Hero from "../components/Hero";
import heroImg from "../assets/images/heroImg2.png";
import exploreImg from "../assets/images/exploreBtn.png";
import { useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance";

function Home() {

  const [reviews, setReviews] = useState([]);

  const fetchRandomReviews = async () => {
  const res = await axiosInstance.get(
    "/products/reviews/random"
  );

  if (res.data?.success) {
    setReviews(res.data.data || []);
  }
};

  // Fetch reviews on component mount
  useEffect(() => {
    fetchRandomReviews();
  }, []);

  return (
    <>
      <Hero
        bgImage={heroImg}
        label="THE ROYAL WARDROBE"
        line={true}
        title="DRESS LIKE A KING, RULE YOUR PRESENCE"
        description="Crafted for those who command attention. Every thread speaks of power, elegance, and legacy."
        buttons={[
          {
            text: "Explore Collection",
            icon: exploreImg,
            variant: "primary",
            link: "/collection",
          },
          {
            text: "Enter the Kingdom",
            variant: "outline",
            link: "/about",
          },
        ]}

        cls
      />

      <RoyalCollection />
      <FeaturedProducts />
      <div className="section bg-[#EDEBE8] -mt-16">
  <div className="container-main">
    
    <h2 className="section-heading text-heading text-center mb-6">
      What Our Customers Say
    </h2>
        <p className="section-subheading text-center mb-8">
      Real feedback from those who wear the aura.
    </p>

    <div className="grid md:grid-cols-3 gap-6">
      {reviews.map((item) => (
        <div
          key={item._id}
          className="bg-white p-6 rounded-2xl border"
        >
          {/* USER */}
          <div className="flex items-center gap-3 mb-3">
            <img
              src={item.user?.profileUrl}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="text-heading text-sm">
                {item.user?.email}
              </p>
              <p className="text-primary text-xs">
                ⭐ {item.rating}
              </p>
            </div>
          </div>

          {/* TITLE */}
          <h3 className="font-cinzel text-primary">
            {item.reviewtitle}
          </h3>

          {/* CONTENT */}
          <p className="text-subheading text-sm mt-1">
            {item.reviewcontent}
          </p>
        </div>
      ))}
    </div>
  </div>
</div>
      <RoyalStandards />
      <Testimonials />
      <PalaceSection />
      <RoyalCTA />
    </>
  );
}

export default Home;
