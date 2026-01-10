"use client";

import React from "react";
import { Sparkles, TicketPercent, Gift, Zap } from "lucide-react";

const offers = [
    {
        text: "FLAT 20% OFF on specific Bundles",
        code: "SWEET20",
        icon: TicketPercent
    },
    {
        text: "FREE SHIPPING on orders above ₹499",
        code: "",
        icon: Gift
    },
    {
        text: "Buy 2 Get 1 FREE on Mysorepak",
        code: "MYSORE3",
        icon: Sparkles
    },
    {
        text: "10% Instant Discount on UPI Payments",
        code: "",
        icon: Zap
    },
];

export function OffersTicker() {
    return (
        <div className="bg-[#050505] text-[#FCD34D] py-2 overflow-hidden border-y border-[#FCD34D]/20 relative z-20 shadow-2xl group">
            {/* Gradient Overlays for smooth fade effect */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

            <div className="flex animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused] transition-all duration-300">
                {/* Triple the list to ensure smooth infinite scroll without gaps */}
                {[...offers, ...offers, ...offers, ...offers].map((offer, index) => (
                    <div key={index} className="flex items-center gap-3 mx-8 select-none">
                        <div className="bg-[#FCD34D]/10 p-1 rounded-full border border-[#FCD34D]/20">
                            <offer.icon className="h-4 w-4 text-[#FCD34D]" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold tracking-wider uppercase text-white/90">
                                {offer.text}
                            </span>
                            {offer.code && (
                                <span className="text-[10px] font-mono text-[#FCD34D] bg-[#FCD34D]/10 px-2 py-0.5 rounded border border-[#FCD34D]/20 w-fit mt-0.5">
                                    CODE: {offer.code}
                                </span>
                            )}
                        </div>

                        {/* Elegant Separator */}
                        <div className="ml-8 h-8 w-[1px] bg-gradient-to-b from-transparent via-[#FCD34D]/30 to-transparent"></div>
                    </div>
                ))}
            </div>

            <style jsx>{`
                .animate-marquee {
                    animation: marquee 40s linear infinite;
                }
                /* Smooth pause on hover is handled by Tailwind group-hover helper above */
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
            `}</style>
        </div>
    );
}
