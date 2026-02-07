"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";
import { Plane, Truck, PackageCheck, Globe, Clock, ShieldCheck, CheckCircle, MapPin, AlertCircle, Zap, Award, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function ShippingPage() {
    const [rates, setRates] = React.useState([
        { region: "USA & Canada", price: "₹2500", time: "3-5 Days", color: "bg-gradient-to-br from-blue-50 to-blue-100", icon: "🇺🇸" },
        { region: "UK & Europe", price: "₹2200", time: "3-5 Days", color: "bg-gradient-to-br from-purple-50 to-purple-100", icon: "🇬🇧" },
        { region: "Australia / NZ", price: "₹2800", time: "5-7 Days", color: "bg-gradient-to-br from-green-50 to-green-100", icon: "🇦🇺" },
        { region: "UAE / Gulf", price: "₹1800", time: "3-4 Days", color: "bg-gradient-to-br from-amber-50 to-amber-100", icon: "🇦🇪" },
    ]);

    React.useEffect(() => {
        fetch("/api/content?section=shipping-rates")
            .then(res => res.json())
            .then(json => {
                if (json.success && json.content && json.content.rates) {
                    setRates(json.content.rates);
                }
            })
            .catch(err => console.error("Failed to load rates", err));
    }, []);

    const features = [
        {
            icon: Globe,
            title: "Global Reach",
            desc: "From local farms to 50+ countries. We bridge the gap between home and the world.",
            delay: 0.2,
            color: "from-blue-500 to-blue-600"
        },
        {
            icon: ShieldCheck,
            title: "Secure Handling",
            desc: "Leak-proof, vacuum-sealed packaging that survives international transit intact.",
            delay: 0.3,
            color: "from-green-500 to-green-600"
        },
        {
            icon: Zap,
            title: "Express Logistics",
            desc: "Partnered with DHL & FedEx effectively for the fastest routing to your doorstep.",
            delay: 0.4,
            color: "from-amber-500 to-amber-600"
        }
    ];

    const process = [
        { step: 1, title: "Order Placed", desc: "Confirmation sent to your email", icon: PackageCheck },
        { step: 2, title: "Packaging", desc: "Premium vacuum-sealed packing", icon: Truck },
        { step: 3, title: "Dispatch", desc: "Handed to courier partner", icon: Plane },
        { step: 4, title: "Delivered", desc: "Safe arrival at your doorstep", icon: CheckCircle },
    ];

    return (
        <main className="min-h-screen relative overflow-hidden">
            {/* Master Background Layer 1: Base Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#FDFBF7] via-[#FBF9F4] to-[#F5F5DC]" />

            {/* Master Background Layer 2: Animated Gradient Orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Top Right - Gold Orb */}
                <motion.div
                    animate={{ y: [0, -30, 0], x: [0, 15, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-40 -right-40 w-96 h-96 bg-[#DAA520]/15 rounded-full blur-3xl"
                />
                {/* Bottom Left - Brown Orb */}
                <motion.div
                    animate={{ y: [0, 30, 0], x: [0, -15, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -bottom-32 -left-32 w-80 h-80 bg-[#6F4E37]/12 rounded-full blur-3xl"
                />
                {/* Center - Subtle Accent */}
                <motion.div
                    animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/2 right-1/3 w-72 h-72 bg-[#B8860B]/8 rounded-full blur-3xl"
                />
            </div>

            {/* Master Background Layer 3: Floating Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[0, 1, 2, 3, 4].map((i) => (
                    <motion.div
                        key={i}
                        animate={{
                            y: [0, -100, -200, -300],
                            x: [0, 50 * (i % 2 ? 1 : -1), 100 * (i % 2 ? 1 : -1), 0],
                            opacity: [0, 0.5, 0.5, 0]
                        }}
                        transition={{
                            duration: 15 + i * 2,
                            repeat: Infinity,
                            ease: "linear",
                            delay: i * 2
                        }}
                        className={`absolute w-1 h-1 rounded-full ${i % 3 === 0 ? 'bg-[#DAA520]/40' :
                            i % 3 === 1 ? 'bg-[#B8860B]/40' :
                                'bg-[#6F4E37]/40'
                            }`}
                        style={{
                            left: `${25 + i * 15}%`,
                            top: `${10 + i * 20}%`
                        }}
                    />
                ))}
            </div>

            {/* Master Background Layer 4: Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
                backgroundImage: `
                    linear-gradient(0deg, #6F4E37 1px, transparent 1px),
                    linear-gradient(90deg, #6F4E37 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px'
            }} />

            {/* Master Background Layer 5: Top Accent Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#DAA520] to-transparent opacity-30" />

            {/* Master Background Layer 6: Vignette Effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-black/5 pointer-events-none" />

            {/* Content - Relative Positioning */}
            <div className="relative z-10 pt-24 pb-16">

                {/* Hero Section */}
                <Container className="relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <div className="inline-block mb-4">
                            <span className="bg-gradient-to-r from-[#DAA520] to-[#B8860B] text-white px-4 py-1.5 rounded-full text-sm font-bold tracking-wider">🌍 GLOBAL SHIPPING</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold text-[#2C1810] mb-6 font-arista tracking-tight">
                            Ship Anywhere,<br />Anytime
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            Premium organic foods from Andhra Pradesh delivered safely to your doorstep, anywhere in the world. Fast, secure, and reliable.
                        </p>
                    </motion.div>
                </Container>

                {/* Features Grid */}
                <Container className="relative z-10 mb-24">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {features.map((item, idx) => {
                            const Icon = item.icon;
                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: item.delay }}
                                    viewport={{ once: true }}
                                    className="group relative"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#DAA520]/10 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <div className="relative bg-white/80 backdrop-blur-lg rounded-2xl p-8 border border-[#DAA520]/20 hover:border-[#DAA520]/40 transition-all duration-300 shadow-sm hover:shadow-xl">
                                        <div className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                            <Icon className="w-7 h-7 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-[#2C1810] mb-3 font-arista">{item.title}</h3>
                                        <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </Container>

                {/* Process Timeline */}
                <Container className="relative z-10 mb-24">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold text-[#2C1810] mb-4 font-arista">How It Works</h2>
                        <p className="text-gray-600 text-lg">From order to delivery in just a few simple steps</p>
                    </div>

                    <div className="relative">
                        {/* Connecting Line */}
                        <div className="hidden md:block absolute top-8 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#DAA520] to-transparent" />

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {process.map((item, idx) => {
                                const Icon = item.icon;
                                return (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        viewport={{ once: true }}
                                        className="relative"
                                    >
                                        <div className="flex flex-col items-center">
                                            <div className="relative mb-6">
                                                <div className="absolute inset-0 bg-[#DAA520]/20 rounded-full blur-lg" />
                                                <div className="relative w-16 h-16 bg-gradient-to-br from-[#6F4E37] to-[#3D2817] rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                                                    <Icon className="w-8 h-8 text-white" />
                                                </div>
                                                <span className="absolute top-0 right-0 w-6 h-6 bg-white text-[#6F4E37] rounded-full flex items-center justify-center text-sm font-bold shadow-lg">{idx + 1}</span>
                                            </div>
                                            <h3 className="text-lg font-bold text-[#2C1810] mb-2 text-center">{item.title}</h3>
                                            <p className="text-sm text-gray-600 text-center">{item.desc}</p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </Container>

                {/* Shipping Rates Section */}
                <Container className="relative z-10 mb-24">
                    <div className="text-center mb-14">
                        <h2 className="text-4xl md:text-5xl font-bold text-[#2C1810] mb-4 font-arista">International Shipping Rates</h2>
                        <p className="text-gray-600 text-lg">Transparent pricing for premium courier services worldwide</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {rates.map((ticket, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="group relative h-full"
                            >
                                <div className={`relative ${ticket.color} border-2 border-white rounded-2xl p-8 flex flex-col items-center justify-between min-h-[280px] shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden`}>
                                    {/* Background Pattern */}
                                    <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] bg-repeat" />

                                    {/* Ticket Perforations */}
                                    <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#FDFBF7] rounded-full shadow-md" />
                                    <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#FDFBF7] rounded-full shadow-md" />

                                    <div className="text-center relative z-10">
                                        <div className="text-5xl mb-4">{ticket.icon}</div>
                                        <span className="text-xs uppercase tracking-widest font-bold text-gray-700 mb-3 block">Destination</span>
                                        <h3 className="text-xl font-bold text-gray-900">{ticket.region}</h3>
                                    </div>

                                    <div className="w-4/5 border-t-2 border-dashed border-gray-400 my-6 relative z-10" />

                                    <div className="text-center relative z-10">
                                        <div className="text-4xl font-bold text-[#6F4E37] mb-3">{ticket.price}</div>
                                        <div className="flex items-center justify-center gap-2 text-sm font-bold text-gray-700 bg-white/70 px-4 py-2 rounded-full inline-block shadow-sm">
                                            <Clock className="w-4 h-4" /> Est. {ticket.time}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Domestic Shipping Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                        className="group relative overflow-hidden rounded-3xl shadow-2xl"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-[#6F4E37] via-[#8B5A3C] to-[#4A361B]" />
                        <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] bg-repeat" />

                        <div className="relative z-10 p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="flex-1">
                                <div className="inline-block mb-4">
                                    <span className="bg-[#DAA520] text-[#2C1810] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">🇮🇳 Domestic</span>
                                </div>
                                <h3 className="text-3xl md:text-4xl font-bold text-white mb-3 font-arista">India Shipping</h3>
                                <p className="text-white/90 text-lg leading-relaxed max-w-lg">
                                    Lightning-fast delivery across all Indian states via premium partners like Bluedart and Delhivery. Standard charges apply for orders below ₹499.
                                </p>
                            </div>
                            <div className="text-center md:text-right flex-shrink-0">
                                <div className="text-6xl font-black text-[#DAA520] mb-2">FREE*</div>
                                <span className="text-white/80 text-sm block mb-4">Orders above ₹499</span>
                                <button className="bg-[#DAA520] text-[#2C1810] px-8 py-3 rounded-full font-bold hover:bg-white transition-colors shadow-lg">
                                    Track Order
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </Container>

                {/* Info Section */}
                <Container className="relative z-10 mb-24">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: Award, title: "Trusted Couriers", desc: "Partnered with globally recognized courier services" },
                            { icon: Users, title: "24/7 Support", desc: "Round-the-clock customer support for tracking & queries" },
                            { icon: CheckCircle, title: "Delivery Guarantee", desc: "Compensation guarantee if package is damaged" }
                        ].map((item, idx) => {
                            const Icon = item.icon;
                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    viewport={{ once: true }}
                                    className="flex gap-4 items-start p-6 bg-white/60 backdrop-blur rounded-xl border border-[#DAA520]/20"
                                >
                                    <Icon className="w-8 h-8 text-[#6F4E37] flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-bold text-[#2C1810] mb-2">{item.title}</h4>
                                        <p className="text-gray-600 text-sm">{item.desc}</p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </Container>

                {/* CTA Section */}
                <Container className="relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-r from-[#DAA520]/20 to-[#B8860B]/20 backdrop-blur rounded-3xl p-12 border border-[#DAA520]/30"
                    >
                        <h2 className="text-4xl font-bold text-[#2C1810] mb-4 font-arista">Ready to Order?</h2>
                        <p className="text-gray-700 mb-8 text-lg max-w-2xl mx-auto">Experience the premium taste of Vaishnavi Organics delivered to your location</p>
                        <Link href="/products">
                            <Button size="lg" className="bg-gradient-to-r from-[#DAA520] to-[#B8860B] text-white hover:shadow-2xl font-bold px-12 h-14 rounded-full shadow-lg transition-all duration-300 hover:scale-105">
                                Shop Now →
                            </Button>
                        </Link>
                    </motion.div>
                </Container>
            </div>
        </main>
    );
}
