"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

export function Footer() {
    const [content, setContent] = useState({
        footer_address: "123 Green Farm Road,\nKumbakonam, Tamil Nadu 612001",
        footer_email: "hello@vaishnaviorganics.com",
        footer_phone: "+91 1234 567 890",
        footer_copyright: "Vaishnavi Organics"
    });

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const res = await fetch('/api/content?section=footer');
                const data = await res.json();
                if (data.success && data.content) {
                    setContent(prev => ({ ...prev, ...data.content })); // Merge with defaults
                }
            } catch (error) {
                console.error("Failed to fetch footer content");
            }
        };
        fetchContent();
    }, []);

    return (
        <footer className="bg-[#1a1a1a] text-white pt-16 pb-8 border-t-4 border-primary">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

                    {/* Brand & Social */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <span className="font-serif text-2xl font-bold text-primary">Vaishnavi Organics</span>
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Authentic. Traditional. Pure.<br />
                            Reviving the lost glory of Indian food wisdom, one product at a time.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="bg-gray-800 p-2 rounded-full hover:bg-primary transition-colors">
                                <Instagram className="h-4 w-4" />
                            </Link>
                            <Link href="#" className="bg-gray-800 p-2 rounded-full hover:bg-primary transition-colors">
                                <Facebook className="h-4 w-4" />
                            </Link>
                            <Link href="#" className="bg-gray-800 p-2 rounded-full hover:bg-primary transition-colors">
                                <Twitter className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Shop */}
                    <div>
                        <h3 className="font-serif font-bold text-lg mb-6 text-primary">Shop</h3>
                        <ul className="space-y-3 text-sm text-gray-300">
                            <li><Link href="/products?category=jaggery" className="hover:text-primary transition-colors">Organic Jaggery</Link></li>
                            <li><Link href="/products?category=rice" className="hover:text-primary transition-colors">Heritage Rice</Link></li>
                            <li><Link href="/products?category=ghee" className="hover:text-primary transition-colors">A2 Ghee</Link></li>
                            <li><Link href="/products?category=spices" className="hover:text-primary transition-colors">Spices & Masalas</Link></li>
                            <li><Link href="/products?category=oils" className="hover:text-primary transition-colors">Cold Pressed Oils</Link></li>
                            <li><Link href="/products" className="hover:text-primary transition-colors">View All</Link></li>
                        </ul>
                    </div>

                    {/* Policy & Help */}
                    <div>
                        <h3 className="font-serif font-bold text-lg mb-6 text-primary">Help & Policies</h3>
                        <ul className="space-y-3 text-sm text-gray-300">
                            <li><Link href="/track" className="hover:text-primary transition-colors">Track Order</Link></li>
                            <li><Link href="/shipping" className="hover:text-primary transition-colors">Shipping Policy</Link></li>
                            <li><Link href="/returns" className="hover:text-primary transition-colors">Returns & Refunds</Link></li>
                            <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-serif font-bold text-lg mb-6 text-primary">Get in Touch</h3>
                        <ul className="space-y-4 text-sm text-gray-300">
                            <li className="flex items-start gap-3">
                                <Mail className="h-5 w-5 text-primary shrink-0" />
                                <a href={`mailto:${content.footer_email}`} className="hover:text-white">{content.footer_email}</a>
                            </li>
                            <li className="flex items-start gap-3">
                                <Phone className="h-5 w-5 text-primary shrink-0" />
                                <a href={`tel:${content.footer_phone}`} className="hover:text-white">{content.footer_phone}</a>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-primary shrink-0" />
                                <span className="whitespace-pre-line">
                                    {content.footer_address}
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                    <p>© {new Date().getFullYear()} {content.footer_copyright}. All rights reserved.</p>
                    <div className="flex gap-4">
                        <span>Made with ❤️ in India</span>
                    </div>
                </div>
            </Container>
        </footer>
    );
}
