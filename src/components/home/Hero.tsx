"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Star } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FloatingElements } from "./FloatingElements";
import confetti from "canvas-confetti";

export function Hero() {
    const [content, setContent] = useState<any>({});
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const res = await fetch('/api/content?section=home-hero');
                const data = await res.json();
                if (data.success && data.content) {
                    setContent(data.content);
                }
            } catch (err) {
                console.error("Failed to load hero content");
            }
        };

        // Initial fetch
        fetchContent();

        // Poll every 5 seconds
        const interval = setInterval(fetchContent, 5000);
        return () => clearInterval(interval);
    }, []);

    const slides = content.hero_slides && content.hero_slides.length > 0 ? content.hero_slides : [];

    if (slides.length === 0) return null; // Or render nothing if no real data is available

    useEffect(() => {
        if (slides.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [slides.length]);

    const handleShopHover = (e: React.MouseEvent<HTMLButtonElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (rect.left + rect.width / 2) / window.innerWidth;
        const y = (rect.top + rect.height / 2) / window.innerHeight;

        confetti({
            origin: { x, y },
            particleCount: 30,
            spread: 50,
            gravity: 0.8,
            colors: ['#FCD34D', '#ff0000', '#ffffff'],
            ticks: 100,
            zIndex: 60
        });
    };

    const announcement = content.announcement_text || "+ Ghee Mysorepak  + Banana Chips  + Madras Mixture";
    const slide = slides[currentSlide];

    return (
        <section className="relative bg-[#8B2E18] text-white overflow-hidden min-h-[550px] md:min-h-[500px] flex items-center transition-all duration-700 group">

            {/* Background Pattern Overlay */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat z-0"></div>

            {/* NEW: Magical Floating Elements Layer */}
            <FloatingElements />

            {/* Glowing Effects */}
            {/* Glowing Effects - Adjusted to prevent overflow */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-amber-500/20 rounded-full blur-[80px] md:blur-[120px] translate-x-1/4 -translate-y-1/2 animate-pulse z-0 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-red-600/20 rounded-full blur-[80px] md:blur-[120px] -translate-x-1/4 translate-y-1/2 animate-pulse z-0 pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10 w-full h-full">
                <div className="flex flex-col md:flex-row items-center justify-between h-full gap-8 md:gap-0">

                    {/* Left Content - Promotional Text */}
                    <div className="flex-1 text-center md:text-left pt-10 md:pt-0 z-20">
                        <div key={currentSlide} className="animate-in fade-in slide-in-from-left-4 duration-700">
                            <div className="inline-flex items-center gap-2 bg-yellow-400 text-red-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6 hover:scale-105 transition-transform duration-300 shadow-lg cursor-default">
                                <Star className="h-3 w-3 fill-current animate-spin-slow" /> {slide.subtitle}
                            </div>

                            <h1 className="text-[clamp(2rem,8vw,3.5rem)] md:text-[clamp(3.5rem,6vw,6rem)] font-black italic tracking-tighter leading-[0.9] mb-4 text-yellow-50 drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)]">
                                <span dangerouslySetInnerHTML={{ __html: slide.title?.replace(/\n/g, '<br/>') || "" }}></span>
                            </h1>

                            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 mb-8">
                                <div className="bg-black/30 backdrop-blur-md px-6 py-2 rounded-lg border border-white/20 hover:border-yellow-400/50 transition-colors">
                                    <span className="block text-xs uppercase tracking-widest text-white/70">Time Left</span>
                                    <span className="font-mono text-xl font-bold text-yellow-400">07 PM - 10 PM</span>
                                </div>
                            </div>

                            <div className="space-y-2 text-lg md:text-xl font-medium text-white/90 mb-8">
                                <p className="flex items-center gap-2 justify-center md:justify-start">
                                    {announcement}
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 items-center md:items-start">
                                <Link href={slide.link || "/products"}>
                                    <Button
                                        size="lg"
                                        onMouseEnter={handleShopHover}
                                        className="bg-yellow-400 text-red-900 hover:bg-yellow-300 font-bold text-lg h-14 px-8 rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 relative overflow-hidden"
                                    >
                                        <span className="relative z-10 flex items-center gap-2">
                                            {slide.buttonText || "SHOP NOW"} <ArrowRight className="w-5 h-5 ml-1" />
                                        </span>
                                        {/* Shine effect */}
                                        <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent z-0"></div>
                                    </Button>
                                </Link>
                                <div className="text-sm font-medium text-white/60 max-w-[200px] leading-tight text-center md:text-left">
                                    *Free goodies worth ₹848 on orders above ₹1499
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Product Visual */}
                    <div className="flex-1 relative w-full h-[400px] md:h-[450px] flex items-end justify-center md:justify-end perspective-1000">

                        {/* Badge */}
                        <div className="absolute top-10 right-4 md:right-10 z-20 bg-white text-red-700 rounded-full h-32 w-32 flex flex-col items-center justify-center shadow-2xl rotate-12 border-4 border-yellow-400 animate-bounce-slow">
                            <span className="text-lg font-bold leading-none">Extra</span>
                            <span className="text-3xl font-black leading-none">10%</span>
                            <span className="text-xs font-bold leading-none">OFF*</span>
                            <span className="text-[10px] leading-tight mt-1 opacity-70">on your <br /> 1st order</span>
                        </div>

                        {/* Product Layer 1 (Back Decor) */}
                        <div className="absolute w-64 h-80 md:w-64 md:h-[350px] z-10 translate-x-10 translate-y-10 rotate-6 transition-transform hover:rotate-0 duration-700 opacity-60 grayscale blur-[1px]">
                            <Image
                                src="https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?auto=format&fit=crop&q=80&w=600"
                                alt="Decor"
                                fill
                                className="object-cover rounded-xl shadow-2xl border-4 border-white/20"
                            />
                        </div>

                        {/* Product Layer 2 (Front - Main Slide Image) */}
                        <div key={currentSlide} className="relative w-56 h-72 md:w-64 md:h-[350px] z-20 -translate-x-6 md:-translate-x-20 transition-transform duration-500 animate-in fade-in duration-700 group-hover:rotate-1">
                            <Image
                                src={slide.image}
                                alt="Hero Product"
                                fill
                                className="object-cover rounded-xl shadow-2xl border-4 border-white/20"
                            />
                            {slide.title && (
                                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3 rounded-lg text-red-900 text-center shadow-lg">
                                    <span className="block text-xs font-bold uppercase tracking-widest text-[#8B2E18]">Featured</span>
                                    <span className="font-serif font-bold text-lg">{slide.title.replace(/<[^>]*>/g, '').substring(0, 15)}...</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Navigation Dots */}
                {slides.length > 1 && (
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-30">
                        {slides.map((_: any, idx: number) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentSlide(idx)}
                                className={`w-3 h-3 rounded-full transition-all ${idx === currentSlide ? 'bg-yellow-400 w-8' : 'bg-white/50 hover:bg-white'}`}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Floating Side Badge */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#D12658] text-white py-4 px-2 rounded-l-lg z-50 shadow-lg cursor-pointer hover:pl-4 transition-all hidden md:block writing-mode-vertical hover:bg-[#b01e48]">
                <span className="writing-mode-vertical font-bold tracking-widest text-sm">★ Customer Reviews</span>
            </div>
        </section>
    );
}
