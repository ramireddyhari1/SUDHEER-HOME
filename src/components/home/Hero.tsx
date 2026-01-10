import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Star } from "lucide-react";
import Image from "next/image";

export function Hero() {
    return (
        <section className="relative bg-[#8B2E18] text-white overflow-hidden min-h-[500px] md:min-h-[600px] flex items-center">
            {/* Background Pattern Overlay */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat"></div>

            {/* Glowing Effects */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/20 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-red-600/20 rounded-full blur-[120px] -translate-x-1/2 translate-y-1/2"></div>

            <div className="container mx-auto px-4 relative z-10 w-full h-full">
                <div className="flex flex-col md:flex-row items-center justify-between h-full gap-8 md:gap-0">

                    {/* Left Content - Promotional Text */}
                    <div className="flex-1 text-center md:text-left pt-10 md:pt-0">
                        <div className="inline-flex items-center gap-2 bg-yellow-400 text-red-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6 animate-pulse">
                            <Star className="h-3 w-3 fill-current" /> 1st Big Sale of 2026
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black italic tracking-tighter leading-[0.9] mb-4 text-yellow-50 drop-shadow-md">
                            FLASH <br />
                            <span className="text-yellow-400">DEAL</span>
                        </h1>

                        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 mb-8">
                            <div className="bg-black/30 backdrop-blur-sm px-6 py-2 rounded-lg border border-white/10">
                                <span className="block text-xs uppercase tracking-widest text-white/70">Time Left</span>
                                <span className="font-mono text-xl font-bold text-yellow-400">07 PM - 10 PM</span>
                            </div>
                        </div>

                        <div className="space-y-2 text-lg md:text-xl font-medium text-white/90 mb-8">
                            <p className="flex items-center gap-2 justify-center md:justify-start">
                                <span className="text-yellow-400 font-bold">+</span> Ghee Mysorepak
                            </p>
                            <p className="flex items-center gap-2 justify-center md:justify-start">
                                <span className="text-yellow-400 font-bold">+</span> Banana Chips
                            </p>
                            <p className="flex items-center gap-2 justify-center md:justify-start">
                                <span className="text-yellow-400 font-bold">+</span> Madras Mixture
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 items-center md:items-start">
                            <Link href="/products">
                                <Button size="lg" className="bg-yellow-400 text-red-900 hover:bg-yellow-300 font-bold text-lg h-14 px-8 rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                                    SHOP NOW
                                </Button>
                            </Link>
                            <div className="text-sm font-medium text-white/60 max-w-[200px] leading-tight text-center md:text-left">
                                *Free goodies worth ₹848 on orders above ₹1499
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Product Visual */}
                    <div className="flex-1 relative w-full h-[400px] md:h-[600px] flex items-end justify-center md:justify-end">
                        {/* Badge */}
                        <div className="absolute top-10 right-4 md:right-10 z-20 bg-white text-red-700 rounded-full h-32 w-32 flex flex-col items-center justify-center shadow-2xl rotate-12 border-4 border-yellow-400">
                            <span className="text-lg font-bold leading-none">Extra</span>
                            <span className="text-3xl font-black leading-none">10%</span>
                            <span className="text-xs font-bold leading-none">OFF*</span>
                            <span className="text-[10px] leading-tight mt-1 opacity-70">on your <br /> 1st order</span>
                        </div>

                        {/* Product Layer 1 (Back) */}
                        <div className="relative w-64 h-80 md:w-80 md:h-[450px] z-10 translate-x-10 translate-y-10 rotate-6 transition-transform hover:rotate-0 duration-700">
                            <Image
                                src="https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?auto=format&fit=crop&q=80&w=600"
                                alt="Ghee Product"
                                fill
                                className="object-cover rounded-xl shadow-2xl border-4 border-white/20"
                            />
                        </div>

                        {/* Product Layer 2 (Front) */}
                        <div className="relative w-64 h-80 md:w-80 md:h-[450px] z-20 -translate-x-10 md:-translate-x-20 hover:scale-105 transition-transform duration-500">
                            <Image
                                src="https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&q=80&w=600"
                                alt="Jaggery Product"
                                fill
                                className="object-cover rounded-xl shadow-2xl border-4 border-white/20"
                            />
                            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3 rounded-lg text-red-900 text-center shadow-lg">
                                <span className="block text-xs font-bold uppercase tracking-widest text-[#8B2E18]">Bestseller</span>
                                <span className="font-serif font-bold text-lg">Organic Jaggery</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Side Badge */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#D12658] text-white py-4 px-2 rounded-l-lg z-50 shadow-lg cursor-pointer hover:pl-4 transition-all hidden md:block writing-mode-vertical">
                <span className="writing-mode-vertical font-bold tracking-widest text-sm">★ Customer Reviews</span>
            </div>
        </section>
    );
}
