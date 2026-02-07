import { HeroCarousel } from "@/components/home/HeroCarousel";
import { BestSellers } from "@/components/home/BestSellers";
import { OffersTicker } from "@/components/home/OffersTicker";
import { StorySection } from "@/components/home/StorySection";
import { TrustBadges } from "@/components/home/TrustBadges";
import { FeaturedCollections } from "@/components/home/FeaturedCollections";
import { ProductCategories } from "@/components/home/ProductCategories";
import { SiripurapuStore } from "@/components/home/SiripurapuStore";
import { SouthIndiaTheme } from "@/components/home/SouthIndiaTheme";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { MadeWithLove } from "@/components/home/MadeWithLove";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { MobileTopNav } from "@/components/home/MobileTopNav";
import dynamic from 'next/dynamic';

// Lazy load heavy components and those below fold
const GlobalShipping = dynamic(() => import("@/components/home/GlobalShipping").then(m => ({ default: m.GlobalShipping })));
const NewArrivals = dynamic(() => import("@/components/home/NewArrivals").then(m => ({ default: m.NewArrivals })));
const Testimonials = dynamic(() => import("@/components/home/Testimonials").then(mod => ({ default: mod.Testimonials })), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />
});

export default function Home() {
  return (
    <main className="min-h-screen">
      <MobileTopNav />
      <HeroCarousel />
      <div className="relative z-10">

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

        <ScrollReveal width="100%">
          <GlobalShipping />
        </ScrollReveal>

        <SectionDivider variant="floral" />

        <ScrollReveal>
          <Testimonials />
        </ScrollReveal>

        {/* <TrustBadges /> */}
      </div>
    </main>
  );
}
