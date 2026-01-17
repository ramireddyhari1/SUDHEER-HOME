"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, ChevronDown } from "lucide-react";
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

    // Mobile Accordion State
    const [openSection, setOpenSection] = useState<string | null>(null);

    const toggleSection = (section: string) => {
        setOpenSection(openSection === section ? null : section);
    };

    return (
        <footer className="bg-[#2C1810] text-[#E8E4C9] pt-8 pb-6 md:pt-16 border-t-4 border-[#DAA520]">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-x-6 md:gap-y-10 mb-6 md:mb-12">

                    {/* Brand & Social - Centered on Mobile */}
                    <div className="space-y-4 md:space-y-6 text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-2">
                            <span className="font-serif text-xl md:text-2xl font-bold text-[#B8860B]">Vaishnavi Organics</span>
                        </div>
                        <p className="text-sm text-[#E8E4C9]/80 leading-relaxed font-sans max-w-xs mx-auto md:mx-0">
                            Authentic. Traditional. Pure.<br />
                            Reviving the lost glory of Indian food wisdom, one product at a time.
                        </p>
                        <div className="flex justify-center md:justify-start gap-4">
                            <Link href="#" className="bg-[#6F4E37]/50 p-2 rounded-full hover:bg-[#DAA520] hover:text-[#2C1810] transition-colors">
                                <Instagram className="h-4 w-4" />
                            </Link>
                            <Link href="#" className="bg-[#6F4E37]/50 p-2 rounded-full hover:bg-[#DAA520] hover:text-[#2C1810] transition-colors">
                                <Facebook className="h-4 w-4" />
                            </Link>
                            <Link href="#" className="bg-[#6F4E37]/50 p-2 rounded-full hover:bg-[#DAA520] hover:text-[#2C1810] transition-colors">
                                <Twitter className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Shop - Accordion on Mobile */}
                    <div className="border-b border-[#6F4E37]/30 md:border-none pb-2 md:pb-0">
                        <button
                            onClick={() => toggleSection('shop')}
                            className="flex items-center justify-between w-full md:cursor-default py-1 md:py-0"
                        >
                            <h3 className="font-serif font-bold text-base md:text-lg text-[#B8860B]">Shop</h3>
                            <ChevronDown className={`h-4 w-4 md:hidden transition-transform ${openSection === 'shop' ? 'rotate-180' : ''}`} />
                        </button>
                        <ul className={`space-y-2 md:space-y-3 text-sm text-[#E8E4C9]/70 mt-2 md:mt-6 overflow-hidden transition-all duration-300 ${openSection === 'shop' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 md:max-h-full md:opacity-100'}`}>
                            <li><Link href="/products?category=jaggery" className="hover:text-[#B8860B] transition-colors block py-0.5">Organic Jaggery</Link></li>
                            <li><Link href="/products?category=rice" className="hover:text-[#B8860B] transition-colors block py-0.5">Heritage Rice</Link></li>
                            <li><Link href="/products?category=ghee" className="hover:text-[#B8860B] transition-colors block py-0.5">A2 Ghee</Link></li>
                            <li><Link href="/products?category=spices" className="hover:text-[#B8860B] transition-colors block py-0.5">Spices & Masalas</Link></li>
                            <li><Link href="/products?category=oils" className="hover:text-[#B8860B] transition-colors block py-0.5">Cold Pressed Oils</Link></li>
                            <li><Link href="/products" className="hover:text-[#B8860B] transition-colors block py-0.5">View All</Link></li>
                        </ul>
                    </div>

                    {/* Policy & Help - Accordion on Mobile */}
                    <div className="border-b border-[#6F4E37]/30 md:border-none pb-2 md:pb-0">
                        <button
                            onClick={() => toggleSection('help')}
                            className="flex items-center justify-between w-full md:cursor-default py-1 md:py-0"
                        >
                            <h3 className="font-serif font-bold text-base md:text-lg text-[#B8860B]">Help & Policies</h3>
                            <ChevronDown className={`h-4 w-4 md:hidden transition-transform ${openSection === 'help' ? 'rotate-180' : ''}`} />
                        </button>
                        <ul className={`space-y-2 md:space-y-3 text-sm text-[#E8E4C9]/70 mt-2 md:mt-6 overflow-hidden transition-all duration-300 ${openSection === 'help' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 md:max-h-full md:opacity-100'}`}>
                            <li><Link href="/track" className="hover:text-[#B8860B] transition-colors block py-0.5">Track Order</Link></li>
                            <li><Link href="/shipping" className="hover:text-[#B8860B] transition-colors block py-0.5">Shipping Policy</Link></li>
                            <li><Link href="/returns" className="hover:text-[#B8860B] transition-colors block py-0.5">Returns & Refunds</Link></li>
                            <li><Link href="/privacy" className="hover:text-[#B8860B] transition-colors block py-0.5">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-[#B8860B] transition-colors block py-0.5">Terms of Service</Link></li>
                            <li><Link href="/contact" className="hover:text-[#B8860B] transition-colors block py-0.5">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Contact - Accordion on Mobile */}
                    <div className="border-b border-[#6F4E37]/30 md:border-none pb-2 md:pb-0">
                        <button
                            onClick={() => toggleSection('contact')}
                            className="flex items-center justify-between w-full md:cursor-default py-1 md:py-0"
                        >
                            <h3 className="font-serif font-bold text-base md:text-lg text-[#B8860B]">Get in Touch</h3>
                            <ChevronDown className={`h-4 w-4 md:hidden transition-transform ${openSection === 'contact' ? 'rotate-180' : ''}`} />
                        </button>
                        <ul className={`space-y-3 md:space-y-4 text-sm text-[#E8E4C9]/70 mt-2 md:mt-6 overflow-hidden transition-all duration-300 ${openSection === 'contact' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 md:max-h-full md:opacity-100'}`}>
                            <li className="flex items-start gap-3">
                                <Mail className="h-5 w-5 text-primary shrink-0" />
                                <a href={`mailto:${content.footer_email}`} className="hover:text-white break-all">{content.footer_email}</a>
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

                <div className="border-t border-gray-800 pt-4 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4 text-[10px] md:text-xs text-gray-500">
                    <p className="text-center md:text-left">© {new Date().getFullYear()} {content.footer_copyright}. All rights reserved.</p>
                    <div className="flex gap-4">
                        <span>Made with ❤️ in India</span>
                    </div>
                </div>
            </Container>
        </footer>
    );
}
