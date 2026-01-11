import { HeroCarousel } from "@/components/home/HeroCarousel";
import { BestSellers } from "@/components/home/BestSellers";
import { OffersTicker } from "@/components/home/OffersTicker";
import { StorySection } from "@/components/home/StorySection";
import { Testimonials } from "@/components/home/Testimonials";
import { ProductCategories } from "@/components/home/ProductCategories";
import { SiripurapuStore } from "@/components/home/SiripurapuStore";
import { MadeWithLove } from "@/components/home/MadeWithLove";
import { AuthenticFarmerBanner } from "@/components/home/AuthenticFarmerBanner";
import { FeaturedCollections } from "@/components/home/FeaturedCollections";

import { MobileTopNav } from "@/components/home/MobileTopNav";

export default function Home() {
  return (
    <main className="min-h-screen">
      <MobileTopNav />
      <HeroCarousel />
      <div className="relative z-10">
        <BestSellers />
        <OffersTicker />
        <StorySection />
        <FeaturedCollections />
        <ProductCategories />
        <SiripurapuStore />
        <MadeWithLove />
        <AuthenticFarmerBanner />
        <Testimonials />
      </div>
    </main>
  );
}
