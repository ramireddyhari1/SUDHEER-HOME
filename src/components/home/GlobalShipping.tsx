"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";
import { Plane, Globe, MapPin, PackageCheck, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export function GlobalShipping() {
    return (
        <section className="py-2 md:py-20 bg-[#155E42] relative overflow-hidden text-white">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>

            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">

                    {/* Left: Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-4"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-yellow-300 text-xs font-bold uppercase tracking-widest">
                            <Globe className="w-3 h-3" /> Worldwide Delivery
                        </div>

                        <h2 className="font-serif text-lg md:text-6xl font-bold leading-tight">
                            From Our Village <br />
                            <span className="text-yellow-400 text-xl md:text-6xl">To Your World.</span>
                        </h2>

                        <p className="text-white/80 text-[10px] md:text-xl leading-relaxed max-w-xl">
                            Miss the taste of home? We ship our authentic, handmade pickles and sweets to over 50+ countries. Freshly packed, customs-cleared, and delivered to your doorstep.
                        </p>

                        <div className="grid grid-cols-2 gap-2 pt-0">
                            {/* Stat 1 */}
                            <div className="flex flex-col gap-0">
                                <div className="flex items-center gap-1 text-yellow-400 font-bold text-base md:text-3xl">
                                    <Clock className="w-3 h-3 md:w-6 md:h-6" /> 3-5
                                </div>
                                <span className="text-[8px] md:text-sm text-white/70 font-medium uppercase tracking-wider">Days Delivery</span>
                            </div>
                            {/* Stat 2 */}
                            <div className="flex flex-col gap-0">
                                <div className="flex items-center gap-1 text-yellow-400 font-bold text-base md:text-3xl">
                                    <PackageCheck className="w-3 h-3 md:w-6 md:h-6" /> 100%
                                </div>
                                <span className="text-[8px] md:text-sm text-white/70 font-medium uppercase tracking-wider">Customs Cleared</span>
                            </div>
                        </div>

                        <div className="pt-2">
                            <Link href="/shipping">
                                <Button size="lg" className="bg-white text-[#155E42] hover:bg-yellow-400 hover:text-[#155E42] font-bold px-4 h-8 md:h-14 rounded-full text-[10px] md:text-lg shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all">
                                    Check Shipping Rates
                                </Button>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Right: Animated Globe */}
                    <div className="relative h-[400px] md:h-[500px] hidden md:flex items-center justify-center">
                        {/* Glow Behind */}
                        <div className="absolute inset-0 bg-yellow-400/20 blur-[100px] rounded-full scale-75 animate-pulse" />

                        {/* Globe SVG */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                            className="relative w-full h-full max-w-[500px] max-h-[500px]"
                        >
                            <svg viewBox="0 0 500 500" className="w-full h-full drop-shadow-2xl">
                                {/* Globe Circle Background */}
                                <circle cx="250" cy="250" r="200" fill="#1E4D3A" fillOpacity="0.5" stroke="#FACC15" strokeWidth="2" strokeOpacity="0.3" />

                                {/* Meridians/Parallels (Abstract) */}
                                <motion.path
                                    d="M250,50 Q400,250 250,450 Q100,250 250,50"
                                    fill="none" stroke="#FACC15" strokeWidth="1" strokeOpacity="0.2"
                                    animate={{ d: ["M250,50 Q450,250 250,450 Q50,250 250,50", "M250,50 Q400,250 250,450 Q100,250 250,50"] }}
                                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                />
                                <motion.path
                                    d="M50,250 Q250,100 450,250 Q250,400 50,250"
                                    fill="none" stroke="#FACC15" strokeWidth="1" strokeOpacity="0.2"
                                />
                                <motion.circle cx="250" cy="250" r="150" fill="none" stroke="#FACC15" strokeWidth="1" strokeOpacity="0.1" />

                                {/* India Location Pin */}
                                <motion.g
                                    initial={{ opacity: 0, scale: 0 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <circle cx="280" cy="210" r="6" fill="#FACC15" className="animate-ping" />
                                    <circle cx="280" cy="210" r="4" fill="#FFFFFF" />
                                </motion.g>

                                {/* Plane Path */}
                                <path id="flightPath" d="M280,210 Q350,150 400,200 T280,350 T150,250 T280,210" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="8 8" strokeOpacity="0.5" />

                                {/* Flying Plane */}
                                <motion.g>
                                    <Plane className="text-white fill-white w-8 h-8" style={{ transformOrigin: "center" }} />
                                    <animateMotion
                                        dur="8s"
                                        repeatCount="indefinite"
                                        path="M280,210 Q350,150 400,200 T280,350 T150,250 T280,210"
                                        rotate="auto"
                                    />
                                </motion.g>
                            </svg>

                            {/* Floating Destination Posters (Desktop: Orbit/Float) */}
                            {destinations.map((dest, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.5 + idx * 0.2 }}
                                    animate={{
                                        y: [0, -10, 0],
                                        rotate: [0, 5, -5, 0]
                                    }}
                                    // Randomize float duration
                                    // transmission duration needs to be properly set, not as a property of animate
                                    className={`absolute hidden lg:flex flex-col items-center justify-center w-24 h-32 bg-white rounded-xl shadow-2xl border-4 ${dest.borderColor} z-20`}
                                    style={{
                                        top: dest.position.top,
                                        left: dest.position.left,
                                        right: dest.position.right,
                                        bottom: dest.position.bottom,
                                        transform: `rotate(${dest.rotate}deg)` // Static rotation
                                    }}
                                >
                                    {/* Animation Override for continuous float */}
                                    <motion.div
                                        animate={{ y: [0, -8, 0] }}
                                        transition={{ duration: 3 + idx, repeat: Infinity, ease: "easeInOut" }}
                                        className="w-full h-full flex flex-col items-center justify-center p-2"
                                    >
                                        <div className={`p-2 rounded-full ${dest.bg} mb-2`}>
                                            <dest.icon className={`w-6 h-6 ${dest.iconColor}`} />
                                        </div>
                                        <span className="font-bold text-[#2C1810] text-xs uppercase tracking-wide">{dest.name}</span>
                                        <span className="text-[10px] text-gray-500 font-medium">{dest.time}</span>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* Mobile: Horizontal Destination Scroll */}
                <div className="lg:hidden mt-6 pb-2">
                    <p className="text-white/60 text-sm font-bold uppercase tracking-widest mb-4 text-center">Popular Destinations</p>
                    <div className="flex gap-2 overflow-x-auto pb-2 snap-x px-4 no-scrollbar">
                        {destinations.map((dest, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className={`flex-shrink-0 w-16 h-20 bg-white rounded-lg shadow-lg border-2 ${dest.borderColor} flex flex-col items-center justify-center snap-center`}
                            >
                                <div className={`p-1 rounded-full ${dest.bg} mb-1`}>
                                    <dest.icon className={`w-3 h-3 ${dest.iconColor}`} />
                                </div>
                                <span className="font-bold text-[#2C1810] text-[8px] uppercase tracking-wide">{dest.name}</span>
                                <span className="text-[7px] text-gray-500 font-medium mt-0 leading-none">{dest.time}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Container>
        </section >
    );
}

const destinations = [
    {
        name: "USA",
        time: "3-5 Days",
        icon: MapPin,
        position: { top: "10%", left: "0%" },
        rotate: -10,
        borderColor: "border-blue-100",
        bg: "bg-blue-50",
        iconColor: "text-blue-600"
    },
    {
        name: "UK",
        time: "3-4 Days",
        icon: Clock,
        position: { top: "5%", right: "5%" },
        rotate: 10,
        borderColor: "border-red-100",
        bg: "bg-red-50",
        iconColor: "text-red-600"
    },
    {
        name: "Australia",
        time: "5-7 Days",
        icon: Globe,
        position: { bottom: "10%", left: "5%" },
        rotate: 5,
        borderColor: "border-green-100",
        bg: "bg-green-50",
        iconColor: "text-green-600"
    },
    {
        name: "UAE",
        time: "3-5 Days",
        icon: Plane,
        position: { bottom: "20%", right: "0%" },
        rotate: -5,
        borderColor: "border-yellow-100",
        bg: "bg-yellow-50",
        iconColor: "text-yellow-600"
    }
];
