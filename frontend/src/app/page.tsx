import Navbar from "@/components/Navbar";
import Hero from "@/components/hero/Hero";
import WhyPamoja from "@/components/sections/WhyPamoja";
import FeaturedCommunities from "@/components/sections/FeaturedCommunities";
import HowItWorks from "@/components/sections/HowItWorks";
import Trust from "@/components/sections/Trust";
import Footer from "@/components/sections/Footer";
import CTA from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <WhyPamoja />
      <FeaturedCommunities />
      <HowItWorks />
      <Trust />
      <CTA />
      <Footer />
    </>
  );
}