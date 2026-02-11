"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";
import { Search, Package, Truck, CheckCircle, Clock, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function TrackOrderPage() {
    const [orderId, setOrderId] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (orderId.trim()) setSubmitted(true);
    };

    const steps = [
        { icon: Package, label: "Order Confirmed", date: "Awaiting order ID", active: false },
        { icon: Truck, label: "Shipped", date: "", active: false },
        { icon: MapPin, label: "Out for Delivery", date: "", active: false },
        { icon: CheckCircle, label: "Delivered", date: "", active: false },
    ];

    return (
        <main className="min-h-screen relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FDFBF7] via-[#FBF9F4] to-[#F5F5DC]" />
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div animate={{ y: [0, -30, 0], x: [0, 15, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-40 -right-40 w-96 h-96 bg-[#DAA520]/15 rounded-full blur-3xl" />
                <motion.div animate={{ y: [0, 30, 0], x: [0, -15, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} className="absolute -bottom-32 -left-32 w-80 h-80 bg-[#6F4E37]/12 rounded-full blur-3xl" />
            </div>
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#DAA520] to-transparent opacity-30" />

            <div className="relative z-10 pt-24 pb-16">
                <Container>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
                        <div className="inline-block mb-4">
                            <span className="bg-gradient-to-r from-[#DAA520] to-[#B8860B] text-white px-4 py-1.5 rounded-full text-sm font-bold tracking-wider">📦 ORDER TRACKING</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold text-[#2C1810] mb-6 font-arista tracking-tight">Track Your Order</h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">Enter your order ID to see real-time updates on your shipment status.</p>
                    </motion.div>

                    {/* Search Box */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="max-w-2xl mx-auto mb-16">
                        <form onSubmit={handleSubmit} className="relative">
                            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 border border-[#DAA520]/20 shadow-xl">
                                <label htmlFor="order-id" className="block text-sm font-bold text-[#2C1810] mb-3 uppercase tracking-wider">Order ID or Phone Number</label>
                                <div className="flex gap-3">
                                    <input
                                        id="order-id"
                                        type="text"
                                        value={orderId}
                                        onChange={(e) => setOrderId(e.target.value)}
                                        placeholder="e.g. VO-2024-XXXXX"
                                        className="flex-1 px-5 py-4 rounded-xl border-2 border-[#DAA520]/20 bg-white focus:border-[#DAA520] focus:outline-none text-[#2C1810] font-medium transition-colors"
                                    />
                                    <button type="submit" className="bg-gradient-to-r from-[#DAA520] to-[#B8860B] text-white px-8 py-4 rounded-xl font-bold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2">
                                        <Search className="w-5 h-5" /> Track
                                    </button>
                                </div>
                            </div>
                        </form>
                    </motion.div>

                    {/* Tracking Steps Preview */}
                    {submitted && (
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto mb-16">
                            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 border border-[#DAA520]/20 shadow-lg">
                                <div className="text-center mb-8">
                                    <p className="text-sm text-gray-500 mb-1">Order ID</p>
                                    <p className="text-xl font-bold text-[#2C1810]">{orderId}</p>
                                    <p className="text-sm text-[#DAA520] font-medium mt-2">No matching order found. Please verify your order ID and try again.</p>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Info Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {[
                            { icon: Clock, title: "Real-time Updates", desc: "Get instant notifications on your order status at every stage." },
                            { icon: MapPin, title: "Live Location", desc: "See exactly where your package is on its journey to you." },
                            { icon: Package, title: "Order History", desc: "Access all your past orders and tracking information anytime." },
                        ].map((item, idx) => {
                            const Icon = item.icon;
                            return (
                                <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} viewport={{ once: true }} className="bg-white/60 backdrop-blur rounded-xl p-6 border border-[#DAA520]/20">
                                    <Icon className="w-8 h-8 text-[#6F4E37] mb-4" />
                                    <h3 className="font-bold text-[#2C1810] mb-2">{item.title}</h3>
                                    <p className="text-gray-600 text-sm">{item.desc}</p>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* CTA */}
                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-16">
                        <p className="text-gray-600 mb-4">Need help with your order?</p>
                        <Link href="/contact" className="inline-flex items-center gap-2 bg-[#2C1810] text-white px-8 py-3 rounded-full font-bold hover:bg-[#6F4E37] transition-colors">
                            Contact Support <ArrowRight className="w-4 h-4" />
                        </Link>
                    </motion.div>
                </Container>
            </div>
        </main>
    );
}
