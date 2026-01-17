"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BestSellerCard } from "@/components/product/BestSellerCard";
import { Container } from "@/components/ui/Container";
import { SectionDivider } from "@/components/ui/SectionDivider";


export function BestSellers() {
    const [products, setProducts] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Fetch products that are flagged as Season's Best or Best Seller
                const res = await fetch('/api/products?collection=season-best');
                const data = await res.json();
                if (data.success) {
                    setProducts(data.products.slice(0, 4)); // Show top 4
                }
            } catch (error) {
                console.error("Failed to fetch best sellers", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (!loading && products.length === 0) return null;

    return (
        <section className="pt-2 pb-4 md:py-12 bg-transparent/50">
            <Container>
                {/* Header - Themed Namam Style */}
                <div className="text-center mb-6 md:mb-8 relative z-10">
                    <h2 className="font-serif font-extrabold text-2xl md:text-4xl text-[#2C1810] tracking-tight drop-shadow-sm mb-0">
                        Season's Best Sellers
                    </h2>

                    {/* The Namam Divider */}
                    <div className="w-full flex justify-center -my-1">
                        <SectionDivider variant="namam" className="!py-0 scale-90" />
                    </div>

                    <p className="text-[#5D4037] font-semibold tracking-wider flex items-center justify-center gap-2 text-sm md:text-base -mt-1">
                        Loved & Trusted by 1M+ Families <span className="text-red-600 text-lg">♥</span>
                    </p>
                </div>

                {/* Grid Layout (Only 4 items) */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 max-w-[1440px] mx-auto">
                    {loading ? (
                        // Skeleton Loading
                        Array(4).fill(0).map((_, i) => (
                            <div key={i} className="animate-pulse">
                                <div className="bg-gray-200 aspect-[4/5] rounded-xl mb-4"></div>
                                <div className="h-4 bg-gray-200 w-3/4 mb-2 rounded"></div>
                                <div className="h-4 bg-gray-200 w-1/2 rounded"></div>
                            </div>
                        ))
                    ) : (
                        products.map((product) => (
                            <BestSellerCard
                                key={product._id}
                                id={product._id}
                                name={product.name}
                                price={product.price}
                                originalPrice={product.originalPrice}
                                image={product.image}
                                rating={product.rating || 5}
                                reviews={product.reviews || 0}
                                weight={product.weight}
                                tags={product.isSeasonBest ? ["Season Best"] : []}
                            />
                        ))
                    )}
                </div>

                {/* View All Button */}
                <div className="mt-4 text-center">
                    <Link
                        href="/products"
                        className="inline-flex items-center gap-2 bg-[#155e42] text-white px-6 py-2 text-sm rounded-full font-medium hover:bg-[#114a34] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200"
                    >
                        View all products <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </Container>
        </section >
    );
}
