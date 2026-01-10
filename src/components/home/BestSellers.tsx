"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BestSellerCard } from "@/components/product/BestSellerCard";
import { Container } from "@/components/ui/Container";

const bestSellers = [
    {
        id: "mysorepak",
        name: "Ghee Mysorepak",
        englishName: "(Soft)",
        price: 199,
        originalPrice: 298,
        weight: "2 x 100 g",
        image: "/products/mysorepak.png",
        tags: ["Melt in Mouth", "Authentic Taste", "No Preservatives", "Festive Spl"],
        rating: 4.8,
        reviews: 880,
        isBestSeller: true
    },
    {
        id: "abc-mix",
        name: "ABC Milk Mix",
        englishName: "(Apple, Beetroot, Carrot)",
        price: 339,
        originalPrice: 355,
        weight: "250 g",
        image: "/products/abc-mix.png",
        tags: ["No White Sugar", "No Added Colors", "No Preservatives", "Ready to Mix"],
        rating: 4.8,
        reviews: 633,
        isBestSeller: true
    },
    {
        id: "athirasam",
        name: "Athirasam",
        englishName: "(Traditional Jaggery Sweet)",
        price: 159,
        originalPrice: 169,
        weight: "150 g",
        image: "/products/athirasam.png",
        tags: ["No White Sugar", "No Additives", "Jaggery Based", "Festive Spl"],
        rating: 4.7,
        reviews: 805,
        isBestSeller: true
    },
    {
        id: "banana-chips",
        name: "Kerala Banana Chips",
        englishName: "(100% Coconut Oil)",
        price: 399,
        originalPrice: 558,
        weight: "3 x 200 g",
        image: "/products/banana-chips.png",
        tags: ["Super Crispy", "Kerala Special", "No Palm Oil", "No Preservatives"],
        rating: 4.8,
        reviews: 897,
        isBestSeller: true
    }
];

export function BestSellers() {
    return (
        <section className="py-12 bg-white">
            <Container>
                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-serif font-bold flex items-center justify-center gap-2">
                        <span className="text-orange-500">⚡</span>
                        Season's Best Sellers
                        <span className="text-orange-500">⚡</span>
                    </h2>
                    <p className="text-gray-500 italic mt-2 flex items-center justify-center gap-1">
                        Loved & Trusted by 1M+ Happy Families <span className="text-red-500">💕</span>
                    </p>
                    <div className="w-full flex items-center justify-center gap-4 mt-4">
                        <div className="h-[1px] w-24 bg-gray-300"></div>
                        <div className="h-[1px] w-24 bg-gray-300"></div>
                    </div>
                </div>

                {/* Grid Layout (Only 4 items) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {bestSellers.map((product) => (
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
