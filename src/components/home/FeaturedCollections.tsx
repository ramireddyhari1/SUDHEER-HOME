"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const collections = [
    {
        id: 1,
        title: "Ready to Mix",
        badge: "Featured",
        image: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?q=80&w=400&auto=format&fit=crop",
        href: "/products?category=mixes",
        type: "standard"
    },
    {
        id: 2,
        title: "Winter Special",
        badge: "Seasonal Picks",
        image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=400&auto=format&fit=crop",
        href: "/products?category=seasonal",
        type: "standard"
    },
    {
        id: 3,
        title: "Today's Special",
        badge: "Healthy Picks",
        image: "https://images.unsplash.com/photo-1515543904379-3d757afe72e3?q=80&w=400&auto=format&fit=crop",
        href: "/products?category=healthy",
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
        title: "Sankranti Special",
        badge: "Featured",
        image: "https://images.unsplash.com/photo-1605333396715-57772fa5f5df?q=80&w=400&auto=format&fit=crop",
        href: "/products?category=festive",
        type: "standard"
    },
    {
        id: 6,
        title: "New Arrivals",
        badge: "Exclusive",
        image: "https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?q=80&w=400&auto=format&fit=crop",
        href: "/products?sort=new",
        type: "standard"
    },
    {
        id: 7,
        title: "Ghee Sweets",
        badge: "Bestseller",
        image: "https://images.unsplash.com/photo-1579372786545-ea65448d7af1?q=80&w=400&auto=format&fit=crop",
        href: "/products?category=sweets",
        type: "standard"
    }
];

export function FeaturedCollections() {
    return (
        <section className="py-8 bg-[#FFFDF5]">
            <div className="w-full pl-4 md:pl-8"> {/* Left aligned start, full width right */}
                <div className="mb-6">
                    <h2 className="font-serif text-xl md:text-2xl font-bold text-gray-900 border-b-2 border-black inline-block pb-1">
                        Featured this week!
                    </h2>
                </div>

                {/* Full Width Scroll Container */}
                <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide pr-4">
                    {collections.map((item) => (
                        <Link
                            key={item.id}
                            href={item.href}
                            className="flex-shrink-0 w-[140px] md:w-[160px] group flex flex-col items-center gap-2"
                        >
                            {/* Card Image Container */}
                            <div className={`relative w-full aspect-square rounded-2xl overflow-hidden shadow-sm transition-transform duration-300 group-hover:-translate-y-1 ${item.type === 'sale_card' ? 'bg-[#1a237e]' : 'bg-white'}`}>

                                {item.type === 'standard' ? (
                                    <>
                                        {/* Top Badge - White Pill with Pink Text */}
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-b-lg shadow-sm z-10">
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#D81B60]">
                                                {item.badge}
                                            </span>
                                        </div>

                                        {/* Image */}
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </>
                                ) : (
                                    /* Sale Card Design - Blue & Yellow */
                                    <div className="w-full h-full flex flex-col items-center justify-center p-2 text-white relative bg-blue-900 overflow-hidden">
                                        {/* Dynamic Lines Background */}
                                        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.3)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px]"></div>

                                        <div className="relative z-10 flex flex-col items-center">
                                            <span className="text-lg font-black italic mb-0 leading-none tracking-tighter">PRICE</span>
                                            <span className="text-2xl font-black italic text-yellow-400 leading-none tracking-tighter mb-1">DROP</span>
                                            <ArrowRight className="h-6 w-6 text-yellow-400 animate-bounce mt-1 rotate-90" strokeWidth={3} />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Label */}
                            <h3 className="font-bold text-xs md:text-sm text-center text-gray-900 leading-tight px-1">
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
            </div>
        </section>
    );
}
