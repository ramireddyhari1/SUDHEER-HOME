"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { LayoutDashboard, Package, ShoppingCart, Users, LogOut, Store, Truck, Image as ImageIcon, Ticket } from "lucide-react";

import { Menu, X } from "lucide-react"; // Import Menu and X icons
import { useState } from "react"; // Import useState

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { user, isLoading, logout } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state

    // Protect Admin Routes
    useEffect(() => {
        if (!isLoading && (!user || !user.isAdmin)) {
            router.push("/admin/login");
        }
    }, [user, isLoading, router]);

    // Close sidebar on route change
    useEffect(() => {
        setIsSidebarOpen(false);
    }, [pathname]);

    if (isLoading) return <div className="h-screen flex items-center justify-center">Loading Admin Panel...</div>;

    const isLoginPage = pathname === "/admin/login";

    if (isLoginPage) {
        return <>{children}</>;
    }

    const navItems = [
        { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
        { name: "Products", href: "/admin/products", icon: Package },
        { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
        { name: "Shipping Rates", href: "/admin/shipping", icon: Truck },
        { name: "Customers", href: "/admin/customers", icon: Users },
        { name: "Media Manager", href: "/admin/media", icon: ImageIcon },
        { name: "Coupons", href: "/admin/coupons", icon: Ticket },
        { name: "Site Content", href: "/admin/content", icon: Store },
    ];

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#155E42] text-white flex items-center justify-between px-4 z-50">
                <span className="font-serif font-bold text-lg">Vaishnavi Organics</span>
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Sidebar (Desktop + Mobile Overlay) */}
            <aside className={`
                fixed top-16 bottom-0 left-0 z-40 w-64 bg-[#155E42] text-white transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:top-auto md:bottom-auto md:flex flex-col
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="p-6 border-b border-green-800 hidden md:block">
                    <h1 className="text-2xl font-serif font-bold">Admin Panel</h1>
                    <p className="text-sm text-green-200 mt-1">Vaishnavi Organics</p>
                </div>

                {/* Mobile User Info (Because header covers it or it's missing on mobile) - Optional, but keeping nav items is key */}
                {/* We removed the Logo header from sidebar on mobile because it's in the top bar now. kept visual consistency */}

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-white text-[#155E42] font-medium shadow-sm' : 'text-green-100 hover:bg-green-800'}`}
                            >
                                <Icon className="w-5 h-5" />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-green-800 space-y-2">
                    <Link href="/" className="flex items-center gap-3 px-4 py-3 text-green-100 hover:bg-green-800 rounded-lg">
                        <Store className="w-5 h-5" />
                        Back to Store
                    </Link>
                    <button
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-200 hover:bg-red-900/20 hover:text-red-100 rounded-lg transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Overlay for mobile sidebar */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto pt-16 md:pt-0">
                {children}
            </main>
        </div>
    );
}
