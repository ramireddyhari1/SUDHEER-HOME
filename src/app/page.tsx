import { HeroCarousel } from "@/components/home/HeroCarousel";
import { BestSellers } from "@/components/home/BestSellers";
import { OffersTicker } from "@/components/home/OffersTicker";
import { StorySection } from "@/components/home/StorySection";
import { GlobalShipping } from "@/components/home/GlobalShipping";
import { TrustBadges } from "@/components/home/TrustBadges";
import { OrganicCollections } from "@/components/home/OrganicCollections";
import { NewArrivals } from "@/components/home/NewArrivals";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { TopRatedProducts } from "@/components/home/TopRatedProducts";
import { AuthenticFarmerBanner } from "@/components/home/AuthenticFarmerBanner";
import { FeaturedCollections } from "@/components/home/FeaturedCollections";
import { ProductCategories } from "@/components/home/ProductCategories";
import { SiripurapuStore } from "@/components/home/SiripurapuStore";
import { SouthIndiaTheme } from "@/components/home/SouthIndiaTheme";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { MadeWithLove } from "@/components/home/MadeWithLove";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { MobileTopNav } from "@/components/home/MobileTopNav";
import dynamic from 'next/dynamic';

// Lazy load Testimonials for better performance
const Testimonials = dynamic(() => import("@/components/home/Testimonials").then(mod => ({ default: mod.Testimonials })), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />
});

export default function Home() {
  return (
    <main className="min-h-screen">
      <MobileTopNav />
      <HeroCarousel />
      <div className="relative z-10">
        {/* Categories / Navigation for Mobile (Now below Hero for better impression) */}
        {/* Categories / Navigation for Mobile (Now above Hero) */}
        {/* 1. Our Organic Collections - HIDDEN */}
        {/* <OrganicCollections /> */}

        {/* 2. Season's Best Sellers */}
        <ScrollReveal>
          <BestSellers />
        </ScrollReveal>
        <OffersTicker />

        <StorySection />





        {/* Restored Visual Sections */}
        <ScrollReveal delay={0.2}>
          <FeaturedCollections />
        </ScrollReveal>
        <ScrollReveal width="100%">
          <ProductCategories />
        </ScrollReveal>
        <ScrollReveal variant="fade-in">
          <SouthIndiaTheme />
        </ScrollReveal>

        <SectionDivider />

        <SiripurapuStore />

        <SectionDivider variant="namam" />

        <ScrollReveal variant="fade-in">
          <MadeWithLove />
        </ScrollReveal>

        {/* 3. New Arrivals */}
        <ScrollReveal>
          <NewArrivals />
        </ScrollReveal>

        {/* 4. Featured Products - HIDDEN */}
        {/* <FeaturedProducts /> */}

        {/* 5. Top Rated Products - HIDDEN */}
        {/* <TopRatedProducts /> */}

        {/* Fresh from Farm - HIDDEN */}
        {/* <AuthenticFarmerBanner /> */}
        <ScrollReveal width="100%">
          <GlobalShipping />
        </ScrollReveal>

        <SectionDivider variant="floral" />

        <ScrollReveal>
          <Testimonials />
        </ScrollReveal>

        <TrustBadges />
      </div>
    </main>
  );
}
