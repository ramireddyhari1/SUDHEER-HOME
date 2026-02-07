"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { VideoLoader } from "@/components/ui/VideoLoader";
import { FloatingButtons } from "@/components/layout/FloatingButtons";
import { CartSpacer } from "@/components/layout/CartSpacer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";

export function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdminRoute = pathname?.startsWith("/admin");
    const isAuthRoute = pathname === "/login" || pathname === "/partners/login";
    const shouldHideLayout = isAdminRoute || isAuthRoute;

    return (
        <div className="flex min-h-screen flex-col">
            {!shouldHideLayout && <AnnouncementBar />}
            <VideoLoader />
            {!shouldHideLayout && <FloatingButtons />}
            {!shouldHideLayout && <Navbar />}
            <main className="flex-1">
                {children}
            </main>
            {!shouldHideLayout && <Footer />}
            {!shouldHideLayout && <CartSpacer />}
            {!shouldHideLayout && <MobileBottomNav />}
        </div>
    );
}
