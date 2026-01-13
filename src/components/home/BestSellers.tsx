"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BestSellerCard } from "@/components/product/BestSellerCard";
import { Container } from "@/components/ui/Container";


export function BestSellers() {
    const [products, setProducts] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Fetch only Season Best products
                const res = await fetch('/api/products?collection=season-best');
                const data = await res.json();

                if (data.success && data.products) {
                    const dbProducts = data.products.map((p: any) => ({
                        id: p._id,
                        name: p.name,
                        englishName: p.englishName || "",
                        price: p.price,
                        originalPrice: p.originalPrice,
                        weight: p.weight || "1 kg",
                        image: p.image,
                        tags: p.tags || [],
                        rating: p.rating || 5,
                        reviews: p.reviews || 0,
                        isBestSeller: p.isSeasonBest || p.isBestSeller // Fallback
                    }));
                    setProducts(dbProducts);
                }
            } catch (error) {
                console.error("Failed to load products");
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (!loading && products.length === 0) return null; // Hide section if no data


    return (
        <section className="py-6 md:py-12 bg-white">
            <Container>
                {/* Header */}
                <div className="text-center mb-4 md:mb-8">
                    <h2 className="text-xl md:text-3xl font-serif font-bold flex items-center justify-center gap-3">
                        <span className="hidden md:block h-[2px] w-12 bg-gray-800"></span>
                        <span className="block md:hidden h-[2px] w-8 bg-gray-800"></span>
                        <span className="text-orange-500">⚡</span>
                        Season's Best Sellers
                        <span className="text-orange-500">⚡</span>
                        <span className="hidden md:block h-[2px] w-12 bg-gray-800"></span>
                        <span className="block md:hidden h-[2px] w-8 bg-gray-800"></span>
                    </h2>
                    <p className="text-gray-500 italic mt-2 flex items-center justify-center gap-1 text-sm md:text-base">
                        Loved & Trusted by 1M+ Happy Families <span className="text-red-500">💕</span>
                    </p>
                </div>

                {/* Grid Layout (Only 4 items) */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 max-w-5xl mx-auto">
                    {products.map((product) => (
                        <BestSellerCard key={product.id} {...product} />
                    ))}
                </div>

                {/* View All Button */}
                <div className="mt-12 text-center">
                    <Link
                        href="/products"
                        className="inline-flex items-center gap-2 bg-[#155e42] text-white px-8 py-3 rounded-full font-medium hover:bg-[#114a34] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200"
                    >
                        View all products <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </Container>
        </section>
    );
}
