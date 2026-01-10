import { HeroCarousel } from "@/components/home/HeroCarousel";
import { BestSellers } from "@/components/home/BestSellers";
import { OffersTicker } from "@/components/home/OffersTicker";
import { StorySection } from "@/components/home/StorySection";
import { ComboPacks } from "@/components/home/ComboPacks";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { Testimonials } from "@/components/home/Testimonials";
import { ProductCategories } from "@/components/home/ProductCategories";
import { FeaturedCollections } from "@/components/home/FeaturedCollections";
import { NewArrivals } from "@/components/home/NewArrivals";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroCarousel />
      <div className="relative z-10">
        <BestSellers />
        <OffersTicker />
        <StorySection />
        <FeaturedCollections />
        <ProductCategories />
        <NewArrivals />
        <ComboPacks />
        <FeaturedProducts />
        <Testimonials />
      </div>
    </main>
  );
}
