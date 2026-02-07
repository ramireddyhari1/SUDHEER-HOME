"use client";

import Image from "next/image";

export function ProductMobileHero() {
    return (
        <section className="relative w-full h-[180px] lg:hidden mb-4 overflow-hidden rounded-b-2xl shadow-sm">
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src="/products/features/winter-ghee.png"
                    alt="Organic Products"
                    fill
                    className="object-cover object-center brightness-[0.85]"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-center px-6">
                <span className="inline-block px-3 py-1 bg-yellow-400 text-red-900 text-[10px] font-bold uppercase tracking-wider rounded-full w-fit mb-2 shadow-sm">
                    100% Organic
                </span>
                <h1 className="text-2xl font-serif font-bold text-white mb-1 leading-tight drop-shadow-md">
                    Pure & Authentic <br />
                    <span className="text-yellow-300 italic">Traditional Foods</span>
                </h1>
                <p className="text-white/90 text-xs font-medium max-w-[200px] leading-relaxed">
                    Direct from organic farmers to your kitchen.
                </p>
            </div>
        </section>
    );
}
