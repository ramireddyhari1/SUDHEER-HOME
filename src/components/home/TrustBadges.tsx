"use client";

import { Container } from "@/components/ui/Container";
import { Shield, Award, FlaskConical, Leaf, CheckCircle, X, ZoomIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import Image from "next/image";
import { useState } from "react";

export function TrustBadges() {
    const [selectedCert, setSelectedCert] = useState<number | null>(null);

    const certificates = [
        {
            name: "FSSAI License",
            number: "10012345678900",
            image: "/certificates/fssai_certificate_1768495171106.png",
            badge: Shield,
            color: "from-blue-500 to-blue-700"
        },
        {
            name: "Organic India",
            number: "NPOP/NAB/001",
            image: "/certificates/organic_certificate_1768495193202.png",
            badge: Leaf,
            color: "from-green-500 to-green-700"
        },
        {
            name: "ISO 22000",
            number: "ISO-2023-IN-4502",
            image: "/certificates/iso_certificate_1768495219968.png",
            badge: Award,
            color: "from-purple-500 to-purple-700"
        }
    ];

    const qualityPoints = [
        { icon: FlaskConical, text: "Lab Tested Every Batch", detail: "Third-party verified" },
        { icon: Shield, text: "100% Food Safe", detail: "Zero pesticides & chemicals" },
        { icon: CheckCircle, text: "Fully Traceable", detail: "Farm to table transparency" }
    ];

    return (
        <section className="py-6 md:py-16 lg:py-20 bg-[#F5F5DC] relative overflow-hidden">
            {/* Premium Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#DAA520]/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#6F4E37]/5 rounded-full blur-3xl" />
            </div>

            <Container className="relative z-10">
                {/* Header */}
                <ScrollReveal>
                    <div className="text-center mb-6 md:mb-14">
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#DAA520] to-[#B8860B] text-[#2C1810] px-3 py-1.5 md:px-5 md:py-2.5 rounded-full mb-3 md:mb-4 shadow-lg">
                            <Award className="w-4 h-4 md:w-5 md:h-5" />
                            <span className="text-[10px] md:text-sm font-bold uppercase tracking-wider">
                                Certified Quality
                            </span>
                        </div>
                        <h2 className="font-serif font-bold text-[#2C1810] mb-2 md:mb-4" style={{ fontSize: 'clamp(1.5rem, 5vw, 3rem)' }}>
                            Trust Built on Standards
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
                            Our commitment to quality is validated by India's most respected certification bodies
                        </p>
                    </div>
                </ScrollReveal>

                {/* Certificate Showcase - LARGER & MORE IMPRESSIVE */}
                <div className="grid grid-cols-3 gap-2 md:gap-8 mb-8 md:mb-16">
                    {certificates.map((cert, index) => (
                        <ScrollReveal key={index} delay={index * 0.15}>
                            <motion.div
                                whileHover={{ y: -12, scale: 1.03 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                onClick={() => setSelectedCert(index)}
                                className="group relative bg-white rounded-xl md:rounded-3xl p-2 md:p-8 shadow-xl hover:shadow-2xl transition-all border-2 border-gray-100 cursor-pointer overflow-hidden h-full flex flex-col"
                            >
                                {/* Gradient Glow on Hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-0 group-hover:opacity-5 transition-opacity`} />

                                {/* Gradient Top Border - THICKER */}
                                <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-gradient-to-r ${cert.color} rounded-b-full`} />

                                {/* Certificate Frame - MUCH LARGER */}
                                <div className="relative aspect-[3/4] mb-2 md:mb-6 rounded-lg md:rounded-2xl overflow-hidden bg-gray-50 border-2 md:border-4 border-gray-200 shadow-inner group-hover:border-gray-300 transition-all">
                                    <Image
                                        src={cert.image}
                                        alt={cert.name}
                                        fill
                                        className="object-contain p-2 md:p-3 group-hover:scale-105 transition-transform duration-500"
                                    />

                                    {/* Verified Badge - LARGER */}
                                    <div className="absolute top-1 right-1 md:top-3 md:right-3 bg-[#DAA520] text-[#2C1810] p-1 md:p-2 rounded-full shadow-lg">
                                        <CheckCircle className="w-3 h-3 md:w-5 md:h-5" />
                                    </div>

                                    {/* Zoom Overlay on Hover */}
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <div className="text-white text-center">
                                            <ZoomIn className="w-6 h-6 md:w-12 md:h-12 mx-auto mb-1 md:mb-2" />
                                            <p className="text-[8px] md:text-sm font-bold">View</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Certificate Info - ENHANCED */}
                                <h3 className="font-bold text-[9px] md:text-xl text-[#2C1810] mb-1 md:mb-2 text-center leading-tight">
                                    {cert.name}
                                </h3>
                                <p className="text-[8px] md:text-sm text-gray-500 text-center mb-1.5 md:mb-3 leading-none">
                                    Trusted
                                </p>
                                <div className="text-center mt-auto">
                                    <span className="inline-block text-[7px] md:text-xs font-mono bg-gray-100 px-1.5 py-0.5 md:px-3 md:py-1.5 rounded-full text-gray-600 truncate max-w-full">
                                        {cert.number}
                                    </span>
                                </div>
                            </motion.div>
                        </ScrollReveal>
                    ))}
                </div>

                {/* Quality Assurance Details */}
                <ScrollReveal delay={0.3}>
                    <div className="bg-gradient-to-br from-[#2C1810] to-[#1a0f0a] rounded-xl md:rounded-3xl p-3 md:p-10 lg:p-12 text-[#E8E4C9] relative overflow-hidden">
                        {/* Decorative Elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#DAA520]/10 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl" />

                        <div className="relative z-10">
                            <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-6">
                                <div className="w-8 h-8 md:w-14 md:h-14 bg-[#DAA520] rounded-full flex items-center justify-center shadow-lg">
                                    <FlaskConical className="w-4 h-4 md:w-7 md:h-7 text-[#2C1810]" />
                                </div>
                                <h3 className="font-bold text-lg md:text-3xl lg:text-4xl text-[#F5F5DC]">
                                    Rigorous Quality Testing
                                </h3>
                            </div>

                            <p className="text-[#E8E4C9]/90 leading-relaxed mb-3 md:mb-8 max-w-3xl text-xs md:text-lg">
                                Every product batch undergoes comprehensive laboratory testing for pesticides, heavy metals,
                                microbial contamination, and nutritional accuracy. Our facilities are regularly audited by
                                government authorities and third-party agencies to ensure compliance with international standards.
                            </p>

                            {/* Quality Points Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-6">
                                {qualityPoints.map((point, idx) => (
                                    <div key={idx} className="flex items-start gap-2 md:gap-4 bg-white/5 backdrop-blur-sm rounded-lg md:rounded-2xl p-2 md:p-5 border border-white/10 hover:bg-white/10 transition-colors">
                                        <div className="flex-shrink-0 w-6 h-6 md:w-12 md:h-12 bg-[#DAA520] rounded-md md:rounded-xl flex items-center justify-center shadow-md">
                                            <point.icon className="w-3 h-3 md:w-6 md:h-6 text-[#2C1810]" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-xs md:text-lg mb-0 md:mb-1">{point.text}</h4>
                                            <p className="text-[10px] md:text-sm text-white/70 leading-tight">{point.detail}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </ScrollReveal>

                {/* Trust Footer */}
                <ScrollReveal delay={0.4}>
                    <div className="mt-10 text-center">
                        <p className="text-[#6F4E37] text-base md:text-lg font-medium">
                            🏆 Trusted by <span className="font-bold text-[#B8860B] text-xl">1,000,000+</span> families across India
                        </p>
                    </div>
                </ScrollReveal>
            </Container>

            {/* Lightbox Modal for Full Certificate View */}
            <AnimatePresence>
                {selectedCert !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedCert(null)}
                        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 cursor-zoom-out"
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative max-w-4xl w-full bg-white rounded-3xl p-8 shadow-2xl cursor-default"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedCert(null)}
                                className="absolute top-4 right-4 w-10 h-10 bg-gray-900 hover:bg-gray-800 text-white rounded-full flex items-center justify-center transition-colors z-10"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            {/* Certificate Details */}
                            <div className="mb-6">
                                <h3 className="text-2xl font-bold text-[#2C1810] mb-2">
                                    {certificates[selectedCert].name}
                                </h3>
                                <p className="text-gray-600">
                                    Certificate Number: <span className="font-mono font-bold">{certificates[selectedCert].number}</span>
                                </p>
                            </div>

                            {/* Full Certificate Image */}
                            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-50 border-2 border-gray-200">
                                <Image
                                    src={certificates[selectedCert].image}
                                    alt={certificates[selectedCert].name}
                                    fill
                                    className="object-contain p-4"
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
