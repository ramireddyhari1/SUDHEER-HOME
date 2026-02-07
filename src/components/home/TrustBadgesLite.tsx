import { Container } from "@/components/ui/Container";
import { Award, FlaskConical, Leaf, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function TrustBadges() {
    return (
        <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50">
            <Container>
                <ScrollReveal>
                    <div className="text-center mb-10">
                        <h2 className="font-serif font-bold text-[#2C1810] mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
                            Trust Built on Standards
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Our commitment to quality is validated by India's most respected certification bodies
                        </p>
                    </div>
                </ScrollReveal>

                {/* Quality Points */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    {[
                        { icon: FlaskConical, text: "Lab Tested Every Batch", detail: "Third-party verified" },
                        { icon: Leaf, text: "100% Organic Certified", detail: "FSSAI & NPOP approved" },
                        { icon: CheckCircle, text: "Fully Traceable", detail: "Farm to table transparency" }
                    ].map((point, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ y: -5 }}
                            className="flex items-start gap-4 bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                        >
                            <div className="flex-shrink-0 w-12 h-12 bg-[#155E42] rounded-xl flex items-center justify-center">
                                <point.icon className="w-6 h-6 text-[#FACC15]" />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg mb-1">{point.text}</h4>
                                <p className="text-sm text-gray-600">{point.detail}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Trust Footer */}
                <div className="mt-10 text-center">
                    <p className="text-gray-600 text-base md:text-lg font-medium">
                        🏆 Trusted by <span className="font-bold text-[#155E42] text-xl">1,000,000+</span> families across India
                    </p>
                </div>
            </Container>
        </section>
    );
}
