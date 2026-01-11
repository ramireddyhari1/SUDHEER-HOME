"use client";

import { useState } from "react";
import Link from "next/link";
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
    const [isOpen, setIsOpen] = useState(false);
    const { cartCount } = useCart();
    const { user } = useAuth();

    return (
        <div className="w-full sticky top-0 z-50">


            {/* Main Header */}
            <header className="w-full bg-white border-b shadow-sm transition-all duration-300">
                <div className="w-full px-4 lg:px-8 relative">
                    <div className="flex h-24 md:h-28 lg:h-32 items-center justify-between gap-4">

                        {/* Mobile Menu Button */}
                        <div className="flex-shrink-0 flex items-center lg:hidden z-10">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="p-2 -ml-2 text-foreground"
                            >
                                <Menu className="h-6 w-6" />
                            </button>
                        </div>

                        {/* Logo Area - Centered on Mobile, Left on Desktop */}
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:static lg:translate-x-0 lg:translate-y-0 lg:flex-shrink-0 lg:flex lg:items-center lg:gap-3">
                            <Link href="/" className="flex items-center gap-2 group">
                                {/* Logo Video - Visual Overflow for Impact */}
                                <div className="relative h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 origin-center lg:origin-left">
                                    <div className="absolute inset-0 flex items-center justify-center scale-[2.5] lg:scale-[1.8]">
                                        <video
                                            src="/logo.mp4"
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                            className="h-full w-full object-contain mix-blend-multiply"
                                            style={{ filter: "brightness(1.05) contrast(1.2)" }}
                                        />
                                    </div>
                                </div>
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 pt-2">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="relative group flex flex-col items-center"
                                >
                                    {item.badge && (
                                        <span className={`absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap shadow-sm ${item.badgeColor}`}>
                                            {item.badge}
                                        </span>
                                    )}
                                    <span className="text-[15px] font-medium text-gray-800 group-hover:text-primary transition-colors flex items-center gap-1">
                                        {item.icon === "⚡" && <span className="text-orange-500">⚡</span>}
                                        {item.name}
                                        {item.hasDropdown && <ChevronDown className="h-4 w-4 text-gray-500 stroke-[2.5]" />}
                                    </span>
                                </Link>
                            ))}

                            {/* My Account & More - Text Style */}
                            <Link href={user ? "/account" : "/login"} className="relative group flex flex-col items-center ml-2">
                                <span className="text-[15px] font-medium text-gray-800 group-hover:text-primary transition-colors flex items-center gap-1">
                                    {user ? `Hi, ${user.name.split(' ')[0]}` : "Login"}
                                    {user && <ChevronDown className="h-4 w-4 text-gray-500 stroke-[2.5]" />}
                                </span>
                            </Link>
                        </nav>

                        {/* Icons / Actions */}
                        <div className="flex items-center gap-2 sm:gap-4 ml-2">
                            <button className="p-2 hover:bg-secondary/5 rounded-full transition-colors" aria-label="Search">
                                <Search className="h-5 w-5 sm:h-6 sm:w-6 text-foreground/80 stroke-[2]" />
                            </button>
                            {/* Wishlist */}
                            <button className="hidden sm:block p-2 hover:bg-secondary/5 rounded-full transition-colors relative" aria-label="Wishlist">
                                <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-foreground/80 stroke-[2]" />
                                <span className="absolute -top-1 -right-1 h-4 w-4 bg-secondary text-white text-[10px] flex items-center justify-center rounded-full font-bold">0</span>
                            </button>
                            {/* Cart */}
                            <Link href="/cart">
                                <button className="p-2 hover:bg-secondary/5 rounded-full transition-colors relative" aria-label="Cart">
                                    <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6 text-foreground/80 stroke-[2]" />
                                    {cartCount > 0 && (
                                        <span className="absolute -top-1 -right-1 h-4 w-4 bg-secondary text-white text-[10px] flex items-center justify-center rounded-full font-bold">
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
