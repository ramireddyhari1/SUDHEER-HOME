"use client";

import React, { useState, useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { Star, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
    {
        id: 1,
        name: "Lakshmi Narayana",
        location: "Hyderabad",
        rating: 5,
        text: "Review of Vaishnavi Organics: I recently purchased pickles from Vaishnavi Organics and I must say I am thoroughly impressed. The taste is authentic and reminds me of homemade pickles. The quality of ingredients used is evident and the packaging was excellent. I highly recommend their products to anyone looking for delicious and healthy pickle options.",
        role: "Verified Customer"
    },
    {
        id: 2,
        name: "Sita Reddy",
        location: "Bangalore",
        rating: 5,
        text: "Absolutely delighted with the ghee and powders. The aroma of the ghee takes me back to my grandmother's kitchen. It's rare to find such purity these days. Will definitely be a regular customer!",
        role: "Home Maker"
    },
    {
        id: 3,
        name: "Ravi Kumar",
        location: "Visakhapatnam",
        rating: 5,
        text: "The traditional sweets are just perfect. Not too sweet, just the right balance of flavors. You can taste the quality of the jaggery and ghee. Highly recommended for festivals!",
        role: "Foodie"
    }
];

export function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="py-8 md:py-20 bg-muted/30 overflow-hidden relative">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

            <Container>
                <div className="text-center mb-8 md:mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-primary font-bold tracking-widest uppercase text-xs md:text-sm mb-2 block"
                    >
                        Client Love
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="font-serif text-2xl md:text-5xl font-bold text-foreground"
                    >
                        What Our Families Say
                    </motion.h2>
                </div>

                <div className="relative max-w-4xl mx-auto min-h-[300px] md:min-h-[400px] flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 1.05, y: -20 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="w-full"
                        >
                            <div className="bg-white p-6 md:p-12 rounded-2xl shadow-xl border border-primary/10 relative">
                                <Quote className="absolute top-6 left-6 md:top-8 md:left-8 text-primary/20 w-10 h-10 md:w-16 md:h-16 -z-0" />

                                <div className="relative z-10 flex flex-col items-center text-center">
                                    <div className="flex gap-1 mb-4 md:mb-6">
                                        {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-accent text-accent" />
                                        ))}
                                    </div>

                                    <p className="text-base md:text-2xl font-serif text-gray-700 leading-relaxed mb-4 md:mb-8 italic">
                                        "{testimonials[currentIndex].text}"
                                    </p>

                                    <div className="flex flex-col items-center">
                                        <h4 className="text-lg md:text-xl font-bold text-foreground">{testimonials[currentIndex].name}</h4>
                                        <span className="text-xs md:text-sm text-muted-foreground">{testimonials[currentIndex].location} • {testimonials[currentIndex].role}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Dots */}
                    <div className="absolute -bottom-8 md:-bottom-12 left-1/2 -translate-x-1/2 flex gap-3">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex ? "w-8 bg-primary" : "w-2 bg-primary/20 hover:bg-primary/40"
                                    }`}
                                aria-label={`Go to testimonial ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
}
