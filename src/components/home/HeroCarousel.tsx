"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";

// Poster Aspect Ratio: 1600x472 (~3.39:1)

const slides = [
    {
        id: 0,
        title: "First Order Special",
        subtitle: "Welcome Offer",
        description: "Get flat 10% OFF on your first order. Use code: SWEET10",
        image: "/POSTERS/10-percent-off-first-order.png",
        cta: "Claim Offer",
        link: "/products",
        align: "center",
        theme: "gold",
        hideText: true
    },
    {
        id: 1,
        title: "Happy Sankranthi",
        subtitle: "Festival of Harvest",
        description: "",
        image: "/POSTERS/site.jpg",
        cta: "Shop Festive Essentials",
        link: "/products",
        align: "center",
        theme: "gold",
        hideText: true
    },
    {
        id: 2,
        title: "Grand Sweets Festival",
        subtitle: "Authentic Traditon",
        description: "Experience the divine taste of home-made Mysorepak, Laddoos & more.",
        image: "https://images.unsplash.com/photo-1605333396715-57772fa5f5df?q=80&w=1600&auto=format&fit=crop",
        cta: "Shop Sweets",
        link: "/products?category=sweets",
        align: "left",
        theme: "gold"
    },
    {
        id: 3,
        title: "Crunchy Goodness",
        subtitle: "Savory Delights",
        description: "Perfect tea-time companions. Hand-crafted Murukku, Mixture & Chips.",
        image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=1600&auto=format&fit=crop",
        cta: "Explore Savories",
        link: "/products?category=savories",
        align: "right",
        theme: "orange"
    },
    {
        id: 4,
        title: "Taste of Home, Anywhere",
        subtitle: "Global Shipping",
        description: "We ship fresh sweets & snacks to over 20+ countries worldwide.",
        image: "https://images.unsplash.com/photo-1526304640156-503db427b3d3?q=80&w=1600&auto=format&fit=crop",
        cta: "Ship Now",
        link: "/shipping",
        align: "center",
        theme: "blue"
    }
];

export function HeroCarousel() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })]);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
    const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on("select", onSelect);
        return () => {
            emblaApi.off("select", onSelect);
        };
    }, [emblaApi, onSelect]);

    return (
        <section className="w-full bg-gray-50 pt-2 pb-2"> {/* Added padding for separation */}
            <div className="container mx-auto px-4 lg:px-6">
                {/* Carousel Container - Mobile: Landscape Rectangle Aspect Ratio (3:2), Desktop: Wide Aspect Ratio */}
                <div className="relative w-full rounded-2xl overflow-hidden shadow-xl aspect-[3/2] md:aspect-[1600/472]">

                    {/* Embla Viewport */}
                    <div className="overflow-hidden h-full" ref={emblaRef}>
                        <div className="flex h-full touch-pan-y">
                            {slides.map((slide) => (
                                <div className="flex-[0_0_100%] min-w-0 relative h-full" key={slide.id}>
                                    {/* Background Image */}
                                    <Image
                                        src={slide.image}
                                        alt={slide.title}
                                        fill
                                        className="object-cover"
                                        priority={slide.id === 0}
                                        sizes="100vw"
                                    />

                                    {/* Overlay Gradient (Only if text is visible) */}
                                    {!slide.hideText && (
                                        <div className={`absolute inset-0 bg-gradient-to-r ${slide.align === 'left' ? 'from-black/70 via-black/40 to-transparent' :
                                            slide.align === 'right' ? 'from-transparent via-black/40 to-black/70' :
                                                'from-black/60 via-transparent to-black/60'
                                            }`} />
                                    )}

                                    {/* Content */}
                                    <div className={`absolute inset-0 flex flex-col ${slide.hideText ? 'justify-end items-center pb-12' :
                                        (slide.align === 'left' ? 'justify-center items-start text-left p-6 md:p-16' :
                                            slide.align === 'right' ? 'justify-center items-end text-right p-6 md:p-16' :
                                                'justify-center items-center text-center p-6 md:p-16')
                                        }`}>

                                        {!slide.hideText && (
                                            <>
                                                <span className={`inline-block px-3 py-1 mb-2 md:mb-4 text-[10px] md:text-sm font-bold tracking-wider uppercase rounded-full ${slide.theme === 'gold' ? 'bg-yellow-400 text-red-900' :
                                                    slide.theme === 'orange' ? 'bg-orange-500 text-white' :
                                                        'bg-blue-500 text-white'
                                                    }`}>
                                                    {slide.subtitle}
                                                </span>
                                                <h2 className="text-2xl md:text-5xl lg:text-6xl font-black text-white mb-2 md:mb-4 drop-shadow-lg max-w-2xl leading-tight">
                                                    {slide.title}
                                                </h2>
                                                <p className="text-sm md:text-xl text-white/90 mb-4 md:mb-8 max-w-lg font-medium drop-shadow-md hidden sm:block">
                                                    {slide.description}
                                                </p>
                                            </>
                                        )}

                                        <Link href={slide.link}>
                                            <Button
                                                size="lg"
                                                className={`font-bold text-base md:text-lg h-12 md:h-14 px-8 rounded-full shadow-lg hover:scale-105 transition-transform ${slide.theme === 'gold' ? 'bg-yellow-400 text-red-900 hover:bg-yellow-300' :
                                                    slide.theme === 'orange' ? 'bg-white text-orange-600 hover:bg-gray-100' :
                                                        'bg-white text-blue-600 hover:bg-gray-100'
                                                    }`}
                                            >
                                                {slide.cta}
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <button
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full backdrop-blur-sm transition-all hover:scale-110 hidden md:block"
                        onClick={scrollPrev}
                    >
                        <ChevronLeft className="h-8 w-8" />
                    </button>
                    <button
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full backdrop-blur-sm transition-all hover:scale-110 hidden md:block"
                        onClick={scrollNext}
                    >
                        <ChevronRight className="h-8 w-8" />
                    </button>

                    {/* Pagination Dots */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                className={`h-2 rounded-full transition-all duration-300 ${index === selectedIndex ? "w-8 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
                                    }`}
                                onClick={() => scrollTo(index)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
