"use client";

import { useAuth } from "@/context/AuthContext";
import { UserPen } from "lucide-react";

interface AdminEditButtonProps {
    productId: string;
}

export function AdminEditButton({ productId }: AdminEditButtonProps) {
    const { user } = useAuth();

    // Only show if user is logged in and is an Admin
    if (!user?.isAdmin) return null;

    const handleEditClick = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent link navigation
        e.stopPropagation(); // Stop event bubbling

        // Placeholder for actual edit logic
        const message = `Admin Edit Mode\nProduct ID: ${productId}\n\n(In a real app, this would open an edit modal)`;
        alert(message);
        console.log("Editing product:", productId);
    };

    return (
        <button
            onClick={handleEditClick}
            className="absolute top-2 left-2 z-30 bg-black/80 hover:bg-black text-white p-2 rounded-full shadow-lg transition-transform hover:scale-110 flex items-center justify-center backdrop-blur-sm"
            title="Edit Product"
        >
            <UserPen className="h-4 w-4" />
        </button>
    );
}
