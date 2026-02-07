"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { BestSellerCard } from "@/components/product/BestSellerCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionDivider } from "@/components/ui/SectionDivider";

export function NewArrivals() {
    const [products, setProducts] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('/api/products?collection=new-arrivals');
                const data = await res.json();

                if (data.success && data.products) {
                    const dbProducts = data.products.map((p: any) => ({
                        id: p._id,
                        name: p.name,
                        price: p.price,
                        originalPrice: p.originalPrice,
                        image: p.image,
                        weight: p.weight,
                        category: p.category,
                        isBestSeller: p.isSeasonBest // Optional if ProductCard uses it
                    }));
                    setProducts(dbProducts);
                }
            } catch (error) {
                console.error("Failed to load new arrivals");
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (!loading && products.length === 0) return null;

    return (
        <section className="py-16 bg-secondary/5">
            <Container>
                <div className="text-center mb-8 relative z-10">
                    <h2 className="font-serif font-extrabold text-2xl md:text-3xl text-[#2C1810] tracking-tight drop-shadow-sm mb-0">
                        Fresh from Farm
                    </h2>

                    <div className="w-full flex justify-center -my-1">
                        <SectionDivider variant="namam" className="!py-0 scale-90" />
                    </div>

                    <p className="text-[#5D4037] font-semibold tracking-wider flex items-center justify-center gap-2 text-sm md:text-base -mt-1">
                        Newly harvested & packed with love
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6">
                    {products.map((product) => (
                        <BestSellerCard
                            key={product.id}
                            {...product}
                            badge="New Arrival"
                            isBestSeller={false}
                        />
                    ))}
                </div>

                <div className="mt-8 text-center">
                    <Link href="/products?sort=new" className="inline-flex items-center gap-2 text-primary font-bold hover:underline text-sm uppercase tracking-wide">
                        View All <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </Container>
        </section>
    );
}
