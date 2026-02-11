"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";
import { RotateCcw, Clock, ShieldCheck, CheckCircle, Package, AlertCircle, ArrowRight, HelpCircle } from "lucide-react";
import Link from "next/link";

export default function ReturnsPage() {
    const policies = [
        {
            icon: Clock,
            title: "7-Day Return Window",
            desc: "Initiate a return within 7 days of delivery for a full refund or replacement.",
            color: "from-blue-500 to-blue-600",
        },
        {
            icon: ShieldCheck,
            title: "Quality Guarantee",
            desc: "If the product doesn't meet our quality promise, we'll replace it at no extra cost.",
            color: "from-green-500 to-green-600",
        },
        {
            icon: RotateCcw,
            title: "Easy Process",
            desc: "Simple 3-step return process. No questions asked for damaged or incorrect items.",
            color: "from-amber-500 to-amber-600",
        },
    ];

    const steps = [
        { step: 1, title: "Raise a Request", desc: "Contact us via email or phone within 7 days of delivery with your order ID." },
        { step: 2, title: "Ship It Back", desc: "We'll arrange a free pickup or provide a prepaid shipping label." },
        { step: 3, title: "Get Refunded", desc: "Refund processed within 5-7 business days after we receive the return." },
    ];

    const nonReturnable = [
        "Opened or partially consumed food products (unless quality issue)",
        "Products damaged due to misuse or improper storage",
        "Items returned after the 7-day window",
        "Customized or gift-wrapped orders",
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
                    {/* Hero */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
                        <div className="inline-block mb-4">
                            <span className="bg-gradient-to-r from-[#DAA520] to-[#B8860B] text-white px-4 py-1.5 rounded-full text-sm font-bold tracking-wider">↩️ HASSLE-FREE</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold text-[#2C1810] mb-6 font-arista tracking-tight">Returns & Refunds</h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">Your satisfaction is our priority. We make returns and refunds simple and stress-free.</p>
                    </motion.div>

                    {/* Policy Features */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
                        {policies.map((item, idx) => {
                            const Icon = item.icon;
                            return (
                                <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} viewport={{ once: true }} className="group relative">
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

                    {/* How to Return */}
                    <div className="mb-24">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl md:text-5xl font-bold text-[#2C1810] mb-4 font-arista">How to Return</h2>
                            <p className="text-gray-600 text-lg">Just 3 simple steps to initiate your return</p>
                        </div>
                        <div className="relative">
                            <div className="hidden md:block absolute top-8 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#DAA520] to-transparent" />
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {steps.map((item, idx) => (
                                    <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.15 }} viewport={{ once: true }} className="flex flex-col items-center text-center">
                                        <div className="relative mb-6">
                                            <div className="absolute inset-0 bg-[#DAA520]/20 rounded-full blur-lg" />
                                            <div className="relative w-16 h-16 bg-gradient-to-br from-[#6F4E37] to-[#3D2817] rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                                                <span className="text-2xl font-bold text-white">{item.step}</span>
                                            </div>
                                        </div>
                                        <h3 className="text-lg font-bold text-[#2C1810] mb-2">{item.title}</h3>
                                        <p className="text-sm text-gray-600">{item.desc}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Non-Returnable Items */}
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto mb-24">
                        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 border border-red-200 shadow-lg">
                            <div className="flex items-center gap-3 mb-6">
                                <AlertCircle className="w-6 h-6 text-red-500" />
                                <h3 className="text-xl font-bold text-[#2C1810]">Non-Returnable Items</h3>
                            </div>
                            <ul className="space-y-3">
                                {nonReturnable.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-gray-600">
                                        <span className="text-red-400 mt-1">✕</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>

                    {/* CTA */}
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="bg-gradient-to-r from-[#DAA520]/20 to-[#B8860B]/20 backdrop-blur rounded-3xl p-12 border border-[#DAA520]/30 text-center">
                        <h2 className="text-4xl font-bold text-[#2C1810] mb-4 font-arista">Need to Return?</h2>
                        <p className="text-gray-700 mb-8 text-lg max-w-2xl mx-auto">Get in touch with our support team and we&apos;ll guide you through the process.</p>
                        <Link href="/contact" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#DAA520] to-[#B8860B] text-white px-12 py-4 rounded-full font-bold hover:shadow-2xl transition-all duration-300 hover:scale-105">
                            Contact Support <ArrowRight className="w-5 h-5" />
                        </Link>
                    </motion.div>
                </Container>
            </div>
        </main>
    );
}
