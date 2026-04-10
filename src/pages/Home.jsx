// Hero.jsx

import FeaturedProducts from "../components/FeaturedProducts";
import RoyalStandards from "../components/RoyalStandards";
import Testimonials from "../components/Testimonials";
import PalaceSection from "../components/PalaceSection";
import RoyalCTA from "../components/RoyalCTA";
import RoyalCollection from "../components/RoyalCollection";
import Hero from "../components/Hero";
import heroImg from "../assets/images/heroImg.png";
import exploreImg from "../assets/images/exploreBtn.png";

function Home() {
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
          },
        ]}

        cls
      />

      <RoyalCollection />
      <FeaturedProducts />
      <RoyalStandards />
      <Testimonials />
      <PalaceSection />
      <RoyalCTA />
    </>
  );
}

export default Home;
