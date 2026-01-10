"use client";

import { usePathname } from "next/navigation";

export function CartSpacer() {
    const pathname = usePathname();

    if (pathname === "/cart" || pathname === "/checkout") {
        return <div className="h-32 w-full bg-transparent" />;
    }

    return null;
}
