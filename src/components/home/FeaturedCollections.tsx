"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionDivider } from "@/components/ui/SectionDivider";

const collections = [
    {
        id: 1,
        title: "Jaggery Products",
        badge: "Featured",
        image: "/products/features/jaggery-mix.png",
        href: "/products?category=jaggery",
        type: "standard"
    },
    {
        id: 2,
        title: "Winter Special",
        badge: "Seasonal Picks",
        image: "/products/features/winter-ghee.png",
        href: "/products?category=ghee",
        type: "standard"
    },
    {
        id: 3,
        title: "Healthy Millets",
        badge: "Healthy Picks",
        image: "/products/features/healthy-millet.png",
        href: "/products?category=millets",
        type: "standard"
    },
    {
        id: 4,
        title: "Up to 40% OFF",
        badge: "",
        image: "",
        href: "/products?sort=sale",
        type: "sale_card"
    },
    {
        id: 5,
        title: "Heritage Rice",
        badge: "Featured",
        image: "/products/features/heritage-rice.png",
        href: "/products?category=rice",
        type: "standard"
    },

    {
        id: 7,
        title: "Honey & Spices",
        badge: "Bestseller",
        image: "/products/features/honey-spices.png",
        href: "/products?category=honey-spices",
        type: "standard"
    }
];

export function FeaturedCollections() {
    return (
        <section className="pt-4 pb-0 md:py-8 bg-transparent/50">
            <Container>
                <div className="mb-8 text-center">
                    <h2 
                        className="font-arista text-2xl md:text-3xl font-bold text-[#2C1810] mb-2"
                    >
                        Featured this week!
                    </h2>
                    <div className="flex justify-center">
                        <SectionDivider variant="royal" className="!py-0" />
                    </div>
                </div>

                {/* Grid Layout for Mobile consistency */}
                <div className="grid grid-cols-3 md:flex md:justify-center md:gap-4 md:overflow-x-auto md:pb-6 md:no-scrollbar md:pr-4 md:snap-x md:snap-mandatory gap-2">
                    {collections.map((item) => (
                        <Link
                            key={item.id}
                            href={item.href}
                            className="w-full md:flex-shrink-0 md:w-[160px] group flex flex-col items-center gap-2 md:snap-center"
                        >
                            {/* Card Image Container */}
                            <div className={`relative w-full aspect-square rounded-2xl overflow-hidden shadow-sm transition-transform duration-300 group-hover:-translate-y-1 ${item.type === 'sale_card' ? 'bg-[#1a237e]' : 'bg-white'}`}>

                                {item.type === 'standard' ? (
                                    <>
                                        {/* Top Badge - White Pill with Pink Text */}
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-white px-1.5 py-0.5 rounded-b shadow-sm z-10 w-max max-w-[95%]">
                                            <span className="text-[7px] md:text-[10px] font-bold uppercase tracking-wider text-[#D81B60] truncate block">
                                                {item.badge}
                                            </span>
                                        </div>

                                        {/* Image */}
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            sizes="(max-width: 768px) 50vw, 200px"
                                        />
                                    </>
                                ) : (
                                    /* Sale Card Design - Blue & Yellow */
                                    <div className="w-full h-full flex flex-col items-center justify-center p-2 text-white relative bg-blue-900 overflow-hidden">
                                        {/* Dynamic Lines Background */}
                                        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.3)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px]"></div>

                                        <div className="relative z-10 flex flex-col items-center">
                                            <span className="text-xs md:text-lg font-black italic mb-0 leading-none tracking-tighter">PRICE</span>
                                            <span className="text-sm md:text-2xl font-black italic text-yellow-400 leading-none tracking-tighter mb-1">DROP</span>
                                            <ArrowRight className="h-4 w-4 md:h-6 md:w-6 text-yellow-400 animate-bounce mt-1 rotate-90" strokeWidth={3} />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Label */}
                            <h3 className="font-bold text-[10px] md:text-sm text-center text-gray-900 leading-tight px-1 line-clamp-2 min-h-[2.5em] flex items-center justify-center">
                                {item.type === 'sale_card' ? (
                                    <span className="flex items-center justify-center gap-1 text-[#ea580c]">
                                        ⚡ {item.title}
                                    </span>
                                ) : (
                                    item.title
                                )}
                            </h3>
                        </Link>
                    ))}
                </div>
            </Container>

            {/* Branding Bar */}
            <div className="w-full bg-[#155E42] py-2 mt-2 flex items-center justify-center gap-4 relative overflow-hidden group">

                {/* Left Animated Line */}
                <div className="h-[1px] w-12 md:w-24 bg-gradient-to-r from-transparent via-[#FFD700] to-[#FFD700] animate-pulse opacity-80"></div>

                <h3 className="text-white font-serif text-sm tracking-[0.2em] uppercase relative z-10 drop-shadow-sm whitespace-nowrap">
                    Vaishnavi Organics
                </h3>

                {/* Right Animated Line */}
                <div className="h-[1px] w-12 md:w-24 bg-gradient-to-l from-transparent via-[#FFD700] to-[#FFD700] animate-pulse opacity-80"></div>
            </div>
        </section>
    );
}
