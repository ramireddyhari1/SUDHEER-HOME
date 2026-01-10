"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BestSellerCard } from "@/components/product/BestSellerCard";
import { Container } from "@/components/ui/Container";

const bestSellers = [
    {
        id: "jaggery-cubes",
        name: "Palm Jaggery Cubes",
        englishName: "(Karupatti)",
        price: 260,
        originalPrice: 320,
        weight: "500 g",
        image: "/products/jaggery cubes.png",
        tags: ["Natural Sweetener", "Iron Rich", "Bone Health"],
        rating: 4.9,
        reviews: 420,
        isBestSeller: true
    },
    {
        id: "black-rice",
        name: "Black Rice",
        englishName: "(Kavuni Arisi)",
        price: 350,
        originalPrice: 450,
        weight: "1 kg",
        image: "/products/black rice.png",
        tags: ["Antioxidants", "Superfood", "Diabetes Friendly"],
        rating: 4.8,
        reviews: 185,
        isBestSeller: true
    },
    {
        id: "jaggery-powder",
        name: "Palm Jaggery Powder",
        englishName: "(Nattu Sakkarai)",
        price: 280,
        originalPrice: 340,
        weight: "500 g",
        image: "/products/jaggery powder.png",
        tags: ["Chemical Free", "Mineral Rich", "Coffee Ready"],
        rating: 4.9,
        reviews: 310,
        isBestSeller: true
    },
    {
        id: "brown-rice",
        name: "Traditional Brown Rice",
        englishName: "(Kaikuthal Arisi)",
        price: 180,
        originalPrice: 240,
        weight: "1 kg",
        image: "/products/brown rice.png",
        tags: ["High Fiber", "Weight Loss", "Farm Fresh"],
        rating: 4.7,
        reviews: 150,
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
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
