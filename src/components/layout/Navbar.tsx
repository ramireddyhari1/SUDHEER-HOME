"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
    Menu, X, ShoppingBag, Search, User, Heart, ChevronDown, ChevronRight,
    Home, Zap, Store, Sparkles, Plane, Package, Truck, RotateCcw, Shield,
    FileText, Phone, LogIn, UserPlus, Tag
} from "lucide-react";
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

// Mobile menu structured data
const mobileShopLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "BIG SALE", href: "/products", icon: Zap, badge: "70% Extra!", badgeColor: "bg-red-600 text-white" },
    { name: "Our Store", href: "/products", icon: Store },
    { name: "Newest Arrivals", href: "/products?sort=new", icon: Sparkles, badge: "Trending", badgeColor: "bg-[#DAA520] text-[#2C1810]" },
    { name: "Global Shipping", href: "/shipping", icon: Plane },
];

const mobileHelpLinks = [
    { name: "Track Order", href: "/track", icon: Package },
    { name: "Shipping Policy", href: "/shipping", icon: Truck },
    { name: "Returns & Refunds", href: "/returns", icon: RotateCcw },
    { name: "Privacy Policy", href: "/privacy", icon: Shield },
    { name: "Terms of Service", href: "/terms", icon: FileText },
    { name: "Contact Us", href: "/contact", icon: Phone },
];

export function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);
    const { cartCount } = useCart();
    const { user } = useAuth();
    const isHome = pathname === "/";

    // Animate menu open/close
    useEffect(() => {
        if (isOpen) {
            requestAnimationFrame(() => setMenuVisible(true));
        } else {
            setMenuVisible(false);
        }
    }, [isOpen]);

    const handleClose = () => {
        setMenuVisible(false);
        setTimeout(() => setIsOpen(false), 300);
    };

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
                            <div className="relative h-9 w-9 lg:h-16 lg:w-16 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                                <Image
                                    src="/main.png"
                                    alt="Vaishnavi Organics"
                                    fill
                                    className="object-contain mix-blend-multiply"
                                    priority
                                />
                            </div>
                            <span className="text-sm sm:text-2xl lg:text-3xl font-bold text-[#6F4E37] tracking-tighter whitespace-nowrap font-arista" style={{ letterSpacing: '-0.02em' }}>Vaishnavi Organics</span>
                        </Link>

                        {/* Desktop Navigation */}
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

                        {/* Icons / Actions - Right */}
                        <div className="flex items-center gap-1.5 md:gap-3 lg:gap-4 ml-auto lg:ml-0 z-10">
                            <button className="p-2 hover:bg-[#DAA520]/10 rounded-full transition-colors active:scale-95" aria-label="Search">
                                <Search className="h-5 w-5 lg:h-5 lg:w-5 text-[#6F4E37] stroke-[2]" />
                            </button>
                            <Link href={user ? "/account" : "/login"} className="hidden lg:block">
                                <button className="p-2 hover:bg-[#DAA520]/10 rounded-full transition-colors active:scale-95" aria-label="Account">
                                    <User className="h-5 w-5 lg:h-5 lg:w-5 text-[#6F4E37] stroke-[2]" />
                                </button>
                            </Link>
                            <button className="hidden sm:block p-2 hover:bg-[#DAA520]/10 rounded-full transition-colors relative active:scale-95" aria-label="Wishlist">
                                <Heart className="h-5 w-5 lg:h-5 lg:w-5 text-[#6F4E37] stroke-[2]" />
                                <span className="absolute top-1 right-0.5 h-3.5 w-3.5 bg-[#DAA520] text-[#2C1810] text-[9px] flex items-center justify-center rounded-full font-bold shadow-sm">0</span>
                            </button>
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

            {/* ═══════════════════════════════════════════════════ */}
            {/* Premium Mobile Menu                                */}
            {/* ═══════════════════════════════════════════════════ */}
            {isOpen && (
                <div
                    className={`fixed inset-0 z-50 lg:hidden transition-colors duration-300 ${menuVisible ? 'bg-black/60' : 'bg-black/0'}`}
                    onClick={handleClose}
                >
                    <div
                        className={`absolute left-0 top-0 h-full w-[85%] max-w-[360px] bg-[#F5F5DC] shadow-2xl flex flex-col transition-transform duration-300 ease-out ${menuVisible ? 'translate-x-0' : '-translate-x-full'}`}
                        onClick={e => e.stopPropagation()}
                    >
                        {/* ── Header with Logo ── */}
                        <div className="flex items-center justify-between px-5 py-4 border-b border-[#DAA520]/20">
                            <Link href="/" className="flex items-center gap-2.5" onClick={handleClose}>
                                <div className="relative h-10 w-10 flex-shrink-0">
                                    <Image src="/main.png" alt="Logo" fill className="object-contain" />
                                </div>
                                <span className="text-lg font-bold text-[#6F4E37] font-arista tracking-tight">Vaishnavi Organics</span>
                            </Link>
                            <button
                                onClick={handleClose}
                                className="p-2 rounded-full hover:bg-[#6F4E37]/10 transition-colors"
                                aria-label="Close menu"
                            >
                                <X className="h-5 w-5 text-[#6F4E37]" />
                            </button>
                        </div>

                        {/* ── Scrollable Content ── */}
                        <div className="flex-1 overflow-y-auto">

                            {/* ── User Account Banner ── */}
                            <div className="px-5 py-4">
                                {user ? (
                                    <Link href="/account" onClick={handleClose} className="flex items-center gap-3 bg-[#6F4E37]/10 rounded-xl p-3.5 border border-[#6F4E37]/15">
                                        <div className="w-10 h-10 bg-[#6F4E37] rounded-full flex items-center justify-center flex-shrink-0">
                                            <User className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-bold text-[#2C1810] truncate">My Account</p>
                                            <p className="text-xs text-[#6F4E37]/60">View orders & profile</p>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-[#6F4E37] flex-shrink-0" />
                                    </Link>
                                ) : (
                                    <div className="flex gap-2.5">
                                        <Link href="/login" onClick={handleClose} className="flex-1 flex items-center justify-center gap-2 bg-[#6F4E37] text-white rounded-xl py-3 font-bold text-sm hover:bg-[#5A3E2B] transition-colors">
                                            <LogIn className="w-4 h-4" /> Sign In
                                        </Link>
                                        <Link href="/signup" onClick={handleClose} className="flex-1 flex items-center justify-center gap-2 border border-[#6F4E37]/30 text-[#6F4E37] rounded-xl py-3 font-bold text-sm hover:bg-[#6F4E37]/10 transition-colors">
                                            <UserPlus className="w-4 h-4" /> Register
                                        </Link>
                                    </div>
                                )}
                            </div>

                            {/* ── Shop Section ── */}
                            <div className="px-5 pb-2">
                                <p className="text-[10px] font-bold text-[#B8860B] uppercase tracking-[0.15em] mb-2 px-1">Shop</p>
                                <div className="space-y-0.5">
                                    {mobileShopLinks.map((item) => {
                                        const Icon = item.icon;
                                        const isActive = pathname === item.href;
                                        return (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                onClick={handleClose}
                                                className={`flex items-center gap-3.5 px-3 py-3 rounded-xl transition-all duration-200 group ${isActive
                                                    ? 'bg-[#6F4E37]/10 border border-[#6F4E37]/20'
                                                    : 'hover:bg-[#6F4E37]/8 border border-transparent'
                                                    }`}
                                            >
                                                <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${isActive
                                                    ? 'bg-[#6F4E37] shadow-lg shadow-[#6F4E37]/20'
                                                    : 'bg-[#6F4E37]/15 group-hover:bg-[#6F4E37]/25'
                                                    }`}>
                                                    <Icon className={`w-[18px] h-[18px] ${isActive ? 'text-white' : 'text-[#6F4E37]'}`} />
                                                </div>
                                                <span className={`text-[15px] font-medium flex-1 ${isActive ? 'text-[#6F4E37] font-bold' : 'text-[#2C1810]/80'}`}>
                                                    {item.name}
                                                </span>
                                                {item.badge && (
                                                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${item.badgeColor}`}>
                                                        {item.badge}
                                                    </span>
                                                )}
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* ── Divider ── */}
                            <div className="mx-5 my-3 border-t border-[#DAA520]/20" />

                            {/* ── Help & Policies Section ── */}
                            <div className="px-5 pb-4">
                                <p className="text-[10px] font-bold text-[#B8860B] uppercase tracking-[0.15em] mb-2 px-1">Help & Policies</p>
                                <div className="space-y-0.5">
                                    {mobileHelpLinks.map((item) => {
                                        const Icon = item.icon;
                                        return (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                onClick={handleClose}
                                                className="flex items-center gap-3.5 px-3 py-2.5 rounded-xl hover:bg-[#6F4E37]/8 transition-all duration-200 group border border-transparent"
                                            >
                                                <div className="w-8 h-8 rounded-lg bg-[#6F4E37]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#6F4E37]/20 transition-colors">
                                                    <Icon className="w-4 h-4 text-[#6F4E37]/60 group-hover:text-[#6F4E37]" />
                                                </div>
                                                <span className="text-[14px] text-[#2C1810]/60 group-hover:text-[#2C1810] font-medium">{item.name}</span>
                                                <ChevronRight className="w-3.5 h-3.5 text-[#6F4E37]/30 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* ── Footer ── */}
                        <div className="px-5 py-4 border-t border-[#DAA520]/20 bg-[#EBE7D0]">
                            <div className="flex items-center gap-3">
                                <Link href="/cart" onClick={handleClose} className="flex-1 flex items-center justify-center gap-2 bg-[#6F4E37] text-white rounded-xl py-3 font-bold text-sm shadow-lg shadow-[#6F4E37]/20 hover:bg-[#5A3E2B] transition-colors">
                                    <ShoppingBag className="w-4 h-4" />
                                    Cart {cartCount > 0 && `(${cartCount})`}
                                </Link>
                                <Link href="/products" onClick={handleClose} className="flex-1 flex items-center justify-center gap-2 border-2 border-[#6F4E37]/30 text-[#6F4E37] rounded-xl py-3 font-bold text-sm hover:bg-[#6F4E37]/10 transition-colors">
                                    <Tag className="w-4 h-4" />
                                    Shop Now
                                </Link>
                            </div>
                            <p className="text-center text-[10px] text-[#6F4E37]/40 mt-3">Made with ❤️ in India</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
