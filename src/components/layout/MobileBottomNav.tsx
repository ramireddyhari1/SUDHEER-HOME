"use client";

import Link from "next/link";
import { Home, Grid, Percent, User, ShoppingBag } from "lucide-react";
import { usePathname } from "next/navigation";

export function MobileBottomNav() {
    const pathname = usePathname();

    const navItems = [
        {
            label: "Home",
            icon: Home,
            href: "/",
        },
        {
            label: "Categories",
            icon: Grid,
            href: "/products",
        },

        {
            label: "Account",
            icon: User,
            href: "/account",
        },
        {
            label: "Cart",
            icon: ShoppingBag,
            href: "/cart",
        },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 md:hidden z-50 flex justify-between items-center shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
            {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                    <Link
                        key={item.label}
                        href={item.href}
                        className={`flex flex-col items-center gap-1 ${isActive ? "text-[#155e42]" : "text-gray-500"
                            }`}
                    >
                        <Icon className={`h-6 w-6 ${isActive ? "fill-current" : ""}`} strokeWidth={isActive ? 2.5 : 2} />
                        <span className={`text-[10px] font-medium ${isActive ? "font-bold" : ""}`}>
                            {item.label}
                        </span>
                    </Link>
                );
            })}
        </div>
    );
}
