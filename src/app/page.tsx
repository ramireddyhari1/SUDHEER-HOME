import { HeroCarousel } from "@/components/home/HeroCarousel";
import { BestSellers } from "@/components/home/BestSellers";
import { OffersTicker } from "@/components/home/OffersTicker";
import { StorySection } from "@/components/home/StorySection";
import { Testimonials } from "@/components/home/Testimonials";
import { OrganicCollections } from "@/components/home/OrganicCollections";
import { NewArrivals } from "@/components/home/NewArrivals";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { TopRatedProducts } from "@/components/home/TopRatedProducts";
import { AuthenticFarmerBanner } from "@/components/home/AuthenticFarmerBanner";
import { FeaturedCollections } from "@/components/home/FeaturedCollections";
import { ProductCategories } from "@/components/home/ProductCategories";
import { SiripurapuStore } from "@/components/home/SiripurapuStore";
import { MadeWithLove } from "@/components/home/MadeWithLove";

import { MobileTopNav } from "@/components/home/MobileTopNav";

export default function Home() {
  return (
    <main className="min-h-screen">
      <MobileTopNav />
      <HeroCarousel />
      <div className="relative z-10">
        {/* 1. Our Organic Collections - HIDDEN */}
        {/* <OrganicCollections /> */}

        {/* 2. Season's Best Sellers */}
        <BestSellers />
        <OffersTicker />

        <StorySection />

        {/* Restored Visual Sections */}
        <FeaturedCollections />
        <ProductCategories />
        <SiripurapuStore />
        <MadeWithLove />

        {/* 3. New Arrivals */}
        <NewArrivals />

        {/* 4. Featured Products - HIDDEN */}
        {/* <FeaturedProducts /> */}

        {/* 5. Top Rated Products - HIDDEN */}
        {/* <TopRatedProducts /> */}

        {/* Fresh from Farm - HIDDEN */}
        {/* <AuthenticFarmerBanner /> */}
        <Testimonials />
      </div>
    </main>
  );
}
