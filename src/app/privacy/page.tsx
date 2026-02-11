"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";
import { Shield, Eye, Lock, Server, UserCheck, Bell, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicyPage() {
    const sections = [
        {
            icon: Eye,
            title: "Information We Collect",
            content: [
                "Personal details (name, email, phone) provided during registration or checkout.",
                "Shipping address and billing information for order fulfillment.",
                "Browsing behavior and preferences to improve your shopping experience.",
                "Device and browser information for website optimization.",
            ],
        },
        {
            icon: Lock,
            title: "How We Use Your Data",
            content: [
                "Process and fulfill your orders, including shipping and delivery.",
                "Send order confirmations, shipping updates, and delivery notifications.",
                "Improve our products, services, and customer experience.",
                "Send promotional offers and newsletters (with your consent).",
            ],
        },
        {
            icon: Shield,
            title: "Data Protection",
            content: [
                "All payment information is encrypted using industry-standard SSL/TLS technology.",
                "We never store your full credit/debit card details on our servers.",
                "Access to personal data is restricted to authorized personnel only.",
                "Regular security audits to ensure your data remains safe.",
            ],
        },
        {
            icon: Server,
            title: "Data Storage & Retention",
            content: [
                "Your data is stored on secure, encrypted servers.",
                "Order data is retained for 5 years for legal and accounting purposes.",
                "Account data is kept until you request deletion.",
                "You can request a copy of all your personal data at any time.",
            ],
        },
        {
            icon: UserCheck,
            title: "Your Rights",
            content: [
                "Access and download your personal data at any time.",
                "Request correction of inaccurate personal information.",
                "Request deletion of your account and associated data.",
                "Opt out of marketing communications at any time.",
                "Withdraw consent for data processing.",
            ],
        },
        {
            icon: Bell,
            title: "Cookies & Tracking",
            content: [
                "We use essential cookies to ensure the website functions properly.",
                "Analytics cookies help us understand how visitors use our site.",
                "You can control cookies through your browser settings.",
                "Third-party cookies are used for payment processing and analytics only.",
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
                            <span className="bg-gradient-to-r from-[#DAA520] to-[#B8860B] text-white px-4 py-1.5 rounded-full text-sm font-bold tracking-wider">🔒 YOUR PRIVACY</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold text-[#2C1810] mb-6 font-arista tracking-tight">Privacy Policy</h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">We respect your privacy and are committed to protecting your personal data. Here&apos;s how we handle your information.</p>
                        <p className="text-sm text-gray-400 mt-4">Last updated: February 2026</p>
                    </motion.div>

                    {/* Policy Sections */}
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

                    {/* Contact CTA */}
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="bg-gradient-to-r from-[#DAA520]/20 to-[#B8860B]/20 backdrop-blur rounded-3xl p-12 border border-[#DAA520]/30 text-center max-w-3xl mx-auto">
                        <Mail className="w-10 h-10 text-[#6F4E37] mx-auto mb-4" />
                        <h2 className="text-3xl font-bold text-[#2C1810] mb-4 font-arista">Questions About Privacy?</h2>
                        <p className="text-gray-700 mb-8 text-lg">If you have any questions about our privacy practices, don&apos;t hesitate to reach out.</p>
                        <Link href="/contact" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#DAA520] to-[#B8860B] text-white px-12 py-4 rounded-full font-bold hover:shadow-2xl transition-all duration-300 hover:scale-105">
                            Contact Us <ArrowRight className="w-5 h-5" />
                        </Link>
                    </motion.div>
                </Container>
            </div>
        </main>
    );
}
