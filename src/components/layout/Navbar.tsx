"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingBag, Search, User, Heart, ChevronDown, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

// Navigation Data with badges
const navigation = [
    { name: "Home", href: "/" },
    { name: "BIG SALE", href: "/products", badge: "Get 70% Extra!", badgeColor: "bg-red-700 text-white", icon: "⚡" },
    { name: "SIRIPURAPU VARI STORE", href: "/products", hasDropdown: true },

    { name: "Newest Arrivals", href: "/products?sort=new", badge: "Trending", badgeColor: "bg-amber-400 text-black" },
    { name: "Global Shipping", href: "/shipping", badge: "Open Now", badgeColor: "bg-black text-white" },
];

export function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const { cartCount } = useCart();
    const { user } = useAuth();
    const isHome = pathname === "/";

    return (
        <div className="w-full sticky top-0 z-50">


            {/* Main Header - Earthy Beige Sticky */}
            <header className="w-full bg-[#F5F5DC]/95 backdrop-blur-md border-b-[3px] border-[#DAA520]/20 shadow-sm transition-all duration-300">
                <div className="mx-auto max-w-[1440px] pl-3 pr-4 lg:px-8 relative">
                    <div className="flex h-[52px] lg:h-[80px] items-center justify-between gap-4">

                        {/* Left: Menu (mobile only) */}
                        <div className="flex-shrink-0 flex items-center lg:hidden z-10">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="p-2 -ml-1 text-[#6F4E37] active:scale-95 transition-transform"
                                aria-label="Open menu"
                            >
                                <Menu className="h-6 w-6 stroke-[2]" />
                            </button>
                        </div>

                        {/* Center: Logo & Company Name (Mobile Centered) */}
                        <Link href="/" className="flex items-center gap-2 group flex-shrink-0 absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0">
                            {/* Logo Video/Image */}
                            <div className="relative h-9 w-9 lg:h-16 lg:w-16 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                                <Image
                                    src="/main.png"
                                    alt="Vaishnavi Organics"
                                    fill
                                    className="object-contain mix-blend-multiply"
                                    priority
                                />
                            </div>
                            <span className="text-sm sm:text-2xl lg:text-3xl font-bold text-[#6F4E37] tracking-tighter whitespace-nowrap" style={{ fontFamily: 'var(--font-arista)', letterSpacing: '-0.02em' }}>Vaishnavi Organics</span>
                        </Link>

                        {/* Desktop Navigation - Centered & Earthy */}
                        <nav className="hidden lg:flex items-center justify-center flex-1 gap-6 xl:gap-8 px-4 min-w-0">
                            {navigation.map((item) => {
                                const isActiveHome = item.name === "Home" && isHome;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="relative group flex flex-col items-center py-2"
                                    >
                                        {item.badge && (
                                            <span className={`absolute -top-3 left-1/2 -translate-x-1/2 text-[9px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap shadow-sm bg-[#DAA520] text-[#2C1810] transform transition-transform group-hover:-translate-y-1`}>
                                                {item.badge}
                                            </span>
                                        )}
                                        <span className={`text-[16px] font-sans tracking-wide flex items-center gap-1.5 transition-all ${isActiveHome ? "font-bold text-[#2C1810] border-b-2 border-[#DAA520] pb-0.5" : "font-medium text-[#6F4E37]/80 group-hover:text-[#6F4E37] group-hover:font-bold"}`}>
                                            {item.icon === "⚡" && <span className="text-[#DAA520] animate-pulse">⚡</span>}
                                            {item.name}
                                            {item.hasDropdown && <ChevronDown className="h-3.5 w-3.5 text-[#6F4E37]/60 stroke-[2.5]" />}
                                        </span>
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* Icons / Actions - Right - Earthy Brown */}
                        <div className="flex items-center gap-1.5 md:gap-3 lg:gap-4 ml-auto lg:ml-0 z-10">
                            {/* Search */}
                            <button className="p-2 hover:bg-[#DAA520]/10 rounded-full transition-colors active:scale-95" aria-label="Search">
                                <Search className="h-5 w-5 lg:h-5 lg:w-5 text-[#6F4E37] stroke-[2]" />
                            </button>

                            {/* Account */}
                            <Link href={user ? "/account" : "/login"} className="hidden lg:block">
                                <button className="p-2 hover:bg-[#DAA520]/10 rounded-full transition-colors active:scale-95" aria-label="Account">
                                    <User className="h-5 w-5 lg:h-5 lg:w-5 text-[#6F4E37] stroke-[2]" />
                                </button>
                            </Link>

                            {/* Wishlist */}
                            <button className="hidden sm:block p-2 hover:bg-[#DAA520]/10 rounded-full transition-colors relative active:scale-95" aria-label="Wishlist">
                                <Heart className="h-5 w-5 lg:h-5 lg:w-5 text-[#6F4E37] stroke-[2]" />
                                <span className="absolute top-1 right-0.5 h-3.5 w-3.5 bg-[#DAA520] text-[#2C1810] text-[9px] flex items-center justify-center rounded-full font-bold shadow-sm">0</span>
                            </button>

                            {/* Cart */}
                            <Link href="/cart">
                                <button className="p-2 hover:bg-[#DAA520]/10 rounded-full transition-colors relative active:scale-95" aria-label="Cart">
                                    <ShoppingBag className="h-5 w-5 lg:h-5 lg:w-5 text-[#6F4E37] stroke-[2]" />
                                    {cartCount > 0 && (
                                        <span className="absolute top-0.5 right-0.5 h-4 w-4 bg-[#DAA520] text-[#2C1810] text-[10px] flex items-center justify-center rounded-full font-bold shadow-sm">
                                            {cartCount}
                                        </span>
                                    )}
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div className="fixed inset-0 z-50 bg-black/50 lg:hidden" onClick={() => setIsOpen(false)}>
                    <div className="absolute left-0 top-0 h-full w-4/5 max-w-sm bg-white shadow-xl p-6 overflow-y-auto" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-8">
                            <span className="font-serif font-bold text-xl text-primary">Menu</span>
                            <button onClick={() => setIsOpen(false)}><X className="h-6 w-6" /></button>
                        </div>
                        <div className="flex flex-col gap-4">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="text-base font-medium py-2 border-b border-gray-100 flex justify-between items-center"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <span className="flex items-center gap-2">
                                        {item.icon} {item.name}
                                    </span>
                                    {item.badge && (
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${item.badgeColor}`}>
                                            {item.badge}
                                        </span>
                                    )}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
