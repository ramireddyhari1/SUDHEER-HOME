"use client";

import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";

export function AuthenticFarmerBanner() {
    return (
        <section className="relative w-full bg-[#F5F5DC] overflow-hidden pt-12 md:pt-0">
            {/* Wavy Top Separator - Transition from White to Cream */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
                <svg
                    className="relative block w-[calc(100%+1.3px)] h-[50px] md:h-[100px]"
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                        className="fill-white"
                    ></path>
                </svg>
            </div>

            <Container className="relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between min-h-[400px]">

                    {/* Illustration Container */}
                    <div className="w-full md:w-1/2 flex justify-center md:justify-start pt-8 md:pt-12">
                        <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px]">
                            <Image
                                src="/products/farmer_child.png"
                                alt="Farmer showing vegetables to child"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </div>

                    {/* Text Content */}
                    <div className="w-full md:w-1/2 text-center md:text-left pb-16 md:pb-0 px-4">
                        <h2 className="font-sans font-bold text-3xl md:text-5xl lg:text-6xl text-[#2C1810] leading-tight">
                            Authentic Taste, just like your <br className="hidden md:block" />
                            <span className="text-[#B8860B] block mt-2">
                                Farmer&apos;s Harvest
                            </span>
                        </h2>
                    </div>

                </div>
            </Container>

            {/* Decorative vertical "Customer Reviews" strip imitation (optional simple flair) */}
            {/* Note: User has a floating button for this, so skipping the static right-side strip to avoid clutter, 
           but keeping the design clean as per the reference's main visual style. */}
        </section>
    );
}
