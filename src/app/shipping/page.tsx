"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";
import { Plane, Truck, PackageCheck, Globe, Clock, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { GlobalShipping } from "@/components/home/GlobalShipping";

export default function ShippingPage() {
    const [rates, setRates] = React.useState([
        { region: "USA & Canada", price: "₹2500", time: "3-5 Days", color: "bg-blue-50 border-blue-200" },
        { region: "UK & Europe", price: "₹2200", time: "3-5 Days", color: "bg-purple-50 border-purple-200" },
        { region: "Australia / NZ", price: "₹2800", time: "5-7 Days", color: "bg-green-50 border-green-200" },
        { region: "UAE / Gulf", price: "₹1800", time: "3-4 Days", color: "bg-orange-50 border-orange-200" },
    ]);

    React.useEffect(() => {
        fetch("/api/site-content?sectionId=shipping-rates")
            .then(res => res.json())
            .then(json => {
                if (json.success && json.data && json.data.rates) {
                    setRates(json.data.rates);
                }
            })
            .catch(err => console.error("Failed to load rates", err));
    }, []);

    return (
        <main className="min-h-screen bg-gradient-to-b from-[#FDFBF7] to-[#F5F5F0] pt-24 pb-16 relative overflow-hidden">
            {/* Pattern Overlay */}
            <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat" />
            <GlobalShipping />

            <Container className="mt-16 relative z-10">
                {/* Info Grid - Glassmorphic */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                    {[
                        {
                            icon: Globe,
                            title: "Global Reach",
                            desc: "From local farms to 50+ countries. We bridge the gap between home and the world.",
                            delay: 0.3
                        },
                        {
                            icon: ShieldCheck,
                            title: "Secure Handling",
                            desc: "Leak-proof, vacuum-sealed packaging that survives international transit intact.",
                            delay: 0.4
                        },
                        {
                            icon: Clock,
                            title: "Express Logistics",
                            desc: "Partnered with DHL & FedEx effectively for the fastest routing to your doorstep.",
                            delay: 0.5
                        }
                    ].map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: item.delay }}
                            className="relative overflow-hidden bg-white/40 backdrop-blur-xl p-8 rounded-3xl border border-white/60 shadow-xl hover:shadow-2xl transition-all group"
                        >
                            {/* Gold Gradient Border Effect on Hover */}
                            <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#FACC15]/50 rounded-3xl transition-colors duration-500 pointer-events-none" />

                            <div className="w-16 h-16 bg-gradient-to-br from-[#155E42] to-[#1E4D3A] rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                <item.icon className="w-8 h-8 text-[#FACC15]" />
                            </div>
                            <h3 className="text-2xl font-serif font-bold mb-3 text-[#2C1810]" style={{ fontFamily: 'var(--font-serif)' }}>{item.title}</h3>
                            <p className="text-gray-700 leading-relaxed font-medium">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Premium Shipping Tickets Section */}
                <div className="mb-24">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-serif font-bold text-[#2C1810] mb-4">Transparent Shipping Rates</h2>
                        <p className="text-gray-500">Competitive pricing for premium courier services.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Region Tickets */}
                        {rates.map((ticket: any, i: number) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className={`relative ${ticket.color} border-2 rounded-2xl p-6 flex flex-col items-center justify-between min-h-[220px] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group`}
                            >
                                {/* Ticket Punch Circles */}
                                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#FDFBF7] rounded-full" />
                                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#FDFBF7] rounded-full" />

                                <div className="text-center">
                                    <span className="text-xs uppercase tracking-widest font-bold text-gray-500 mb-2 block">Destination</span>
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">{ticket.region}</h3>
                                </div>

                                <div className="w-full border-t-2 border-dashed border-gray-300/50 my-4 px-4" />

                                <div className="text-center">
                                    <div className="text-3xl font-bold text-[#155E42] mb-1">{ticket.price}</div>
                                    <div className="text-xs font-medium text-gray-600 bg-white/50 px-3 py-1 rounded-full inline-block">
                                        Est. {ticket.time}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Domestic Shipping Special Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="mt-8 bg-gradient-to-r from-[#155E42] to-[#0D402B] rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between text-white shadow-2xl relative overflow-hidden"
                    >
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat" />

                        <div className="flex items-center gap-6 relative z-10">
                            <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center flex-shrink-0">
                                <Truck className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-[#FACC15] mb-1">Domestic Shipping (India)</h3>
                                <p className="text-white/80">Fast delivery across all states via Bluedart / Delhivery.</p>
                            </div>
                        </div>
                        <div className="mt-6 md:mt-0 relative z-10 text-right">
                            <div className="text-4xl font-bold text-white mb-1">FREE</div>
                            <span className="text-xs uppercase tracking-wider bg-[#FACC15] text-[#155E42] px-2 py-1 rounded font-bold">Limited Time</span>
                        </div>
                    </motion.div>
                </div>

                <div className="text-center mt-12">
                    <Link href="/products">
                        <Button size="lg" className="bg-[#FACC15] text-[#2C1810] hover:bg-[#EAB308] font-bold px-10 h-14 rounded-full shadow-lg">
                            Continue Shopping
                        </Button>
                    </Link>
                </div>

            </Container>
        </main>
    );
}
