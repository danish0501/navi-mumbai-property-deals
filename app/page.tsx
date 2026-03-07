import HeroSection from "@/components/Home/HeroSection";
import OurStory from "@/components/Home/OurStory";
import FeaturedProperties from "@/components/Home/FeaturedProperties";
import WhyChooseUs from "@/components/Home/WhyChooseUs";
import CallToAction from "@/components/Home/CallToAction";

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-white">
      <HeroSection />
      <OurStory />
      <FeaturedProperties />
      <WhyChooseUs />
      <CallToAction />
    </main>
  );
}
