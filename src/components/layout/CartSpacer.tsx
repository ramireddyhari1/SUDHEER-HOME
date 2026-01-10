"use client";

import { usePathname } from "next/navigation";

export function CartSpacer() {
    const pathname = usePathname();

    if (pathname === "/cart") {
        return <div className="h-32 w-full bg-transparent" />;
    }

    return null;
}
