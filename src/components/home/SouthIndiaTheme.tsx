"use client";

import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";

export function SouthIndiaTheme() {
    return (
        <section className="py-12 md:py-20 bg-transparent/50 relative overflow-hidden">
            {/* Decorative background pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(218,165,32,0.1)_50%,transparent_75%,transparent)] bg-[length:60px_60px]"></div>
            </div>

            <Container>
                <div className="flex flex-col items-center gap-8 md:gap-10">
                    {/* Header Section */}
                    <div className="text-center space-y-3 md:space-y-4">
                        {/* Decorative line top */}
                        <div className="flex items-center justify-center gap-3 mb-2">
                            <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-[#DAA520]"></div>
                            <span className="text-xs md:text-sm text-[#8B4513] uppercase tracking-widest font-medium">Heritage Collection</span>
                            <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-[#DAA520]"></div>
                        </div>

                        {/* Main Heading */}
                        <h2 
                            className="text-3xl md:text-5xl font-black text-[#6F4E37] tracking-tight leading-tight"
                            style={{ fontFamily: 'var(--font-arista)' }}
                            suppressHydrationWarning
                        >
                            Native Specialities
                        </h2>

                        {/* Subheading */}
                        <div className="space-y-2">
                            <p className="text-sm md:text-base text-[#8B4513] uppercase tracking-widest font-semibold">
                                Andhra & Telangana
                            </p>
                            <p className="text-xs md:text-sm text-[#6F4E37] font-medium">
                                Experience the authentic flavors of South India
                            </p>
                        </div>

                        {/* Decorative line bottom */}
                        <div className="flex items-center justify-center gap-3 pt-2">
                            <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-[#DAA520]"></div>
                            <div className="w-2 h-2 rounded-full bg-[#DAA520]"></div>
                            <div className="w-2 h-2 rounded-full bg-[#DAA520]"></div>
                            <div className="w-2 h-2 rounded-full bg-[#DAA520]"></div>
                            <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-[#DAA520]"></div>
                        </div>
                    </div>

                    {/* Banner Section with Enhanced Styling */}
                    <div className="w-full group">
                        <div className="relative w-full aspect-[16/9] md:aspect-[3/1] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-[#DAA520]/30 hover:border-[#DAA520]/60">
                            {/* Image */}
                            <Image
                                src="/banners/south-india-theme.png"
                                alt="Experience South India - Historic Landmarks of Andhra & Telangana"
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                                priority
                            />

                            {/* Enhanced Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810]/40 via-transparent to-[#DAA520]/10 mix-blend-overlay"></div>

                            {/* Decorative corner elements */}
                            <div className="absolute top-4 left-4 w-8 h-8 border-2 border-[#DAA520]/60 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="absolute bottom-4 right-4 w-8 h-8 border-2 border-[#DAA520]/60 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                    </div>

                    {/* Bottom accent */}
                    <div className="flex items-center gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                        <div className="w-3 h-3 rounded-full bg-[#DAA520]"></div>
                        <span className="text-xs md:text-sm text-[#6F4E37] uppercase tracking-widely font-medium">Authentic Heritage Products</span>
                        <div className="w-3 h-3 rounded-full bg-[#DAA520]"></div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
