"use client";

import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";

export function SouthIndiaTheme() {
    return (
        <section className="pt-6 pb-6 md:py-12 bg-transparent/50">
            <Container>
                {/* Mobile-focused Layout */}
                <div className="flex flex-col items-center gap-4">
                    <div className="text-center mb-2 md:mb-4">
                        <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#6F4E37]">
                            Native Specialities
                        </h2>
                        <p className="text-xs md:text-sm text-[#8B4513] uppercase tracking-widest mt-1">
                            Andhra & Telangana
                        </p>
                    </div>

                    <div className="relative w-full aspect-[16/9] md:aspect-[3/1] rounded-2xl overflow-hidden shadow-md border border-[#DAA520]/20">
                        <Image
                            src="/banners/south-india-theme.png"
                            alt="Experience South India - Historic Landmarks of Andhra & Telangana"
                            fill
                            className="object-cover"
                            priority
                        />
                        {/* Gradient Overlay for better integration */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#FFFDF5]/20 to-transparent mix-blend-overlay"></div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
