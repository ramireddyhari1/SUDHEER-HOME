"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export function ProductAccordion({ children }: { children: React.ReactNode }) {
    return (
        <div className="divide-y divide-gray-200 border-t border-b border-gray-200">
            {children}
        </div>
    );
}

interface AccordionItemProps {
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
}

export function AccordionItem({ title, children, defaultOpen = false }: AccordionItemProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="border-b border-gray-200 last:border-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full py-4 text-left group"
            >
                <span className="font-serif font-medium text-lg text-foreground group-hover:text-primary transition-colors">
                    {title}
                </span>
                {isOpen ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground" />
                ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                )}
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100 mb-4" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="text-sm text-muted-foreground leading-relaxed">
                    {children}
                </div>
            </div>
        </div>
    );
}
