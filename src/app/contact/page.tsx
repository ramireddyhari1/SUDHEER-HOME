"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Instagram, Facebook, Twitter } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
    const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    const contactInfo = [
        { icon: Mail, label: "Email", value: "hello@vaishnaviorganics.com", href: "mailto:hello@vaishnaviorganics.com" },
        { icon: Phone, label: "Phone", value: "+91 1234 567 890", href: "tel:+911234567890" },
        { icon: MapPin, label: "Address", value: "123 Green Farm Road,\nKumbakonam, Tamil Nadu 612001", href: "#" },
        { icon: Clock, label: "Working Hours", value: "Mon – Sat: 9 AM – 7 PM IST", href: "#" },
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
                            <span className="bg-gradient-to-r from-[#DAA520] to-[#B8860B] text-white px-4 py-1.5 rounded-full text-sm font-bold tracking-wider">💬 GET IN TOUCH</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold text-[#2C1810] mb-6 font-arista tracking-tight">Contact Us</h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">Have questions, feedback, or need help with an order? We&apos;re here for you.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-16">
                        {/* Contact Info Cards */}
                        <div className="lg:col-span-2 space-y-4">
                            {contactInfo.map((item, idx) => {
                                const Icon = item.icon;
                                return (
                                    <motion.a key={idx} href={item.href} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }} viewport={{ once: true }} className="flex items-start gap-4 p-5 bg-white/80 backdrop-blur-lg rounded-xl border border-[#DAA520]/20 hover:border-[#DAA520]/40 hover:shadow-lg transition-all duration-300 block">
                                        <div className="w-12 h-12 bg-gradient-to-br from-[#6F4E37] to-[#3D2817] rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                                            <Icon className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-[#B8860B] uppercase tracking-wider mb-1">{item.label}</p>
                                            <p className="text-[#2C1810] font-medium whitespace-pre-line">{item.value}</p>
                                        </div>
                                    </motion.a>
                                );
                            })}

                            {/* Social Links */}
                            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} viewport={{ once: true }} className="p-5 bg-white/80 backdrop-blur-lg rounded-xl border border-[#DAA520]/20">
                                <p className="text-xs font-bold text-[#B8860B] uppercase tracking-wider mb-3">Follow Us</p>
                                <div className="flex gap-3">
                                    {[
                                        { icon: Instagram, href: "#" },
                                        { icon: Facebook, href: "#" },
                                        { icon: Twitter, href: "#" },
                                    ].map((social, idx) => {
                                        const SIcon = social.icon;
                                        return (
                                            <Link key={idx} href={social.href} className="w-10 h-10 bg-[#6F4E37]/10 rounded-full flex items-center justify-center hover:bg-[#DAA520] hover:text-white text-[#6F4E37] transition-all duration-300">
                                                <SIcon className="w-5 h-5" />
                                            </Link>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        </div>

                        {/* Contact Form */}
                        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} viewport={{ once: true }} className="lg:col-span-3">
                            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 border border-[#DAA520]/20 shadow-xl">
                                <div className="flex items-center gap-3 mb-6">
                                    <MessageSquare className="w-6 h-6 text-[#6F4E37]" />
                                    <h2 className="text-2xl font-bold text-[#2C1810] font-arista">Send a Message</h2>
                                </div>

                                {submitted ? (
                                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Send className="w-8 h-8 text-green-600" />
                                        </div>
                                        <h3 className="text-xl font-bold text-[#2C1810] mb-2">Message Sent!</h3>
                                        <p className="text-gray-600">Thank you for reaching out. We&apos;ll get back to you within 24 hours.</p>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <div>
                                                <label htmlFor="name" className="block text-sm font-bold text-[#2C1810] mb-1.5">Full Name</label>
                                                <input id="name" name="name" type="text" value={form.name} onChange={handleChange} required placeholder="Your name" className="w-full px-4 py-3 rounded-xl border-2 border-[#DAA520]/20 bg-white focus:border-[#DAA520] focus:outline-none text-[#2C1810] transition-colors" />
                                            </div>
                                            <div>
                                                <label htmlFor="email" className="block text-sm font-bold text-[#2C1810] mb-1.5">Email</label>
                                                <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required placeholder="your@email.com" className="w-full px-4 py-3 rounded-xl border-2 border-[#DAA520]/20 bg-white focus:border-[#DAA520] focus:outline-none text-[#2C1810] transition-colors" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <div>
                                                <label htmlFor="phone" className="block text-sm font-bold text-[#2C1810] mb-1.5">Phone (optional)</label>
                                                <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" className="w-full px-4 py-3 rounded-xl border-2 border-[#DAA520]/20 bg-white focus:border-[#DAA520] focus:outline-none text-[#2C1810] transition-colors" />
                                            </div>
                                            <div>
                                                <label htmlFor="subject" className="block text-sm font-bold text-[#2C1810] mb-1.5">Subject</label>
                                                <select id="subject" name="subject" value={form.subject} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border-2 border-[#DAA520]/20 bg-white focus:border-[#DAA520] focus:outline-none text-[#2C1810] transition-colors" aria-label="Subject">
                                                    <option value="">Select a topic</option>
                                                    <option value="order">Order Inquiry</option>
                                                    <option value="return">Return / Refund</option>
                                                    <option value="shipping">Shipping Question</option>
                                                    <option value="product">Product Information</option>
                                                    <option value="feedback">Feedback</option>
                                                    <option value="other">Other</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="message" className="block text-sm font-bold text-[#2C1810] mb-1.5">Message</label>
                                            <textarea id="message" name="message" value={form.message} onChange={handleChange} required rows={5} placeholder="Tell us how we can help..." className="w-full px-4 py-3 rounded-xl border-2 border-[#DAA520]/20 bg-white focus:border-[#DAA520] focus:outline-none text-[#2C1810] transition-colors resize-none" />
                                        </div>
                                        <button type="submit" className="w-full bg-gradient-to-r from-[#DAA520] to-[#B8860B] text-white py-4 rounded-xl font-bold hover:shadow-lg transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 text-lg">
                                            <Send className="w-5 h-5" /> Send Message
                                        </button>
                                    </form>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </Container>
            </div>
        </main>
    );
}
