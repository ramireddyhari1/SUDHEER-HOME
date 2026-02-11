"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";
import { FileText, ShoppingCart, CreditCard, Truck, AlertTriangle, Scale, Globe, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function TermsOfServicePage() {
    const sections = [
        {
            icon: ShoppingCart,
            title: "1. Orders & Purchases",
            content: [
                "All orders placed on our website are subject to product availability.",
                "We reserve the right to refuse or cancel any order due to pricing errors or stock issues.",
                "Order confirmation emails are sent after successful placement, not a guarantee of dispatch.",
                "Minimum order values may apply for certain promotions or free shipping offers.",
            ],
        },
        {
            icon: CreditCard,
            title: "2. Pricing & Payments",
            content: [
                "All prices are listed in Indian Rupees (₹) and are inclusive of applicable taxes.",
                "We accept UPI, credit/debit cards, net banking, and select wallets.",
                "Prices are subject to change without prior notice.",
                "Payment must be completed before order dispatch. COD available on select orders.",
            ],
        },
        {
            icon: Truck,
            title: "3. Shipping & Delivery",
            content: [
                "Estimated delivery times are indicative and not guaranteed.",
                "We are not responsible for delays caused by courier partners or natural calamities.",
                "Risk of loss passes to you upon delivery to the carrier.",
                "Please inspect packages upon delivery and report any damage immediately.",
            ],
        },
        {
            icon: AlertTriangle,
            title: "4. Product Information",
            content: [
                "We strive to display product images and descriptions as accurately as possible.",
                "Minor variations in color, texture, or packaging may occur due to natural ingredients.",
                "Nutritional information and shelf life are provided on product labels.",
                "Allergen information is listed where applicable — please read labels carefully.",
            ],
        },
        {
            icon: Scale,
            title: "5. Limitation of Liability",
            content: [
                "Vaishnavi Organics shall not be liable for any indirect or consequential damages.",
                "Our total liability is limited to the amount paid for the specific order in question.",
                "We are not liable for issues arising from improper storage after delivery.",
                "Force majeure events (natural disasters, pandemics) may impact service delivery.",
            ],
        },
        {
            icon: Globe,
            title: "6. Intellectual Property",
            content: [
                "All content on this website is the property of Vaishnavi Organics.",
                "Unauthorized reproduction or distribution of content is prohibited.",
                "Our brand name, logo, and product images are protected trademarks.",
                "User-submitted reviews and content grant us a non-exclusive usage license.",
            ],
        },
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
                            <span className="bg-gradient-to-r from-[#DAA520] to-[#B8860B] text-white px-4 py-1.5 rounded-full text-sm font-bold tracking-wider">📜 LEGAL</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold text-[#2C1810] mb-6 font-arista tracking-tight">Terms of Service</h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">Please read these terms carefully before using our website or placing an order with Vaishnavi Organics.</p>
                        <p className="text-sm text-gray-400 mt-4">Effective: February 2026</p>
                    </motion.div>

                    {/* Terms Sections */}
                    <div className="max-w-4xl mx-auto space-y-8 mb-16">
                        {sections.map((section, idx) => {
                            const Icon = section.icon;
                            return (
                                <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }} viewport={{ once: true }} className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 border border-[#DAA520]/20 shadow-sm hover:shadow-lg transition-shadow duration-300">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 bg-gradient-to-br from-[#6F4E37] to-[#3D2817] rounded-xl flex items-center justify-center shadow-lg">
                                            <Icon className="w-6 h-6 text-white" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-[#2C1810] font-arista">{section.title}</h2>
                                    </div>
                                    <ul className="space-y-3 ml-2">
                                        {section.content.map((item, i) => (
                                            <li key={i} className="flex items-start gap-3 text-gray-600">
                                                <span className="text-[#DAA520] mt-1 text-lg">•</span>
                                                <span className="leading-relaxed">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Agreement Note */}
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto mb-16">
                        <div className="bg-[#2C1810] text-white rounded-2xl p-8 shadow-xl">
                            <div className="flex items-start gap-4">
                                <FileText className="w-8 h-8 text-[#DAA520] flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="text-xl font-bold mb-3 text-[#DAA520]">Agreement</h3>
                                    <p className="text-white/80 leading-relaxed">By using our website and placing an order, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. We reserve the right to update these terms at any time, and changes will be effective upon posting on this page.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* CTA */}
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="bg-gradient-to-r from-[#DAA520]/20 to-[#B8860B]/20 backdrop-blur rounded-3xl p-12 border border-[#DAA520]/30 text-center">
                        <h2 className="text-3xl font-bold text-[#2C1810] mb-4 font-arista">Have Questions?</h2>
                        <p className="text-gray-700 mb-8 text-lg max-w-2xl mx-auto">If anything is unclear, our team is happy to help explain our policies.</p>
                        <Link href="/contact" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#DAA520] to-[#B8860B] text-white px-12 py-4 rounded-full font-bold hover:shadow-2xl transition-all duration-300 hover:scale-105">
                            Contact Us <ArrowRight className="w-5 h-5" />
                        </Link>
                    </motion.div>
                </Container>
            </div>
        </main>
    );
}
