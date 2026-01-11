"use client";

import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function StorySection() {
    return (
        <section className="pt-6 pb-0 md:py-16 bg-[#FDFBF7]"> {/* Warm aesthetic background */}
            <Container>
                {/* View All Button from previous section if missed, or just a top spacer */}
                {/* The user asked to put this downside the Best Sellers. Best Sellers has its own button. */}

                <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-8 relative max-w-5xl mx-auto px-4 md:px-0">

                    {/* Step 1: Origin */}
                    <div className="flex flex-col items-center text-center flex-1 z-10">
                        <div className="relative w-32 h-32 md:w-48 md:h-48 mb-4 hover:scale-105 transition-transform duration-500">
                            <Image
                                src="/story/village.png"
                                alt="Village Home"
                                fill
                                className="object-contain drop-shadow-sm mix-blend-multiply"
                            />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#155e42] mb-2">Our Roots</h3>
                        <p className="text-sm md:text-base text-gray-700 font-medium leading-relaxed max-w-xs">
                            Started in 1998 from a <br className="hidden md:block" /> small village of Andhra
                        </p>
                    </div>

                    {/* Arrow 1 - Hidden on mobile for cleaner stack, or simple down arrow? Let's hide complex arrows on mobile for now to reduce clutter or use a simple vertical separator if needed. Standard practice: spacing is enough. */}
                    <div className="hidden md:block absolute left-[28%] top-[35%] w-32 h-12 z-0 opacity-100 flex-none text-gray-400">
                        <svg width="100%" height="100%" viewBox="0 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 20C30 10 70 10 90 20" stroke="#666" strokeWidth="2" strokeDasharray="5,5" strokeLinecap="round" />
                            <path d="M85 15L90 20L85 25" stroke="#666" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </div>

                    <div className="flex flex-col items-center text-center flex-1 z-10 w-full md:w-auto">
                        <div className="relative w-32 h-32 md:w-48 md:h-48 mb-4 hover:scale-105 transition-transform duration-500">
                            <Image
                                src="/story/cooking.png"
                                alt="Traditional Cooking"
                                fill
                                className="object-contain drop-shadow-sm mix-blend-multiply"
                            />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-serif font-bold text-orange-500 mb-2">Tradition</h3>
                        <p className="text-sm md:text-base text-gray-700 font-medium leading-relaxed max-w-xs">
                            Handcrafted with love <br className="hidden md:block" /> using traditional methods
                        </p>
                    </div>

                    {/* Arrow 2 */}
                    <div className="hidden md:block absolute right-[28%] bottom-[45%] w-32 h-12 z-0 rotate-180 scale-x-[-1] opacity-100 flex-none text-gray-400">
                        <svg width="100%" height="100%" viewBox="0 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 10C30 20 70 20 90 10" stroke="#666" strokeWidth="2" strokeDasharray="5,5" strokeLinecap="round" />
                            <path d="M85 5L90 10L85 15" stroke="#666" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </div>

                    <div className="flex flex-col items-center text-center flex-1 z-10 w-full md:w-auto">
                        <div className="relative w-32 h-32 md:w-48 md:h-48 mb-4 hover:scale-105 transition-transform duration-500">
                            <Image
                                src="/story/family.png"
                                alt="Happy Family"
                                fill
                                className="object-contain drop-shadow-sm mix-blend-multiply"
                            />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-serif font-bold text-red-500 mb-2">Promise</h3>
                        <p className="text-sm md:text-base text-gray-700 font-medium leading-relaxed max-w-xs">
                            Bringing pure, organic <br className="hidden md:block" /> goodness to your table
                        </p>
                    </div>

                </div>

                {/* View All Button for the Story? No, usually for products. I'll leave it clean as per reference image. */}
            </Container>
        </section>
    );
}
