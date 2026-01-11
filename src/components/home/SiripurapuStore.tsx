"use client";

import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Gift, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

// Categories for the Siripurapu Store section
const categories = [
    {
        id: "kitchen-essentials",
        name: "Organic Staples",
        image: "/products/siripurapu/kitchen_essentials.png",
        link: "/products?category=kitchen-essentials"
    },
    {
        id: "regional-picks",
        name: "Organic Snacks",
        image: "/products/siripurapu/regional_picks.png",
        link: "/products?category=regional-picks"
    },
    {
        id: "sweet-delights",
        name: "Organic Sweets",
        image: "/products/siripurapu/sweet_delights.png",
        link: "/products?category=sweet-delights"
    },
    {
        id: "gifting-specials",
        name: "Eco Gifting",
        image: "/products/siripurapu/gifting_specials.png",
        link: "/products?category=gifting-specials"
    }
];

export function SiripurapuStore() {
    return (
        <section className="py-8 md:py-16 bg-white relative">
            <Container>
                {/* Header Section */}
                <div className="text-center mb-6 md:mb-12 relative">
                    <div className="flex items-center justify-center gap-3 mb-2">
                        <span className="text-2xl">🎀</span>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 text-center">
                            SIRIPURAPU VARI STORE
                        </h2>
                        <span className="text-2xl">🎀</span>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-gray-600 italic">
                        <Gift className="w-5 h-5 text-red-500" />
                        <p>100% Organic Groceries, Handcrafted Snacks & Nature's Sweet Treats</p>
                    </div>

                    {/* Decorative Line */}
                    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-200 -z-10 hidden md:block"></div>
                    <div className="w-full h-[1px] bg-gray-200 mt-6 md:hidden"></div>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            href={category.link}
                            className="group relative block"
                        >
                            <div className="relative overflow-hidden rounded-3xl bg-[#0B2136] aspect-square shadow-lg transition-transform duration-300 group-hover:-translate-y-2">
                                {/* Yellow Top Label */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#FFC107] px-6 py-2 rounded-b-xl z-20 w-3/4 text-center shadow-md">
                                    <h3 className="font-serif font-bold text-[#0B2136] text-sm md:text-base">
                                        {category.name}
                                    </h3>
                                </div>

                                {/* Image Container */}
                                <div className="absolute inset-x-0 bottom-0 h-[85%] overflow-hidden">
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={category.image}
                                            alt={category.name}
                                            fill
                                            className="object-cover object-center group-hover:scale-110 transition-transform duration-700"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                        />
                                        {/* Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B2136]/60 to-transparent opacity-60"></div>
                                    </div>
                                </div>

                                {/* Shop Now Button (Visible on Hover) */}
                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                                    <span className="bg-white/90 backdrop-blur-sm text-[#0B2136] px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg hover:bg-white">
                                        Shop Now <ArrowRight className="w-3 h-3" />
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </Container>
        </section>
    );
}
